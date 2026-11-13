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
 *   equal byte count (compact whitespace + trailing space padding), and every
 *   runtime `setBackgroundColor(chromeFallbackFill())` statement is rewritten
 *   in place (statement + space padding to the same byte width). Because the
 *   archive length never changes, every asar header offset stays valid: no
 *   repack, no offset fixups, and the write touches a few hundred bytes.
 *   When the header carries an `integrity` record for `lib/main.js`, its
 *   `hash` / `blocks[0]` hexes are updated in place (same 64-char width) so
 *   the archive stays self-consistent even if a future build enables the
 *   embedded-asar-integrity fuse (currently OFF in this exe).
 *
 * Shape-aware matching (why the recipe moved beyond two verbatim anchors):
 *   recent DSH builds paint an opaque "workspace base" — the primary block
 *   carries its own `backgroundColor: chromeFallbackFill(),` and the runtime
 *   re-fills the window opaque (`enterWorkspace` before show, theme-updated
 *   handler, macOS minimize fallback). An opaque fill covers the acrylic
 *   material, and an injected duplicate `backgroundColor` key would lose to
 *   the opaque one (last key wins in an object literal). The recipe therefore
 *   recognises three verbatim region shapes — pristine-with-base,
 *   pristine-without-base (older builds), and the legacy half-patch this
 *   recipe's predecessor left behind — and converges all of them onto one
 *   canonical patch: transparent base fill carrying `backgroundMaterial` on
 *   the SAME key, transparent caption overlay, transparent runtime fills.
 *
 * Safety rails:
 *   · every state is classified against verbatim anchors inside the region
 *     and the runtime-fill statements only, and the region must lie inside
 *     the `lib/main.js` blob located via the asar header — unknown builds are
 *     refused, never guessed at;
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
// Builds that paint the opaque workspace base carry their own
// `backgroundColor: chromeFallbackFill(),` in the primary block: the recipe is
// attached to THAT key (never inserted beside it — a duplicate
// `backgroundColor` key would leave the opaque fill winning the literal).
const BASE_FROM = "backgroundColor: chromeFallbackFill(),";
const BASE_TO =
  'backgroundColor: "#00000000",\n' +
  '\t\t\tbackgroundMaterial: "acrylic",';

// Older builds without the base fill: insert the pair right after the
// primary-block opener instead.
const SPREAD_FROM = "primary ? {\n";
const SPREAD_TO =
  "primary ? {\n" +
  '\t\t\tbackgroundColor: "#00000000",\n' +
  '\t\t\tbackgroundMaterial: "acrylic",\n';

// Legacy repair — the pre-shape-aware recipe inserted its pair BEFORE the base
// fill on new builds, leaving the opaque key winning the object literal
// (post-compaction text, as stored on disk). Recognised verbatim and repaired
// by dropping the dead opaque key.
const LEGACY_FROM =
  'backgroundColor: "#00000000", backgroundMaterial: "acrylic", ' +
  "backgroundColor: chromeFallbackFill(),";
const LEGACY_TO = 'backgroundColor: "#00000000", backgroundMaterial: "acrylic",';

// Semantic change C — the runtime re-fills the window with the opaque
// workspace base (`enterWorkspace` before show, `updateBackground` on theme
// change, macOS minimize fallback). Every occurrence goes transparent, in
// place at the same byte width (statement + space padding).
const FILL_FROM = "window.setBackgroundColor(chromeFallbackFill());";
const FILL_BODY = 'window.setBackgroundColor("#00000000");';
const FILL_TO = FILL_BODY + " ".repeat(FILL_FROM.length - FILL_BODY.length);
// Hard gate for change C: every base-fill call site must match FILL_FROM
// verbatim (catches reformatted / renamed call sites instead of skipping).
const FILL_PROBE = "setBackgroundColor(chromeFallbackFill";

// Region-scoped classification signatures (the welcome window also carries a
// `backgroundMaterial`, so whole-file heuristics are never used).
const SIG_MATERIAL = 'backgroundMaterial: "acrylic"';
const SIG_ORIGINAL = "chromeFallbackFill()";

const ASAR_PATH = process.env.DSH_LG_ASAR_PATH || "D:\\Program Files (x86)\\dsh\\resources\\app.asar";
const BACKUP_PATH = ASAR_PATH + ".lg-backup";

/** Build the patched region from any recognised shape (new base / old spread /
 *  legacy half-patch): one canonical patch — transparent base fill carrying
 *  `backgroundMaterial`, transparent overlay — compact layout whitespace (no
 *  string literal in this region spans lines), then pad with spaces back to
 *  the EXACT original byte length. */
function buildPatchedRegion(region) {
  let out = region;
  if (out.includes(LEGACY_FROM)) {
    out = out.replace(LEGACY_FROM, LEGACY_TO);
  } else if (out.includes(BASE_FROM)) {
    out = out.replace(BASE_FROM, BASE_TO);
    out = out.replace(COLOR_FROM, COLOR_TO);
  } else if (out.includes(SPREAD_FROM) && out.includes(COLOR_FROM)) {
    out = out.replace(SPREAD_FROM, SPREAD_TO);
    out = out.replace(COLOR_FROM, COLOR_TO);
  } else {
    throw new Error("patch anchors missing inside region");
  }
  out = out.replace(/\n\t+/g, " "); // harvest whitespace for the additions
  if (Buffer.byteLength(out, "utf8") > Buffer.byteLength(region, "utf8")) {
    throw new Error("region too small for same-length patch");
  }
  const pad = Buffer.byteLength(region, "utf8") - Buffer.byteLength(out, "utf8");
  return out + " ".repeat(pad);
}

