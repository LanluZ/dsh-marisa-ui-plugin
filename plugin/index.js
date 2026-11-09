/**
 * Marisa UI — host half.
 *
 * Two jobs:
 *   1. Hold the plugin row in the profile's Loader tree (the browser bundle
 *      paints the UI; `dsh.client` points at `./client`).
 *   2. `app.asar` window-glass patcher, driven by the 魔理沙UI settings page
 *      over three local HTTP routes (or the CLI in tools/lg-asar.mjs): inject
 *      the welcome window's acrylic recipe into the MAIN window creation
 *      inside `resources/app.asar`, keep a pristine backup, and restore on
 *      demand.
 *
 * Patching strategy — SAME-LENGTH IN-PLACE REPLACEMENT:
 *   The `createWindow()` options region in `lib/main.js` is rewritten with an
 *   equal byte count (compact whitespace + trailing space padding). Because
 *   the archive length never changes, every asar header offset stays valid:
 *   no repack, no offset fixups, and the write touches a few hundred bytes.
 *   When the header carries an `integrity` record for `lib/main.js`, its
 *   `hash` / `blocks[0]` hexes are updated in place (same 64-char width) so
 *   the archive stays self-consistent even if a future build enables the
 *   embedded-asar-integrity fuse (currently OFF in this exe).
 *
 * Safety rails:
 *   · every state is classified against verbatim anchors inside the region
 *     only, and the region must lie inside the `lib/main.js` blob located via
 *     the asar header — unknown builds are refused, never guessed at;
 *   · raw asar bytes are touched under a scoped `process.noAsar` toggle (the
 *     dsh runtime runs under Electron's asar-fs wrapping);
 *   · the backup is written atomically (tmp + rename) BEFORE any patch write;
 *   · a failed verify auto-restores from the backup;
 *   · restore only runs when backup size === current size, which (with a
 *     same-length patch) proves "same DSH version", so a restore can never
 *     roll the app back across an upgrade.
 */
import fs from "node:fs";
import crypto from "node:crypto";

/* ----------------------------- patch recipe ---------------------------- */
// Semantic region: `createWindow()`'s BrowserWindow options run from
// `width: 1280,` up to `webPreferences` and live inside `lib/main.js`.
const REGION_START = "width: 1280,";
const REGION_END = "webPreferences";

// Semantic change B — the caption-button overlay starts transparent so the
// native button strip rides the acrylic backdrop (the windowsAppearance IPC
// probe re-tints it later from `--dsw-specific-sidebar-fill`).
const COLOR_FROM = "color: chromeFallbackFill(),";
const COLOR_TO = 'color: "#00000000",';

// Semantic change A — the main window opts into the welcome window's acrylic
// recipe (`backgroundColor: "#00000000"` + `backgroundMaterial: "acrylic"`).
const SPREAD_FROM = "primary ? {\n";
const SPREAD_TO =
  "primary ? {\n" +
  '\t\t\tbackgroundColor: "#00000000",\n' +
  '\t\t\tbackgroundMaterial: "acrylic",\n';

// Region-scoped classification signatures (the welcome window also carries a
// `backgroundMaterial`, so whole-file heuristics are never used).
const SIG_PATCHED = "backgroundMaterial";
const SIG_ORIGINAL = "chromeFallbackFill()";

const ASAR_PATH = "D:\\Program Files (x86)\\dsh\\resources\\app.asar";
const BACKUP_PATH = ASAR_PATH + ".lg-backup";

/** Build the patched region: apply the two semantic changes, compact layout
 *  whitespace (no string literal in this region spans lines), then pad with
 *  spaces back to the EXACT original byte length. */
function buildPatchedRegion(region) {
  if (!region.includes(COLOR_FROM) || !region.includes(SPREAD_FROM)) {
    throw new Error("patch anchors missing inside region");
  }
  let out = region.replace(COLOR_FROM, COLOR_TO);
  out = out.replace(SPREAD_FROM, SPREAD_TO);
  out = out.replace(/\n\t+/g, " "); // harvest whitespace for the additions
  if (Buffer.byteLength(out, "utf8") > Buffer.byteLength(region, "utf8")) {
    throw new Error("region too small for same-length patch");
  }
  const pad = Buffer.byteLength(region, "utf8") - Buffer.byteLength(out, "utf8");
  return out + " ".repeat(pad);
}

