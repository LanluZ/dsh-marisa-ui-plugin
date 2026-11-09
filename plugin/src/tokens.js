/**
 * Alias-token overrides for the Marisa UI theme. Each entry is a
 * { light, dark } pair because `ctx.theme.overrideTokens` requires one value
 * per colour scheme.
 *
 * Fills are translucent but deliberately more opaque than a blur-backed glass
 * system would need: the theme paints no real-time backdrop blur (that is the
 * single most expensive effect in an Electron webview), so surface contrast is
 * carried by the fill plus the gradients and rim light in theme.css.
 */
export const TOKENS = {
  "--dsw-alias-bg-base": { light: "transparent", dark: "transparent" },
  "--dsw-alias-bg-layer-1": { light: "rgba(255,255,255,0.92)", dark: "rgba(17,21,36,0.86)" },
  "--dsw-alias-bg-layer-2": { light: "rgba(255,255,255,0.89)", dark: "rgba(22,27,44,0.89)" },
  "--dsw-alias-bg-layer-3": { light: "rgba(255,255,255,0.92)", dark: "rgba(29,34,54,0.92)" },
  "--dsw-alias-bg-layer-4": { light: "rgba(255,255,255,0.92)", dark: "rgba(38,43,66,0.94)" },
  "--dsw-alias-bg-overlay": { light: "rgba(255,255,255,0.80)", dark: "rgba(9,12,22,0.86)" },
  "--dsw-alias-bg-mask-1": { light: "rgba(10,15,30,0.35)", dark: "rgba(3,5,12,0.55)" },
  "--dsw-alias-bg-mask-2": { light: "rgba(10,15,30,0.18)", dark: "rgba(3,5,12,0.35)" },
  "--dsw-alias-bg-mask-3": { light: "rgba(10,15,30,0.55)", dark: "rgba(3,5,12,0.72)" },
  "--dsw-alias-bg-module-platform": { light: "rgba(248,250,255,0.88)", dark: "rgba(28,32,50,0.86)" },
  "--dsw-alias-bg-multi-select": { light: "rgba(248,250,255,0.90)", dark: "rgba(28,32,50,0.88)" },
  "--dsw-alias-bg-skeleton": { light: "rgba(10,20,40,0.06)", dark: "rgba(255,255,255,0.08)" },
  "--dsw-alias-bg-document-preview": { light: "rgba(255,255,255,0.92)", dark: "rgba(7,10,20,0.90)" },
  "--dsw-menu-surface-fill": { light: "rgba(252,253,255,0.98)", dark: "rgba(17,21,34,0.96)" },
  "--dsw-specific-menu": { light: "rgba(252,253,255,0.98)", dark: "rgba(17,21,34,0.96)" },
  "--dsw-specific-sidebar-fill": { light: "#eef2fb", dark: "#111827" },
  "--dsw-alias-menu-group-header-fill": { light: "rgba(252,253,255,0.98)", dark: "rgba(17,21,34,0.98)" },
  "--dsw-alias-menu-icon": { light: "#2a3145", dark: "#eaf0ff" },
  "--dsw-alias-border-l1": { light: "rgba(12,22,45,0.07)", dark: "rgba(255,255,255,0.10)" },
  "--dsw-alias-border-l2": { light: "rgba(12,22,45,0.12)", dark: "rgba(255,255,255,0.16)" },
  "--dsw-alias-border-l3": { light: "rgba(12,22,45,0.18)", dark: "rgba(255,255,255,0.22)" },
  "--dsw-alias-border-l4": { light: "rgba(12,22,45,0.26)", dark: "rgba(255,255,255,0.30)" },
  "--dsw-alias-label-primary": { light: "#0c1322", dark: "#f6f9ff" },
  "--dsw-alias-label-primary-dimmed": { light: "#1b2438", dark: "#e9eefc" },
  "--dsw-alias-label-secondary": { light: "rgba(32,42,62,0.78)", dark: "rgba(230,237,252,0.80)" },
  "--dsw-alias-label-tertiary": { light: "rgba(52,64,88,0.64)", dark: "rgba(208,218,240,0.64)" },
  "--dsw-alias-interactive-bg-hover": { light: "rgba(13,28,60,0.07)", dark: "rgba(255,255,255,0.09)" },
  "--dsw-alias-interactive-bg-active": { light: "rgba(13,28,60,0.12)", dark: "rgba(255,255,255,0.14)" },
  "--dsw-alias-state-business-primary": { light: "#3b6fe0", dark: "#8fb8ff" },
  "--dsw-alias-state-business-tertiary": { light: "rgba(59,111,224,0.12)", dark: "rgba(120,160,255,0.18)" },
  "--dsw-alias-markdown-code-block": { light: "rgba(255,255,255,0.82)", dark: "rgba(5,8,16,0.80)" },
  "--dsw-alias-toast-bg": { light: "rgba(255,255,255,0.90)", dark: "rgba(14,18,31,0.94)" },
  "--dsw-alias-toast-label": { light: "#0c1322", dark: "#f4f8ff" },
  "--dsw-alias-scrollbar-bg-l1": { light: "rgba(15,30,60,0.18)", dark: "rgba(255,255,255,0.18)" },
  "--dsw-alias-scrollbar-hover-l1": { light: "rgba(15,30,60,0.30)", dark: "rgba(255,255,255,0.30)" },
  "--dsw-alias-switch-thumb": { light: "#ffffff", dark: "#eaf0ff" },
};