/** Region state from verbatim in-region anchors only:
 *  `patched`  — acrylic pair on the base fill, no fallback fill left;
 *  `legacy`   — the predecessor recipe's half-patch (dead opaque key wins the
 *               literal); inject repairs it in place, restore also accepts it;
 *  `original` — recognised pristine shape (with or without the base fill);
 *  `unknown`  — anything else: refused, never guessed at. */
function classifyRegion(region) {
  const material = region.includes(SIG_MATERIAL);
  const base = region.includes(SIG_ORIGINAL);
  if (material && !base) return "patched";
  if (material && base) return "legacy";
  if (!material && base) return "original";
  return "unknown";
}

/** Runtime-fill state across the whole `lib/main.js` blob: `original` when
 *  opaque base-fill calls survive and all match FILL_FROM verbatim,
 *  `patched` when this recipe's transparent replacements are in place,
 *  `absent` on builds that never carried the calls (nothing to do either
 *  way), `unknown` on anything else — refused, never guessed at. */
function classifyFill(blob) {
  if (blob.includes(FILL_PROBE)) {
    let fromCount = 0;
    for (let at = blob.indexOf(FILL_FROM); at !== -1; at = blob.indexOf(FILL_FROM, at + 1)) fromCount += 1;
    let probeCount = 0;
    for (let at = blob.indexOf(FILL_PROBE); at !== -1; at = blob.indexOf(FILL_PROBE, at + 1)) probeCount += 1;
    return fromCount > 0 && fromCount === probeCount ? "original" : "unknown";
  }
  return blob.includes(FILL_TO) ? "patched" : "absent";
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

/** Snapshot of the patcher state, safe to serialize to the UI. `legacy` (the
 *  predecessor recipe's half-patch) reports as `patched` — the settings page
 *  keeps its three-state contract while 注入 repairs the region in place. */
function status() {
  let state = "unknown";
  let error = null;
  try {
    const view = inspect();
    const fillState = classifyFill(view.blob);
    const regionState = classifyRegion(view.region);
    state = regionState === "legacy" ? "patched" : regionState;
    if (fillState === "unknown") {
      state = "unknown";
      error = "runtime fill anchors unverified";
    }
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

/** Inject the acrylic window patch (idempotent: any recognised state —
 *  original, legacy half-patch, partially filled — converges on the canonical
 *  patch). */
function injectPatch() {
  return serial(() => {
    const view = inspect();
    const regionState = classifyRegion(view.region);
    const fillState = classifyFill(view.blob);
    const fillDone = fillState === "patched" || fillState === "absent";
    if (regionState === "patched" && fillDone) {
      return { ok: true, state: "patched", message: "already-injected" };
    }
    if (regionState === "unknown" || fillState === "unknown") {
      return { ok: false, state: "unknown", message: "unknown-host-build" };
    }

    ensureBackup(readStat(ASAR_PATH).size);

    const newBlob = Buffer.from(view.blob); // copy
    const writes = []; // { pos: absolute file offset, buf: same-length span }
    if (regionState !== "patched") {
      let patched;
      try {
        patched = buildPatchedRegion(view.region);
        assertCompiles(patched);
      } catch (error) {
        return { ok: false, state: regionState === "legacy" ? "patched" : regionState, message: "patch-refused: " + error.message };
      }
      const relStart = view.regionStart - view.blobStart;
      newBlob.write(patched, relStart, "utf8");
      writes.push({ pos: view.regionStart, buf: Buffer.from(patched, "utf8") });
    }
    // Semantic change C — every runtime base-fill statement, in place.
    for (let at = newBlob.indexOf(FILL_FROM); at !== -1; at = newBlob.indexOf(FILL_FROM, at + 1)) {
      newBlob.write(FILL_TO, at, "utf8");
      writes.push({ pos: view.blobStart + at, buf: Buffer.from(FILL_TO, "utf8") });
    }
    if (newBlob.includes(FILL_PROBE)) {
      return { ok: false, state: "unknown", message: "patch-refused: runtime fill anchors missing" };
    }

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
          for (const write of writes) fs.writeSync(fd, write.buf, 0, write.buf.length, write.pos);
          if (hexPositions) {
            const hexBuf = Buffer.from(newHash, "utf8");
            for (const pos of hexPositions) fs.writeSync(fd, hexBuf, 0, hexBuf.length, pos);
          }
          fs.fsyncSync(fd);
        } finally {
          fs.closeSync(fd);
        }
      });
      const verify = inspect();
      const verifyFill = classifyFill(verify.blob);
      if (classifyRegion(verify.region) !== "patched" || (verifyFill !== "patched" && verifyFill !== "absent")) {
        throw new Error("verify failed: " + classifyRegion(verify.region) + "/" + verifyFill);
      }
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
    const view = inspect();
    const regionState = classifyRegion(view.region);
    const fillState = classifyFill(view.blob);
    if (regionState === "unknown" || fillState === "unknown") {
      return { ok: false, state: "unknown", message: "unknown-host-build" };
    }
    // `original` / `absent` fills both read as "pristine runtime fills".
    const fillPristine = fillState === "original" || fillState === "absent";
    if (regionState === "original" && fillPristine) {
      return { ok: true, state: "original", message: "already-original" };
    }

    const backup = backupInfo();
    if (!backup.exists) return { ok: false, state: "patched", message: "backup-missing" };
    if (backup.size !== asarSize) return { ok: false, state: "patched", message: "backup-version-mismatch" };
    try {
      restoreFromBackup();
      const verify = inspect();
      const verifyFill = classifyFill(verify.blob);
      if (classifyRegion(verify.region) !== "original" || (verifyFill !== "original" && verifyFill !== "absent")) {
        throw new Error("verify failed");
      }
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
