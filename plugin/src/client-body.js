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
/**
 * Knob defaults — the parameter set captured from the 魔理沙UI reference and
 * baked in as the factory baseline ("记住当前参数，这些作为默认参数存在"):
 * aurora 105%, glass 100%, window 40%, whole-window 80%, rim 100%,
 * radius 105%, shadow 100%, focus 100%. This set is the shared intensity
 * baseline of BOTH built-in schemes (1.11.0): 「深色」 wraps it with the dark
 * background layer, 「浅色」 wraps it with the light one.
 */
const TUNE_DEFAULTS = { aurora: 105, glass: 100, window: 40, total: 80, rim: 100, radius: 105, shadow: 100, focus: 100 };
const TUNE_BOUNDS = {
  aurora: [0, 150],
  glass: [25, 100],
  window: [25, 150],
  total: [25, 100],
  rim: [0, 150],
  radius: [0, 150],
  shadow: [0, 150],
  focus: [0, 150]
};
const TUNE_KEYS = ["--lg-tune-aurora", "--lg-tune-glass", "--lg-tune-window", "--lg-tune-total", "--lg-tune-rim", "--lg-tune-radius", "--lg-tune-shadow", "--lg-tune-focus"];
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

/** Persist every knob. A value sitting at its default drops its storage key so
 *  the factory defaults stay the single source of truth. localStorage may be
 *  unavailable (private mode) — ignore. */
function writeTuning(tuning) {
  try {
    for (const key of Object.keys(TUNE_DEFAULTS)) {
      if (tuning[key] === TUNE_DEFAULTS[key]) localStorage.removeItem(TUNE_STORAGE_PREFIX + key);
      else localStorage.setItem(TUNE_STORAGE_PREFIX + key, String(tuning[key]));
    }
  } catch {}
}

/** Push the knobs onto <html> as the `--lg-tune-*` gains theme.css consumes.
 * `total` is the app-level glass master ("应用级毛玻璃注入后的透明度"): it folds
 * into the four GLASS gains at write time (glass / window / rim / shadow), so
 * every decorative glass layer — component fills, big-panel fills, sheen, rims,
 * shadows — fades or solidifies as ONE slab. TEXT AND ICONS NEVER DIM: label
 * colours come from host tokens (no gain), and theme.css divides the fold back
 * out of --lg-placeholder (placeholder is text). aurora / radius / focus are
 * not glass and keep their own axes. */