function classifyRegion(region) {
  if (region.includes(SIG_PATCHED)) return "patched";
  if (region.includes(SIG_ORIGINAL)) return "original";
  return "unknown";
}

/** Syntax-check the patched region as an object-literal body before any
 *  write: a malformed transformation must never reach the archive. */
function assertCompiles(region) {
  try {
    // eslint-disable-next-line no-new-func
    new Function("const o = {" + region + " webPreferences: {} }; void o;");
  } catch (error) {
    throw new Error("patched region fails syntax check: " + error.message);
  }
}

/* ------------------------------ raw fs glue ---------------------------- */
/** Run raw-file fs under a scoped `process.noAsar` toggle: the dsh runtime is
 *  Electron run-as-node, whose fs wrapper intercepts `app.asar` paths. The
 *  flag is restored immediately, so asar-backed module loading elsewhere in
 *  the process is unaffected. */
function withRawFs(fn) {
  const previous = process.noAsar;
  process.noAsar = true;
  try {
    return fn();
  } finally {
    process.noAsar = previous;
  }
}

/* --------------------------- archive inspection ------------------------ */
// asar layout (validated against this app): 16-byte prelude
//   u32LE[0] = 4 (pickle payload size)   u32LE[1] = headerPickleSize
//   u32LE[2] = headerPickleSize - 4      u32LE[3] = jsonLength
// JSON text at offset 16; data section at 8 + headerPickleSize; entry
// offsets are relative to the data section.
function inspect() {
  return withRawFs(() => {
    const fd = fs.openSync(ASAR_PATH, "r");
    try {
      const prelude = Buffer.alloc(16);
      fs.readSync(fd, prelude, 0, 16, 0);
      // u32LE byte offsets: [0]=4 (pickle payload size), [4]=headerPickleSize,
      // [8]=headerPickleSize-4, [12]=jsonLength (padding to 4 may trail).
      const headerPickleSize = prelude.readUInt32LE(4);
      const payloadSize = prelude.readUInt32LE(8);
      const jsonLength = prelude.readUInt32LE(12);
      if (prelude.readUInt32LE(0) !== 4 || payloadSize !== headerPickleSize - 4 || jsonLength > headerPickleSize - 8) {
        throw new Error("not an asar archive (prelude mismatch)");
      }
      const jsonStart = 16;
      const dataBase = 8 + headerPickleSize;
      const jsonBuf = Buffer.alloc(jsonLength);
      fs.readSync(fd, jsonBuf, 0, jsonLength, jsonStart);
      const header = JSON.parse(jsonBuf.toString("utf8"));
      const entry = header && header.files && header.files.lib && header.files.lib.files
        ? header.files.lib.files["main.js"]
        : undefined;
      if (!entry || entry.offset === undefined || entry.size === undefined) {
        throw new Error("lib/main.js entry not found in asar header");
      }
      const blobStart = dataBase + Number(entry.offset);
      const blobSize = Number(entry.size);
      const blob = Buffer.alloc(blobSize);
      fs.readSync(fd, blob, 0, blobSize, blobStart);

      const relStart = blob.indexOf(REGION_START);
      if (relStart === -1 || blob.indexOf(REGION_START, relStart + 1) !== -1) {
        throw new Error("region start anchor missing or ambiguous in lib/main.js");
      }
      const relEnd = blob.indexOf(REGION_END, relStart);
      if (relEnd === -1) throw new Error("region end anchor missing in lib/main.js");

      return {
        blobStart,
        blob,
        jsonStart,
        jsonBuf,
        regionStart: blobStart + relStart,
        regionEnd: blobStart + relEnd,
        region: blob.slice(relStart, relEnd).toString("utf8"),
        integrity: entry.integrity || null
      };
    } finally {
      fs.closeSync(fd);
    }
  });
}

