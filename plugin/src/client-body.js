/**
 * Marisa UI — client factory body (source of truth for plugin/client.js).
 *
 * tools/build-plugin.mjs prepends the generated prelude (module/exports,
 * PLUGIN_ID, VERSION, TOKENS, CSS) and appends `return module.exports;`.
 * This file is plain script body code — no imports; `React` arrives through
 * the ModuleLoader module table (`require("react")`), exactly like the
 * runner's own bundle.
 */

const React = require("react");

/* ------------------------------ stylesheet ----------------------------- */
const CSS_TAG_ID = PLUGIN_ID + "/theme.css";

/** Inject the plugin-owned stylesheet and return a disposer that removes it. */
function injectStyles() {
  const selector = "style[data-plugin-css=" + JSON.stringify(CSS_TAG_ID) + "]";
  const existing = document.querySelector(selector);
  if (existing) return () => existing.remove();
  const tag = document.createElement("style");
  tag.dataset.plugin = PLUGIN_ID;
  tag.dataset.pluginCss = CSS_TAG_ID;
  tag.textContent = CSS;
  document.head.appendChild(tag);
  return () => tag.remove();
}

/* ------------------------------- tuning -------------------------------- */
/** Knob defaults (percent of the design baseline) and their slider bounds. */
const TUNE_DEFAULTS = { aurora: 100, glass: 100, rim: 100, radius: 100, shadow: 100, focus: 100 };
const TUNE_BOUNDS = {
  aurora: [0, 150],
  glass: [25, 100],
  rim: [0, 150],
  radius: [0, 150],
  shadow: [0, 150],
  focus: [0, 150]
};
const TUNE_KEYS = ["--lg-tune-aurora", "--lg-tune-glass", "--lg-tune-rim", "--lg-tune-radius", "--lg-tune-shadow", "--lg-tune-focus"];
const TUNE_STORAGE_PREFIX = "dsh.ui-liquidglass.tune.";

/** Clamp one knob into its bounds and snap to the 5% slider step. */
function clampTune(key, value) {
  const bounds = TUNE_BOUNDS[key];
  if (!Number.isFinite(value)) return TUNE_DEFAULTS[key];
  return Math.min(bounds[1], Math.max(bounds[0], Math.round(value / 5) * 5));
}

/** Read every knob from localStorage (absent/invalid falls back to default). */
function readTuning() {
  const out = { ...TUNE_DEFAULTS };
  try {
    for (const key of Object.keys(TUNE_DEFAULTS)) {
      const raw = localStorage.getItem(TUNE_STORAGE_PREFIX + key);
      if (raw !== null) out[key] = clampTune(key, Number(raw));
    }
  } catch {}
  return out;
}

/** Persist every knob; localStorage may be unavailable (private mode) — ignore. */
function writeTuning(tuning) {
  try {
    for (const key of Object.keys(TUNE_DEFAULTS)) {
      localStorage.setItem(TUNE_STORAGE_PREFIX + key, String(tuning[key]));
    }
  } catch {}
}

/** Push the knobs onto <html> as the `--lg-tune-*` gains theme.css consumes. */
function applyTuning(tuning) {
  const style = document.documentElement.style;
  style.setProperty("--lg-tune-aurora", String(tuning.aurora / 100));
  style.setProperty("--lg-tune-glass", String(tuning.glass / 100));
  style.setProperty("--lg-tune-rim", String(tuning.rim / 100));
  style.setProperty("--lg-tune-radius", String(tuning.radius / 100));
  style.setProperty("--lg-tune-shadow", String(tuning.shadow / 100));
  style.setProperty("--lg-tune-focus", String(tuning.focus / 100));
}

/** Remove the inline gains so the stylesheet defaults take over again. */
function clearTuning() {
  const style = document.documentElement.style;
  for (const key of TUNE_KEYS) style.removeProperty(key);
}

/* --------------------------- wallpaper reveal -------------------------- */
/** Storage key of the wallpaper-glass reveal toggle (see theme.css). */
const REVEAL_STORAGE_KEY = "dsh.ui-liquidglass.reveal";