function applyTuning(tuning) {
  const style = document.documentElement.style;
  const total = tuning.total / 100;
  style.setProperty("--lg-tune-aurora", String(tuning.aurora / 100));
  style.setProperty("--lg-tune-glass", String((tuning.glass / 100) * total));
  style.setProperty("--lg-tune-window", String((tuning.window / 100) * total));
  style.setProperty("--lg-tune-total", String(total));
  style.setProperty("--lg-tune-rim", String((tuning.rim / 100) * total));
  style.setProperty("--lg-tune-radius", String(tuning.radius / 100));
  style.setProperty("--lg-tune-shadow", String((tuning.shadow / 100) * total));
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
/** Factory default of the reveal toggle ("透出桌面壁纸" ships ON). */
const REVEAL_DEFAULT = true;

/** Read the reveal toggle (absent = factory default). */
function readReveal() {
  try {
    const raw = localStorage.getItem(REVEAL_STORAGE_KEY);
    return raw === "1" ? true : raw === "0" ? false : REVEAL_DEFAULT;
  } catch {
    return REVEAL_DEFAULT;
  }
}

/** Persist the reveal toggle (the default state removes the key). */
function writeReveal(on) {
  try {
    if (on === REVEAL_DEFAULT) localStorage.removeItem(REVEAL_STORAGE_KEY);
    else localStorage.setItem(REVEAL_STORAGE_KEY, on ? "1" : "0");
  } catch {}
}

/** Flip the canvas transparency marker theme.css reacts to. */
function applyReveal(on) {
  if (on) document.documentElement.dataset.lgReveal = "on";
  else delete document.documentElement.dataset.lgReveal;
}

/* ------------------------ window background layer ----------------------- */
/**
 * The stacked semi-transparent solid background ("叠背景") over the WHOLE
 * injected window: one flat colour layer whose alpha IS the window opacity —
 * the post-injection transparency control. Settings lets the user type RGBA
 * (its A = the opacity). theme.css paints the layer on the WINDOW SHELL
 * (`[class*="_frame"]` — the level the draggable titlebar rides, already
 * transparent through the injection) under `data-lg-bg="custom"`: one
 * background behind the glass UI, over the aurora canvas, surviving 透出桌面
 * 壁纸 mode.
 */
const BG_STORAGE_KEY = "dsh.ui-liquidglass.bg";

/** The 「深色」 layer — the dark-scheme baseline captured from the reference
 *  UI: rgba(5, 12, 14, 0.55). "No stored custom layer" resolves to this, so
 *  the factory DEFAULT scheme is 深色. */
const BG_DEFAULT = { r: 5, g: 12, b: 14, a: 55 };

/** The 「浅色」 layer (1.11.0) — the light-scheme counterpart, sampled from
 *  the theme's own light palette baseline rgb(238 242 251) at the same 55%
 *  alpha. It pairs with the host light theme. */
const BG_LIGHT = { r: 238, g: 242, b: 251, a: 55 };

/** Structural equality of two layer colours. */
function bgEquals(a, b) {
  return !!a && !!b && a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

/** Read the background layer ("r,g,b,a", a in percent; absent = 「默认」). */
function readBg() {
  try {
    const raw = localStorage.getItem(BG_STORAGE_KEY);
    if (!raw) return { ...BG_DEFAULT };
    const parts = raw.split(",").map(Number);
    if (parts.length !== 4 || !parts.every(Number.isFinite)) return { ...BG_DEFAULT };
    return {
      r: Math.min(255, Math.max(0, Math.round(parts[0]))),
      g: Math.min(255, Math.max(0, Math.round(parts[1]))),
      b: Math.min(255, Math.max(0, Math.round(parts[2]))),
      a: Math.min(100, Math.max(0, Math.round(parts[3])))
    };
  } catch {
    return { ...BG_DEFAULT };
  }
}

/** Persist the layer; a value equal to 「默认」 removes the key. */
function writeBg(bg) {
  try {
    if (bg && !bgEquals(bg, BG_DEFAULT)) localStorage.setItem(BG_STORAGE_KEY, bg.r + "," + bg.g + "," + bg.b + "," + bg.a);
    else localStorage.removeItem(BG_STORAGE_KEY);
  } catch {}
}

/** Apply the layer: inline `--lg-bg-*` plus the custom-mode marker. */
function applyBg(bg) {
  const el = document.documentElement;
  if (!bg) {
    delete el.dataset.lgBg;
    for (const key of ["--lg-bg-r", "--lg-bg-g", "--lg-bg-b", "--lg-bg-a"]) el.style.removeProperty(key);
    return;
  }
  el.dataset.lgBg = "custom";
  el.style.setProperty("--lg-bg-r", String(bg.r));
  el.style.setProperty("--lg-bg-g", String(bg.g));
  el.style.setProperty("--lg-bg-b", String(bg.b));
  el.style.setProperty("--lg-bg-a", String(bg.a / 100));
}

/** Remove the inline layer so the stylesheet baseline takes over again. */
function clearBg() {
  applyBg(null);
}

/* --------------------------- sidebar frame ----------------------------- */
/**
 * Storage key of the left-sidebar frame toggle (see theme.css). The host's
 * own left panel is a plain square area — no radius, no rim, no shadow —
 * while its main panel is a rounded glass card; this knob lets the user pick.
 * Absent = on (the theme's full glass frame); "0" = off (plain fill only).
 */
const SIDEBAR_FRAME_STORAGE_KEY = "dsh.ui-liquidglass.sidebarFrame";
/** Factory default of the sidebar-frame toggle ("左侧栏玻璃面板" ships OFF). */
const SIDEBAR_FRAME_DEFAULT = false;

/** Read the sidebar frame toggle (absent = factory default). */
function readSidebarFrame() {
  try {
    const raw = localStorage.getItem(SIDEBAR_FRAME_STORAGE_KEY);
    return raw === "1" ? true : raw === "0" ? false : SIDEBAR_FRAME_DEFAULT;
  } catch {
    return SIDEBAR_FRAME_DEFAULT;
  }
}

/** Persist the sidebar frame toggle (default state removes the key). */
function writeSidebarFrame(on) {
  try {
    if (on === SIDEBAR_FRAME_DEFAULT) localStorage.removeItem(SIDEBAR_FRAME_STORAGE_KEY);
    else localStorage.setItem(SIDEBAR_FRAME_STORAGE_KEY, on ? "1" : "0");
  } catch {}
}

/** Mark the document so theme.css can strip the frame from ONLY the left column. */
function applySidebarFrame(on) {
  if (on) delete document.documentElement.dataset.lgSidebarFrame;
  else document.documentElement.dataset.lgSidebarFrame = "off";
}

/* -------------------------------- locale -------------------------------- */
/** Dictionary namespace owned by this plugin (the settings-row copy). */
const NS = "settings.liquidglass";

/** Simplified Chinese dictionary (the key-set source of truth). */
const zh = {
  "liquidglass.title": "魔理沙UI",
  "liquidglass.desc": "调节玻璃与 UI 外观的细节强度。数值为设计基准的百分比，改动即时生效并自动保存。不透明度三档分工：玻璃 = 组件表面（输入卡/菜单/气泡等），窗口 = 三块大面板（侧栏/主面板/右栏），整窗 = 应用级毛玻璃总透明度——所有玻璃层（填充/高光/描边/投影）统一变实/变透，文字与图标始终保持清晰；配合窗口玻璃注入 + 透出桌面壁纸即为注入后毛玻璃的透明度调节。",
  "liquidglass.theme.title": "主题配色",
  "liquidglass.theme.desc": "「深色」= 出厂深色配色：极光 105% · 玻璃 100% · 窗口 40% · 整窗玻璃 80% · 高光与描边 100% · 圆角 105% · 阴影深度 100% · 焦点环 100% · 叠层 rgba(5, 12, 14, 0.55) · 透出桌面壁纸开 · 左侧栏玻璃面板关。「浅色」= 出厂浅色配色：叠层换为 rgba(238, 242, 251, 0.55)，其余强度基准与深色完全一致（配合宿主浅色主题使用）。改动任一参数即自动切到「自定义」；点击样式按钮套用对应参数集。「深色」「浅色」还会同步把 DSH「通用设置 → 外观」切换为深色 / 浅色（「自定义」不改动宿主外观）。",
  "liquidglass.style.dark": "深色",
  "liquidglass.style.light": "浅色",
  "liquidglass.style.default": "默认",
  "liquidglass.style.custom": "自定义",
  "liquidglass.style.customHint": "「自定义」= 你最近一次调整的参数；改动任一参数后自动生成",
  "liquidglass.details": "详细设置",
  "liquidglass.detailsHide": "收起详细设置",
  "liquidglass.window.title": "窗口透明度",
  "liquidglass.aurora": "极光强度",
  "liquidglass.glass": "玻璃不透明度",
  "liquidglass.window": "窗口不透明度",
  "liquidglass.total": "整窗玻璃透明度",
  "liquidglass.rim": "高光与描边",
  "liquidglass.radius": "圆角缩放",
  "liquidglass.shadow": "阴影深度",
  "liquidglass.focus": "焦点环",
  "liquidglass.bg.title": "背景叠层",
  "liquidglass.bg.desc": "叠在整个注入窗口上的半透明纯色背景层：颜色与不透明度自行输入 RGBA，**实时作用于整个窗口**。叠层画在窗口外壳层——与顶部可拖拽标题栏同级（那里已被系统级注入透明化），是一整块覆盖全窗（含标题栏条带）的背景：压在极光画布之上、玻璃面板之下。A 即窗口不透明度。面板纯色填充保持各自设计色与不透明度，叠层不染色界面；高光/描边/投影与文字图标均不受影响。透出桌面壁纸模式下叠层依旧生效。",
  "liquidglass.bg.a": "叠层不透明度",
  "liquidglass.reveal": "透出桌面壁纸",
  "liquidglass.revealHint": "开启后整窗画布变透明，配合宿主窗口的透明或系统材质（亚克力/云母）即可透出桌面。宿主未开启时窗口将显示纯色背景。",
  "liquidglass.sidebarFrame": "左侧栏玻璃面板",
  "liquidglass.sidebarFrameHint": "宿主原生左侧面板是直角素面（主面板才是圆角玻璃卡）。关闭后左侧栏整块透明：无圆角、描边、高光、投影，玻璃填充与底部渐隐也一并移除，直接透出窗口底层（极光画布 / 透出桌面时的壁纸）；中栏与右栏不受影响。",
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
  "liquidglass.winpatch.fail": "操作失败"
};

/** English dictionary. */
const en = {
  "liquidglass.title": "Marisa UI",
  "liquidglass.desc": "Tune the glass and UI look — percentages of the design baseline. Changes apply instantly and persist automatically. Three opacity tiers: Glass = component surfaces, Window = the three big panels, Whole-window = app-level glass master — every glass layer (fills, sheen, rims, shadows) fades or solidifies as one slab while text and icons stay perfectly crisp; with the window-glass patch + desktop reveal this is the post-injection glass transparency knob.",
  "liquidglass.theme.title": "Theme colours",
  "liquidglass.theme.desc": "\"Dark\" = factory dark scheme: aurora 105% · glass 100% · window 40% · whole-window 80% · rim 100% · radius 105% · shadow 100% · focus 100% · layer rgba(5, 12, 14, 0.55) · desktop reveal on · left sidebar glass panel off. \"Light\" = factory light scheme: layer rgba(238, 242, 251, 0.55), every other baseline identical to Dark (use with the host light theme). Changing any parameter switches to \"Custom\"; click a style button to apply its parameter set. \"Dark\" / \"Light\" also switch DSH's own General Settings → Appearance to the matching dark / light preference (\"Custom\" leaves the host appearance untouched).",
  "liquidglass.style.dark": "Dark",
  "liquidglass.style.light": "Light",
  "liquidglass.style.default": "Default",
  "liquidglass.style.custom": "Custom",
  "liquidglass.style.customHint": "\"Custom\" = your latest tweaked parameters; it appears once you change anything",
  "liquidglass.details": "Details",
  "liquidglass.detailsHide": "Hide details",
  "liquidglass.window.title": "Window transparency",
  "liquidglass.aurora": "Aurora",
  "liquidglass.glass": "Glass opacity",
  "liquidglass.window": "Window opacity",
  "liquidglass.total": "Whole-window glass",
  "liquidglass.rim": "Rim & edges",
  "liquidglass.radius": "Corner radius",
  "liquidglass.shadow": "Shadow depth",
  "liquidglass.focus": "Focus ring",
  "liquidglass.bg.title": "Background layer",
  "liquidglass.bg.desc": "A semi-transparent solid colour stacked over the whole injected window — type any RGBA and it applies live. The layer paints at the window-shell level — the same shell the draggable titlebar rides (already transparent through the system-level injection) — one background covering the whole window including the titlebar strip, stacked over the aurora canvas and under the glass panels. A IS the window opacity. Surface fills keep their designed colours and alphas — the layer never recolours the UI — and highlights, rims, shadows, text and icons are unaffected. The layer stays active in wallpaper-reveal mode.",
  "liquidglass.bg.a": "Layer opacity",
  "liquidglass.reveal": "Desktop reveal",
  "liquidglass.revealHint": "Makes the window canvas transparent so a transparent host window or system backdrop (acrylic / mica) shows the desktop. Without host support the window shows a flat colour.",
  "liquidglass.sidebarFrame": "Left sidebar glass panel",
  "liquidglass.sidebarFrameHint": "The host's native left panel is a plain square area (only its main panel is a rounded glass card). Turn off to make the whole left column transparent — no radius, rim, highlight, shadow, fill or footer fade, so the window's bottom layer (aurora canvas, or the desktop in reveal mode) shows straight through. Center and right columns are unaffected.",
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
  "liquidglass.winpatch.fail": "Operation failed"
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
 * Bridge to DSH's own appearance preference (General Settings → 外观), wired to
 * `ctx.theme.setTheme` in apply(). The theme service is the ONLY preference
 * write entry: it persists to the same user-settings document the 外观 row
 * displays and emits `theme/change`, so the row selection, the global palette
 * (`data-ds-theme-source` / `data-ds-dark-theme`) and this theme's own CSS
 * light overrides all follow. Null when the theme seat is unavailable.
 */
let switchDshAppearance = null;

/**
 * The 魔理沙UI settings PAGE (slot `settings.section`) — its own entry in the
 * Settings panel navigation, beside General / Models / Plugins / Account.
 *
 * Layout ("默认只留下主题配色按钮，点击详细设置才展开"):
 *   · 主题配色 — the always-visible style row. Style buttons 「深色」「浅色」
 *     「自定义」 (1.11.0): 深色 = the dark factory set (the old 「默认」),
 *     浅色 = the light factory set (same intensity baseline, light layer).
 *     Changing ANY parameter auto-selects 自定义 ("如果参数改变就切到自定义").
 *     Special function (1.12.0): clicking 深色 / 浅色 ALSO switches DSH's own
 *     General Settings → 外观 to the matching dark / light preference through
 *     `ctx.theme.setTheme` (the documented preference-write entry); 自定义
 *     never touches the host appearance.
 *   · 窗口透明度 — a collapsed card; 「详细设置」 expands the eight tuning
 *     sliders plus the wallpaper-reveal / sidebar-frame toggles. Carries its
 *     own 样式 buttons.
 *   · 背景叠层 — a collapsed card; 「详细设置」 expands the RGBA layer inputs.
 *     Carries its own 样式 buttons (默认 = rgba(5, 12, 14, 0.55)).
 *   · 窗口玻璃（系统级）— the app.asar window-glass patcher, kept at the OUTER
 *     level ("系统注入移动到外层"): its own always-visible card, no gate.
 *
 * Everything is self-contained: knobs live in React state, persist to
 * localStorage and are pushed to the document through `--lg-tune-*` — the
 * stylesheet recomposites the whole UI from those gains, so no imperative
 * restyling is needed.
 */
function SettingsPage(props) {
  const t = typeof props.t === "function" ? props.t : (key) => zh[key] ?? key;
  const [tuning, setTuning] = React.useState(() => readTuning());
  const [reveal, setRevealState] = React.useState(() => readReveal());
  const [sidebarFrame, setSidebarFrameState] = React.useState(() => readSidebarFrame());
  const [bg, setBg] = React.useState(() => readBg());
  const [openWindow, setOpenWindow] = React.useState(false);
  const [openBg, setOpenBg] = React.useState(false);
  const [patchState, setPatchState] = React.useState(null);
  const [patchBusy, setPatchBusy] = React.useState(false);
  const [patchMsg, setPatchMsg] = React.useState("");
  /** Last user-tweaked parameter set per style scope (the 「自定义」 target). */
  const custom = React.useRef({ theme: null, window: null, bg: null });
  /** Last explicitly picked built-in scheme ("dark" | "light"); null = 深色,
   *  so the factory DEFAULT is the dark scheme. Used only to resolve which
   *  built-in layer the 背景叠层 card's 「默认」 chip restores. */
  const schemeRef = React.useRef(null);

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

  /* ---- commit helpers: persist + apply + mirror into React state ---- */
  const commitTuning = (next) => {
    writeTuning(next);
    applyTuning(next);
    setTuning(next);
  };
  const commitReveal = (on) => {
    writeReveal(on);
    applyReveal(on);
    setRevealState(on);
  };
  const commitSidebarFrame = (on) => {
    writeSidebarFrame(on);
    applySidebarFrame(on);
    setSidebarFrameState(on);
  };
  const commitBg = (next) => {
    writeBg(next);
    applyBg(next);
    setBg(next);
  };

  /* ---- 「自定义」 snapshots: taken on every user tweak ---- */
  const noteWindow = (tune, rev, side) => {
    custom.current.window = { tuning: { ...tune }, reveal: rev, sidebarFrame: side };
    custom.current.theme = { tuning: { ...tune }, reveal: rev, sidebarFrame: side, bg: { ...bg } };
  };
  const noteBg = (next) => {
    custom.current.bg = { ...next };
    custom.current.theme = { tuning: { ...tuning }, reveal, sidebarFrame, bg: { ...next } };
  };

  const update = (key, value) => {
    const next = { ...tuning, [key]: value };
    commitTuning(next);
    noteWindow(next, reveal, sidebarFrame);
  };
  const toggleReveal = (on) => {
    commitReveal(on);
    noteWindow(tuning, on, sidebarFrame);
  };
  const toggleSidebarFrame = (on) => {
    commitSidebarFrame(on);
    noteWindow(tuning, reveal, on);
  };
  const updateBg = (field, value) => {
    const next = { ...bg, [field]: value };
    commitBg(next);
    noteBg(next);
  };

  /* ---- derived style state (1.11.0): 深色 / 浅色 ⇔ the full built-in set
     matches; anything else is 自定义. The two schemes share the intensity
     baseline and differ only in the background layer colour. ---- */
  const windowIsDefault =
    Object.keys(TUNE_DEFAULTS).every((key) => tuning[key] === TUNE_DEFAULTS[key]) &&
    reveal === REVEAL_DEFAULT &&
    sidebarFrame === SIDEBAR_FRAME_DEFAULT;
  const bgIsBuiltin = bgEquals(bg, BG_DEFAULT) || bgEquals(bg, BG_LIGHT);
  const themeStyle = !windowIsDefault
    ? "custom"
    : bgEquals(bg, BG_DEFAULT)
      ? "dark"
      : bgEquals(bg, BG_LIGHT)
        ? "light"
        : "custom";

  /* ---- style-button actions: 深色 / 浅色 = built-in sets, 自定义 = last tweak ---- */
  const pickWindowStyle = (style) => {
    if (style === "default") {
      commitTuning({ ...TUNE_DEFAULTS });
      commitReveal(REVEAL_DEFAULT);
      commitSidebarFrame(SIDEBAR_FRAME_DEFAULT);
      return;
    }
    const saved = custom.current.window;
    if (saved) {
      commitTuning({ ...saved.tuning });
      commitReveal(saved.reveal);
      commitSidebarFrame(saved.sidebarFrame);
    }
  };
  const pickBgStyle = (style) => {
    if (style === "default") commitBg({ ...(schemeRef.current === "light" ? BG_LIGHT : BG_DEFAULT) });
    else if (custom.current.bg) commitBg({ ...custom.current.bg });
  };
  const pickThemeStyle = (style) => {
    if (style === "dark" || style === "light") {
      schemeRef.current = style;
      commitTuning({ ...TUNE_DEFAULTS });
      commitReveal(REVEAL_DEFAULT);
      commitSidebarFrame(SIDEBAR_FRAME_DEFAULT);
      commitBg(style === "light" ? { ...BG_LIGHT } : { ...BG_DEFAULT });
      // Special function (1.12.0): also switch DSH's own General Settings →
      // 外观 to the matching dark / light preference. 自定义 never does.
      if (switchDshAppearance) switchDshAppearance(style);
      return;
    }
    const saved = custom.current.theme;
    if (saved) {
      commitTuning({ ...saved.tuning });
      commitReveal(saved.reveal);
      commitSidebarFrame(saved.sidebarFrame);
      commitBg({ ...saved.bg });
    }
  };

  /** The 「默认」 / 「自定义」 style-button pair (样式按钮). */
  const styleButtons = (isDefault, hasCustom, onPick) =>
    React.createElement(
      "div",
      { className: "lg-style" },
      React.createElement(
        "button",
        { type: "button", className: "lg-style-chip", "aria-pressed": String(isDefault), onClick: () => onPick("default") },
        t("liquidglass.style.default")
      ),
      React.createElement(
        "button",
        {
          type: "button",
          className: "lg-style-chip",
          "aria-pressed": String(!isDefault),
          disabled: !hasCustom,
          title: t("liquidglass.style.customHint"),
          onClick: () => onPick("custom")
        },
        t("liquidglass.style.custom")
      )
    );

  /** The 「深色」/「浅色」/「自定义」 scheme-chip triple for 主题配色 (1.11.0). */
  const schemeButtons = (style, hasCustom, onPick) =>
    React.createElement(
      "div",
      { className: "lg-style" },
      React.createElement(
        "button",
        { type: "button", className: "lg-style-chip", "aria-pressed": String(style === "dark"), onClick: () => onPick("dark") },
        t("liquidglass.style.dark")
      ),
      React.createElement(
        "button",
        { type: "button", className: "lg-style-chip", "aria-pressed": String(style === "light"), onClick: () => onPick("light") },
        t("liquidglass.style.light")
      ),
      React.createElement(
        "button",
        {
          type: "button",
          className: "lg-style-chip",
          "aria-pressed": String(style === "custom"),
          disabled: !hasCustom,
          title: t("liquidglass.style.customHint"),
          onClick: () => onPick("custom")
        },
        t("liquidglass.style.custom")
      )
    );

  const bgNum = (field, min, max) =>
    React.createElement("input", {
      id: "lg-bg-" + field,
      type: "number",
      min: String(min),
      max: String(max),
      value: String(bg[field]),
      onChange: (event) => {
        const value = Number(event.target.value);
        if (Number.isFinite(value)) updateBg(field, Math.min(max, Math.max(min, Math.round(value))));
      }
    });
  const rows = [
    ["aurora", 0, 150],
    ["glass", 25, 100],
    ["window", 25, 150],
    ["total", 25, 100],
    ["rim", 0, 150],
    ["radius", 0, 150],
    ["shadow", 0, 150],
    ["focus", 0, 150]
  ];
  const detailsButton = (open, onToggle) =>
    React.createElement(
      "button",
      { type: "button", className: "lg-details-btn", "aria-expanded": String(open), onClick: onToggle },
      open ? t("liquidglass.detailsHide") : t("liquidglass.details")
    );

  return React.createElement(
    "div",
    { "data-lg-settings": "" },
    React.createElement(
      "div",
      { className: "lg-tune-head" },
      React.createElement("div", { className: "lg-tune-title" }, t("liquidglass.title")),
      React.createElement("div", { className: "lg-tune-desc" }, t("liquidglass.desc"))
    ),
    /* -------------------------- 主题配色 (always visible) -------------------------- */
    React.createElement(
      "div",
      { className: "lg-card" },
      React.createElement(
        "div",
        { className: "lg-card-bar" },
        React.createElement("div", { className: "lg-card-title" }, t("liquidglass.theme.title")),
        schemeButtons(themeStyle, themeStyle === "custom" || custom.current.theme !== null, pickThemeStyle)
      ),
      React.createElement("div", { className: "lg-tune-hint" }, t("liquidglass.theme.desc"))
    ),
    /* ------------------------- 窗口透明度 (details collapsed) ----------------------- */
    React.createElement(
      "div",
      { className: "lg-card" },
      React.createElement(
        "div",
        { className: "lg-card-bar" },
        React.createElement("div", { className: "lg-card-title" }, t("liquidglass.window.title")),
        styleButtons(windowIsDefault, !windowIsDefault || custom.current.window !== null, pickWindowStyle),
        detailsButton(openWindow, () => setOpenWindow((v) => !v))
      ),
      openWindow
        ? React.createElement(
            "div",
            { className: "lg-card-body" },
            React.createElement("div", { className: "lg-tune-desc" }, t("liquidglass.desc")),
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
              { className: "lg-tune-toggle" },
              React.createElement("label", { className: "lg-tune-label", htmlFor: "lg-tune-sidebar-frame" }, t("liquidglass.sidebarFrame")),
              React.createElement("input", {
                id: "lg-tune-sidebar-frame",
                type: "checkbox",
                checked: sidebarFrame,
                onChange: (event) => toggleSidebarFrame(event.target.checked)
              }),
              React.createElement("div", { className: "lg-tune-hint" }, t("liquidglass.sidebarFrameHint"))
            )
          )
        : null
    ),
    /* ---------------------------- 背景叠层 (details collapsed) ---------------------- */
    React.createElement(
      "div",
      { className: "lg-card" },
      React.createElement(
        "div",
        { className: "lg-card-bar" },
        React.createElement("div", { className: "lg-card-title" }, t("liquidglass.bg.title")),
        styleButtons(bgIsBuiltin, !bgIsBuiltin || custom.current.bg !== null, pickBgStyle),
        detailsButton(openBg, () => setOpenBg((v) => !v))
      ),
      openBg
        ? React.createElement(
            "div",
            { className: "lg-bg" },
            React.createElement("div", { className: "lg-tune-desc" }, t("liquidglass.bg.desc")),
            React.createElement(
              "div",
              { className: "lg-bg-row" },
              React.createElement("label", { htmlFor: "lg-bg-r" }, "R"),
              bgNum("r", 0, 255),
              React.createElement("label", { htmlFor: "lg-bg-g" }, "G"),
              bgNum("g", 0, 255),
              React.createElement("label", { htmlFor: "lg-bg-b" }, "B"),
              bgNum("b", 0, 255),
              React.createElement("label", { htmlFor: "lg-bg-a" }, "A"),
              bgNum("a", 0, 100),
              React.createElement("input", {
                type: "range",
                min: "0",
                max: "100",
                step: "5",
                value: String(bg.a),
                "aria-label": t("liquidglass.bg.a"),
                onChange: (event) => updateBg("a", Number(event.target.value))
              })
            ),
            React.createElement(
              "div",
              { className: "lg-tune-hint" },
              "rgba(" + bg.r + ", " + bg.g + ", " + bg.b + ", " + (bg.a / 100).toFixed(2) + ") · " +
                (bgEquals(bg, BG_DEFAULT)
                  ? t("liquidglass.style.dark")
                  : bgEquals(bg, BG_LIGHT)
                    ? t("liquidglass.style.light")
                    : t("liquidglass.style.custom"))
            )
          )
        : null
    ),
    /* --------------- 窗口玻璃（系统级）— outer level, always visible ---------------- */
    React.createElement(
      "div",
      { className: "lg-card" },
      React.createElement("div", { className: "lg-card-title" }, t("liquidglass.winpatch.title")),
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
    )
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
    applyBg(readBg());
    return () => clearBg();
  }, "liquid-glass: window background layer");
  ctx.effect(() => {
    applyReveal(readReveal());
    return () => applyReveal(false);
  }, "liquid-glass: wallpaper reveal");
  ctx.effect(() => {
    applySidebarFrame(readSidebarFrame());
    return () => applySidebarFrame(true);
  }, "liquid-glass: sidebar frame");
  // 深色/浅色 chips drive DSH's own General Settings → 外观 via the theme
  // service's setTheme (the only preference-write entry). Guarded so a missing
  // or future-incompatible seat degrades to scheme-only switching.
  ctx.effect(() => {
    switchDshAppearance = (mode) => {
      try {
        ctx.theme.setTheme(mode);
      } catch (e) {
        console.warn("[魔理沙UI] 切换 DSH 外观失败:", e);
      }
    };
    return () => {
      switchDshAppearance = null;
    };
  }, "liquid-glass: DSH appearance bridge");
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