/** sha256 hex of a buffer. */
function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

/** Validate the optional header integrity record against the live blob.
 *  Returns the header byte offsets of its `hash` / `blocks[0]` hexes (to be
 *  rewritten with the post-patch hash), or null when the entry carries no
 *  integrity record. Throws on a record we cannot keep consistent. */
function prepareIntegrity(view, oldBlob) {
  const integ = view.integrity;
  if (!integ) return null;
  const oldHash = sha256(oldBlob);
  const singleBlock = Array.isArray(integ.blocks) && integ.blocks.length === 1 && integ.blocks[0] === integ.hash;
  if (integ.algorithm !== "SHA256" || !singleBlock || integ.hash !== oldHash) {
    throw new Error("unsupported asar integrity record — refusing to patch");
  }
  const positions = [];
  let at = view.jsonBuf.indexOf(oldHash);
  while (at !== -1) {
    positions.push(view.jsonStart + at);
    at = view.jsonBuf.indexOf(oldHash, at + 1);
  }
  if (positions.length < 2) throw new Error("integrity hash fields not found in header");
  return positions;
}

/* ----------------------------- action surface --------------------------- */
let busy = null;

async function serial(task) {
  while (busy) {
    try { await busy; } catch {}
  }
  busy = task();
  try {
    return await busy;
  } finally {
    busy = null;
  }
}

function readStat(path) {
  return withRawFs(() => fs.statSync(path));
}

function backupInfo() {
  if (!withRawFs(() => fs.existsSync(BACKUP_PATH))) return { exists: false, size: 0, matchesCurrent: false };
  const size = readStat(BACKUP_PATH).size;
  return { exists: true, size, matchesCurrent: size === readStat(ASAR_PATH).size };
}

/** Snapshot of the patcher state, safe to serialize to the UI. */
function status() {
  let state = "unknown";
  let error = null;
  try {
    state = classifyRegion(inspect().region);
  } catch (e) {
    state = "unknown";
    error = String((e && e.message) || e);
  }
  return {
    state,
    error,
    asarPath: ASAR_PATH,
    backupPath: BACKUP_PATH,
    asarSize: readStat(ASAR_PATH).size,
    backup: backupInfo()
  };
}

/** Copy the pristine archive to the backup atomically (tmp + rename). */
function ensureBackup(asarSize) {
  withRawFs(() => {
    const exists = fs.existsSync(BACKUP_PATH);
    if (exists && fs.statSync(BACKUP_PATH).size === asarSize) return;
    const tmp = BACKUP_PATH + ".tmp";
    fs.copyFileSync(ASAR_PATH, tmp);
    fs.renameSync(tmp, BACKUP_PATH);
  });
}

/** Full-file overwrite from the backup (restore path). */
function restoreFromBackup() {
  withRawFs(() => {
    const tmp = BACKUP_PATH + ".restore.tmp";
    fs.copyFileSync(BACKUP_PATH, tmp);
    fs.copyFileSync(tmp, ASAR_PATH);
    fs.rmSync(tmp, { force: true });
  });
}