/** Read the reveal toggle (absent = off). */
function readReveal() {
  try {
    return localStorage.getItem(REVEAL_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Persist the reveal toggle. */
function writeReveal(on) {
  try {
    if (on) localStorage.setItem(REVEAL_STORAGE_KEY, "1");
    else localStorage.removeItem(REVEAL_STORAGE_KEY);
  } catch {}
}

/** Flip the canvas transparency marker theme.css reacts to. */
function applyReveal(on) {
  if (on) document.documentElement.dataset.lgReveal = "on";
  else delete document.documentElement.dataset.lgReveal;
}

/* -------------------------------- locale -------------------------------- */
/** Dictionary namespace owned by this plugin (the settings-row copy). */
const NS = "settings.liquidglass";

/** Simplified Chinese dictionary (the key-set source of truth). */
const zh = {
  "liquidglass.title": "魔理沙UI",
  "liquidglass.desc": "调节极光与玻璃外观的细节强度。数值为设计基准的百分比，改动即时生效并自动保存。",
  "liquidglass.aurora": "极光强度",
  "liquidglass.glass": "玻璃不透明度",
  "liquidglass.rim": "高光与描边",
  "liquidglass.radius": "圆角缩放",
  "liquidglass.shadow": "阴影深度",
  "liquidglass.focus": "焦点环",
  "liquidglass.reveal": "透出桌面壁纸",
  "liquidglass.revealHint": "开启后整窗画布变透明，配合宿主窗口的透明或系统材质（亚克力/云母）即可透出桌面。宿主未开启时窗口将显示纯色背景。",
  "liquidglass.winpatch.title": "窗口玻璃（系统级）",
  "liquidglass.winpatch.desc": "向安装目录的 app.asar 注入原生亚克力窗口（自动备份原始文件，可随时还原），与“透出桌面壁纸”配合即为完整壁纸玻璃。注入 / 还原后需完全重启 DSH；DSH 升级会覆盖注入，届时重新注入即可。",
  "liquidglass.winpatch.inject": "注入 app.asar",
  "liquidglass.winpatch.restore": "还原原始 app.asar",
  "liquidglass.winpatch.stateOriginal": "状态：未注入",
  "liquidglass.winpatch.statePatched": "状态：已注入",
  "liquidglass.winpatch.stateUnknown": "状态：未知 —— 找不到补丁锚点，未做任何改动",
  "liquidglass.winpatch.backupHave": "备份已保留",
  "liquidglass.winpatch.backupNone": "尚无备份（注入时自动创建）",
  "liquidglass.winpatch.busy": "正在写入 app.asar，请稍候……",
  "liquidglass.winpatch.doneInject": "注入完成：请完全退出并重启 DSH 后生效。",
  "liquidglass.winpatch.doneRestore": "还原完成：请完全退出并重启 DSH 后生效。",
  "liquidglass.winpatch.alreadyInjected": "已是注入状态，无需重复注入。",
  "liquidglass.winpatch.alreadyOriginal": "已是原始状态。",
  "liquidglass.winpatch.backupMissing": "找不到备份文件，无法还原。",
  "liquidglass.winpatch.backupMismatch": "备份与当前版本不一致（DSH 已升级）—— 请直接重新注入，勿用旧备份还原。",
  "liquidglass.winpatch.fail": "操作失败",
  "liquidglass.reset": "恢复默认"
};

/** English dictionary. */
const en = {
  "liquidglass.title": "Marisa UI",
  "liquidglass.desc": "Tune the aurora and glass look — percentages of the design baseline. Changes apply instantly and persist automatically.",
  "liquidglass.aurora": "Aurora",
  "liquidglass.glass": "Glass opacity",
  "liquidglass.rim": "Rim & edges",
  "liquidglass.radius": "Corner radius",
  "liquidglass.shadow": "Shadow depth",
  "liquidglass.focus": "Focus ring",
  "liquidglass.reveal": "Desktop reveal",
  "liquidglass.revealHint": "Makes the window canvas transparent so a transparent host window or system backdrop (acrylic / mica) shows the desktop. Without host support the window shows a flat colour.",
  "liquidglass.winpatch.title": "Window glass (system level)",
  "liquidglass.winpatch.desc": "Injects a native acrylic main window into the installed app.asar (the pristine file is backed up automatically and can be restored anytime). Combined with Desktop reveal this is full wallpaper glass. A complete DSH restart is required after inject / restore; a DSH upgrade overwrites the patch — just inject again.",
  "liquidglass.winpatch.inject": "Inject app.asar",
  "liquidglass.winpatch.restore": "Restore original app.asar",
  "liquidglass.winpatch.stateOriginal": "State: not injected",
  "liquidglass.winpatch.statePatched": "State: injected",
  "liquidglass.winpatch.stateUnknown": "State: unknown — patch anchors not found, nothing was changed",
  "liquidglass.winpatch.backupHave": "backup kept",
  "liquidglass.winpatch.backupNone": "no backup yet (created on inject)",
  "liquidglass.winpatch.busy": "Writing app.asar, please wait…",
  "liquidglass.winpatch.doneInject": "Injected: fully quit and restart DSH to take effect.",
  "liquidglass.winpatch.doneRestore": "Restored: fully quit and restart DSH to take effect.",
  "liquidglass.winpatch.alreadyInjected": "Already injected.",
  "liquidglass.winpatch.alreadyOriginal": "Already original.",
  "liquidglass.winpatch.backupMissing": "Backup not found — cannot restore.",
  "liquidglass.winpatch.backupMismatch": "Backup does not match the current version (DSH was upgraded) — re-inject instead of restoring the old backup.",
  "liquidglass.winpatch.fail": "Operation failed",
  "liquidglass.reset": "Reset defaults"
};

/** Locale registration payload. */
const STRINGS = { zh, en };

/* ------------------------- window-glass patcher ------------------------- */
/**
 * Drive the host patcher (plugin/index.js) over same-origin fetch. The host
 * half mounts three routes on the DSH web server (`/liquidglass/status|inject|
 * |restore`, owner-principal only); this is the same transport the official
 * client bundles use to reach the dsh runtime.
 */
async function callHost(action) {
  const res = await fetch("/liquidglass/" + action, {
    method: action === "status" ? "GET" : "POST",
    cache: "no-store"
  });
  let body = null;
  try {
    body = await res.json();
  } catch {}
  if (!res.ok) throw new Error((body && body.message) || "HTTP " + res.status);
  return body;
}

/** Host result message → locale key. */
const PATCH_MSG_KEYS = {
  "already-injected": "liquidglass.winpatch.alreadyInjected",
  "injected": "liquidglass.winpatch.doneInject",
  "already-original": "liquidglass.winpatch.alreadyOriginal",
  "restored": "liquidglass.winpatch.doneRestore",
  "unknown-host-build": "liquidglass.winpatch.stateUnknown",
  "backup-missing": "liquidglass.winpatch.backupMissing",
  "backup-version-mismatch": "liquidglass.winpatch.backupMismatch"
};

/* ----------------------------- settings page ---------------------------- */
/**
 * The 魔理沙UI settings PAGE (slot `settings.section`) — its own entry in the
 * Settings panel navigation, beside General / Models / Plugins / Account.
 * Self-contained: knobs live in React state, persist to localStorage and are
 * pushed to the document through `--lg-tune-*` — the stylesheet recomposites
 * the whole UI from those gains, so no imperative restyling is needed.
 */
function SettingsPage(props) {
  const t = typeof props.t === "function" ? props.t : (key) => zh[key] ?? key;
  const [tuning, setTuning] = React.useState(() => readTuning());
  const [reveal, setRevealState] = React.useState(() => readReveal());
  const [patchState, setPatchState] = React.useState(null);
  const [patchBusy, setPatchBusy] = React.useState(false);
  const [patchMsg, setPatchMsg] = React.useState("");
  React.useEffect(() => {
    callHost("status")
      .then((s) => setPatchState(s))
      .catch((e) => setPatchMsg(t("liquidglass.winpatch.fail") + ": " + String((e && e.message) || e)));
  }, []);
  const runPatch = async (action) => {
    if (patchBusy) return;
    setPatchBusy(true);
    setPatchMsg(t("liquidglass.winpatch.busy"));
    try {
      const res = await callHost(action);
      const key = res && PATCH_MSG_KEYS[res.message];
      setPatchMsg(key ? t(key) : String((res && res.message) || ""));
    } catch (e) {
      setPatchMsg(t("liquidglass.winpatch.fail") + ": " + String((e && e.message) || e));
    }
    try {
      setPatchState(await callHost("status"));
    } catch {}
    setPatchBusy(false);
  };
  const update = (key, value) => {
    setTuning((prev) => {
      const next = { ...prev, [key]: value };
      writeTuning(next);
      applyTuning(next);
      return next;
    });
  };
  const toggleReveal = (on) => {
    setRevealState(on);
    writeReveal(on);
    applyReveal(on);
  };
  const reset = () => {
    const next = { ...TUNE_DEFAULTS };
    writeTuning(next);
    applyTuning(next);
    setTuning(next);
    writeReveal(false);
    applyReveal(false);
    setRevealState(false);
  };
  const rows = [
    ["aurora", 0, 150],
    ["glass", 25, 100],
    ["rim", 0, 150],
    ["radius", 0, 150],
    ["shadow", 0, 150],
    ["focus", 0, 150]
  ];
  return React.createElement(
    "div",
    { "data-lg-settings": "" },
    React.createElement(
      "div",
      { className: "lg-tune-head" },
      React.createElement("div", { className: "lg-tune-title" }, t("liquidglass.title")),
      React.createElement("div", { className: "lg-tune-desc" }, t("liquidglass.desc"))
    ),
    React.createElement(
      "div",
      { className: "lg-tune-grid" },
      rows.map(([key, min, max]) =>
        React.createElement(
          "div",
          { className: "lg-tune-row", key },
          React.createElement("label", { className: "lg-tune-label", htmlFor: "lg-tune-" + key }, t("liquidglass." + key)),
          React.createElement("input", {
            id: "lg-tune-" + key,
            type: "range",
            min: String(min),
            max: String(max),
            step: "5",
            value: String(tuning[key]),
            onChange: (event) => update(key, Number(event.target.value))
          }),
          React.createElement("span", { className: "lg-tune-value" }, tuning[key] + "%")
        )
      )
    ),
    React.createElement(
      "div",
      { className: "lg-tune-toggle" },
      React.createElement("label", { className: "lg-tune-label", htmlFor: "lg-tune-reveal" }, t("liquidglass.reveal")),
      React.createElement("input", {
        id: "lg-tune-reveal",
        type: "checkbox",
        checked: reveal,
        onChange: (event) => toggleReveal(event.target.checked)
      }),
      React.createElement("div", { className: "lg-tune-hint" }, t("liquidglass.revealHint"))
    ),
    React.createElement(
      "div",
      { className: "lg-patch" },
      React.createElement("div", { className: "lg-tune-title" }, t("liquidglass.winpatch.title")),
      React.createElement("div", { className: "lg-tune-desc" }, t("liquidglass.winpatch.desc")),
      React.createElement(
        "div",
        { className: "lg-patch-status" },
        patchState
          ? (patchState.state === "patched"
              ? t("liquidglass.winpatch.statePatched")
              : patchState.state === "original"
                ? t("liquidglass.winpatch.stateOriginal")
                : t("liquidglass.winpatch.stateUnknown")) +
            (patchState.error ? "（" + patchState.error + "）" : "") +
            " · " +
            (patchState.backup && patchState.backup.exists
              ? t("liquidglass.winpatch.backupHave")
              : t("liquidglass.winpatch.backupNone"))
          : "—"
      ),
      React.createElement(
        "div",
        { className: "lg-patch-actions" },
        React.createElement(
          "button",
          { type: "button", className: "lg-tune-reset", disabled: patchBusy, onClick: () => runPatch("inject") },
          t("liquidglass.winpatch.inject")
        ),
        React.createElement(
          "button",
          { type: "button", className: "lg-tune-reset", disabled: patchBusy, onClick: () => runPatch("restore") },
          t("liquidglass.winpatch.restore")
        )
      ),
      patchMsg ? React.createElement("div", { className: "lg-patch-msg" }, patchMsg) : null
    ),
    React.createElement("button", { type: "button", className: "lg-tune-reset", onClick: reset }, t("liquidglass.reset"))
  );
}

/* ------------------------------ plugin body ----------------------------- */
/** Required services: theme override stack plus the settings-page surfaces. */
const inject = ["theme", "slots", "locale"];

/** Client plugin body. */
function apply(ctx) {
  ctx.effect(() => {
    document.documentElement.dataset.lgTheme = VERSION;
    console.info("[魔理沙UI] active v" + VERSION);
    return () => {
      delete document.documentElement.dataset.lgTheme;
    };
  }, "liquid-glass: version marker");
  ctx.effect(() => ctx.theme.overrideTokens(PLUGIN_ID, TOKENS), "liquid-glass: alias token overrides");
  ctx.effect(() => injectStyles(), "liquid-glass: stylesheet");
  ctx.effect(() => {
    applyTuning(readTuning());
    return () => clearTuning();
  }, "liquid-glass: tuning values");
  ctx.effect(() => {
    applyReveal(readReveal());
    return () => applyReveal(false);
  }, "liquid-glass: wallpaper reveal");
  ctx.effect(() => ctx.locale.register(NS, STRINGS), "liquid-glass: settings dictionaries");
  ctx.slots.inject("settings.section", () =>
    ctx.slots.register(
      {
        name: "settings.section",
        id: "liquid-glass",
        order: 90,
        // Nav label re-read per projection, so it follows the active locale.
        label: () => (String(ctx.locale.getLocale().active).toLowerCase().startsWith("zh") ? zh["liquidglass.title"] : en["liquidglass.title"]),
        locale: NS
      },
      SettingsPage
    )
  );
}

exports.apply = apply;
exports.inject = inject;