/** Inject the acrylic window patch. */
function injectPatch() {
  return serial(() => {
    const view = inspect();
    const state = classifyRegion(view.region);
    if (state === "patched") return { ok: true, state: "patched", message: "already-injected" };
    if (state !== "original") return { ok: false, state, message: "unknown-host-build" };

    ensureBackup(readStat(ASAR_PATH).size);

    const patched = buildPatchedRegion(view.region);
    try {
      assertCompiles(patched);
    } catch (error) {
      return { ok: false, state: "original", message: "patch-refused: " + error.message };
    }
    const newBlob = Buffer.from(view.blob); // copy
    const relStart = view.regionStart - view.blobStart;
    newBlob.write(patched, relStart, "utf8");
    let hexPositions = null;
    let newHash = null;
    try {
      hexPositions = prepareIntegrity(view, view.blob);
      if (hexPositions) newHash = sha256(newBlob);
    } catch (error) {
      return { ok: false, state: "original", message: "integrity-refused: " + error.message };
    }

    try {
      withRawFs(() => {
        const fd = fs.openSync(ASAR_PATH, "r+");
        try {
          const regionBuf = Buffer.from(patched, "utf8");
          fs.writeSync(fd, regionBuf, 0, regionBuf.length, view.regionStart);
          if (hexPositions) {
            const hexBuf = Buffer.from(newHash, "utf8");
            for (const pos of hexPositions) fs.writeSync(fd, hexBuf, 0, hexBuf.length, pos);
          }
          fs.fsyncSync(fd);
        } finally {
          fs.closeSync(fd);
        }
      });
      const verify = classifyRegion(inspect().region);
      if (verify !== "patched") throw new Error("verify failed: " + verify);
    } catch (error) {
      try { restoreFromBackup(); } catch {}
      return { ok: false, state: "unknown", message: "write-failed: " + error.message };
    }
    return { ok: true, state: "patched", message: "injected", restartRequired: true };
  });
}

/** Restore the pristine archive from the backup. */
function restorePatch() {
  return serial(() => {
    const asarSize = readStat(ASAR_PATH).size;
    const state = classifyRegion(inspect().region);
    if (state === "original") return { ok: true, state: "original", message: "already-original" };
    if (state !== "patched") return { ok: false, state, message: "unknown-host-build" };

    const backup = backupInfo();
    if (!backup.exists) return { ok: false, state: "patched", message: "backup-missing" };
    if (backup.size !== asarSize) return { ok: false, state: "patched", message: "backup-version-mismatch" };
    try {
      restoreFromBackup();
      const verify = classifyRegion(inspect().region);
      if (verify !== "original") throw new Error("verify failed: " + verify);
    } catch (error) {
      return { ok: false, state: "patched", message: "restore-failed: " + error.message };
    }
    return { ok: true, state: "original", message: "restored", restartRequired: true };
  });
}

/** The action surface consumed by the HTTP routes and tools/lg-asar.mjs. */
export const asarActions = {
  inject: injectPatch,
  restore: restorePatch,
  status: () => Promise.resolve(status())
};

/* ------------------------------ plugin body ----------------------------- */
/**
 * Host plugin body: mounts the patcher's three local routes on the DSH web
 * server. `webServer` is a hard injection so the Loader waits for the HTTP
 * server before running us (a `ctx.get()` at mount time would be racy).
 * Routes live under `/liquidglass/*`; only the owner-principal browser
 * session (the app itself) can reach them — the server's admit() fence
 * rejects anything cross-origin.
 */
export const inject = ["webServer"];

export function apply(ctx) {
  const webServer = ctx.webServer;
  if (!webServer || typeof webServer.register !== "function") {
    console.error("[魔理沙UI] webServer service missing — window-glass routes not mounted");
    return () => {};
  }

  const routes = [
    ["GET", "/liquidglass/status", () => asarActions.status()],
    ["POST", "/liquidglass/inject", () => asarActions.inject()],
    ["POST", "/liquidglass/restore", () => asarActions.restore()]
  ];

  const disposers = [];
  for (const [method, path, action] of routes) {
    disposers.push(webServer.register({
      kind: "exact",
      path,
      handler: (req, res) => {
        if (req.method !== method && req.method !== "GET" && req.method !== "POST") {
          res.writeHead(405, { "content-type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ ok: false, message: "method-not-allowed" }));
          return;
        }
        Promise.resolve()
          .then(action)
          .then((result) => {
            res.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
            res.end(JSON.stringify(result));
          })
          .catch((error) => {
            res.writeHead(500, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
            res.end(JSON.stringify({ ok: false, message: String((error && error.message) || error) }));
          });
      }
    }));
    console.info("[魔理沙UI] route mounted: " + method + " " + path);
  }

  let disposed = false;
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    for (const disposer of disposers) {
      try { disposer(); } catch {}
    }
  };
  if (typeof ctx.effect === "function") ctx.effect(() => cleanup, "liquid-glass: asar patch routes");
  return cleanup;
}
