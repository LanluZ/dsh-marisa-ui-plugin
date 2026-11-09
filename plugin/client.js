/* GENERATED FILE — built by tools/build-plugin.mjs from
   plugin/src/{theme.css,tokens.js,client-body.js}.
   Do not edit by hand; edit the sources and rerun the build. */
window.__ModuleLoader__.load({
	id: "@local/dsh-ui-liquidglass",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const PLUGIN_ID = "@local/dsh-ui-liquidglass";
		const VERSION = "1.9.1";
		/** Alias-token override layers, one light/dark pair per token. */
		const TOKENS = {
		  "--dsw-alias-bg-base": {
		    "light": "transparent",
		    "dark": "transparent"
		  },
		  "--dsw-alias-bg-layer-1": {
		    "light": "rgba(255,255,255,0.92)",
		    "dark": "rgba(17,21,36,0.86)"
		  },
		  "--dsw-alias-bg-layer-2": {
		    "light": "rgba(255,255,255,0.89)",
		    "dark": "rgba(22,27,44,0.89)"
		  },
		  "--dsw-alias-bg-layer-3": {
		    "light": "rgba(255,255,255,0.92)",
		    "dark": "rgba(29,34,54,0.92)"
		  },
		  "--dsw-alias-bg-layer-4": {
		    "light": "rgba(255,255,255,0.92)",
		    "dark": "rgba(38,43,66,0.94)"
		  },
		  "--dsw-alias-bg-overlay": {
		    "light": "rgba(255,255,255,0.80)",
		    "dark": "rgba(9,12,22,0.86)"
		  },
		  "--dsw-alias-bg-mask-1": {
		    "light": "rgba(10,15,30,0.35)",
		    "dark": "rgba(3,5,12,0.55)"
		  },
		  "--dsw-alias-bg-mask-2": {
		    "light": "rgba(10,15,30,0.18)",
		    "dark": "rgba(3,5,12,0.35)"
		  },
		  "--dsw-alias-bg-mask-3": {
		    "light": "rgba(10,15,30,0.55)",
		    "dark": "rgba(3,5,12,0.72)"
		  },
		  "--dsw-alias-bg-module-platform": {
		    "light": "rgba(248,250,255,0.88)",
		    "dark": "rgba(28,32,50,0.86)"
		  },
		  "--dsw-alias-bg-multi-select": {
		    "light": "rgba(248,250,255,0.90)",
		    "dark": "rgba(28,32,50,0.88)"
		  },
		  "--dsw-alias-bg-skeleton": {
		    "light": "rgba(10,20,40,0.06)",
		    "dark": "rgba(255,255,255,0.08)"
		  },
		  "--dsw-alias-bg-document-preview": {
		    "light": "rgba(255,255,255,0.92)",
		    "dark": "rgba(7,10,20,0.90)"
		  },
		  "--dsw-menu-surface-fill": {
		    "light": "rgba(252,253,255,0.98)",
		    "dark": "rgba(17,21,34,0.96)"
		  },
		  "--dsw-specific-menu": {
		    "light": "rgba(252,253,255,0.98)",
		    "dark": "rgba(17,21,34,0.96)"
		  },
		  "--dsw-specific-sidebar-fill": {
		    "light": "#eef2fb",
		    "dark": "#111827"
		  },
		  "--dsw-alias-menu-group-header-fill": {
		    "light": "rgba(252,253,255,0.98)",
		    "dark": "rgba(17,21,34,0.98)"
		  },
		  "--dsw-alias-menu-icon": {
		    "light": "#2a3145",
		    "dark": "#eaf0ff"
		  },
		  "--dsw-alias-border-l1": {
		    "light": "rgba(12,22,45,0.07)",
		    "dark": "rgba(255,255,255,0.10)"
		  },
		  "--dsw-alias-border-l2": {
		    "light": "rgba(12,22,45,0.12)",
		    "dark": "rgba(255,255,255,0.16)"
		  },
		  "--dsw-alias-border-l3": {
		    "light": "rgba(12,22,45,0.18)",
		    "dark": "rgba(255,255,255,0.22)"
		  },
		  "--dsw-alias-border-l4": {
		    "light": "rgba(12,22,45,0.26)",
		    "dark": "rgba(255,255,255,0.30)"
		  },
		  "--dsw-alias-label-primary": {
		    "light": "#0c1322",
		    "dark": "#f6f9ff"
		  },
		  "--dsw-alias-label-primary-dimmed": {
		    "light": "#1b2438",
		    "dark": "#e9eefc"
		  },
		  "--dsw-alias-label-secondary": {
		    "light": "rgba(32,42,62,0.78)",
		    "dark": "rgba(230,237,252,0.80)"
		  },
		  "--dsw-alias-label-tertiary": {
		    "light": "rgba(52,64,88,0.64)",
		    "dark": "rgba(208,218,240,0.64)"
		  },
		  "--dsw-alias-interactive-bg-hover": {
		    "light": "rgba(13,28,60,0.07)",
		    "dark": "rgba(255,255,255,0.09)"
		  },
		  "--dsw-alias-interactive-bg-active": {
		    "light": "rgba(13,28,60,0.12)",
		    "dark": "rgba(255,255,255,0.14)"
		  },
		  "--dsw-alias-state-business-primary": {
		    "light": "#3b6fe0",
		    "dark": "#8fb8ff"
		  },
		  "--dsw-alias-state-business-tertiary": {
		    "light": "rgba(59,111,224,0.12)",
		    "dark": "rgba(120,160,255,0.18)"
		  },
		  "--dsw-alias-markdown-code-block": {
		    "light": "rgba(255,255,255,0.82)",
		    "dark": "rgba(5,8,16,0.80)"
		  },
		  "--dsw-alias-toast-bg": {
		    "light": "rgba(255,255,255,0.90)",
		    "dark": "rgba(14,18,31,0.94)"
		  },
		  "--dsw-alias-toast-label": {
		    "light": "#0c1322",
		    "dark": "#f4f8ff"
		  },
		  "--dsw-alias-scrollbar-bg-l1": {
		    "light": "rgba(15,30,60,0.18)",
		    "dark": "rgba(255,255,255,0.18)"
		  },
		  "--dsw-alias-scrollbar-hover-l1": {
		    "light": "rgba(15,30,60,0.30)",
		    "dark": "rgba(255,255,255,0.30)"
		  },
		  "--dsw-alias-switch-thumb": {
		    "light": "#ffffff",
		    "dark": "#eaf0ff"
		  }
		};
		/** Complete stylesheet for the glass surface language. */
		const CSS = "/* =========================================================================\n   DSH Marisa UI — theme layer (performance edition)\n   -------------------------------------------------------------------------\n   Runtime budget rules:\n     · no backdrop-filter / filter / mix-blend-mode anywhere;\n     · no CSS animations, no pointer-driven JS, no extra DOM layers;\n     · the aurora is one static paint on the document canvas (html), so it is\n       cached by the compositor and never repainted by scrolling or streaming;\n     · glass is expressed with layered gradients, rim light and a tinted fill,\n       not real-time blur. Large scrolling surfaces carry no clip layer.\n   Tunable layer: every decorative alpha / radius below is multiplied by one\n   of the `--lg-tune-*` gains (default 1 = the design baseline). The Settings\n   page writes those gains on <html>; because they are plain custom properties\n   the whole UI re-composites without any repaint scripting.\n   ========================================================================= */\n\n/* ------------------------------ backdrop ------------------------------- */\nhtml {\n  background-color: #05060e !important;\n  background-image:\n    radial-gradient(58vmax 58vmax at 12% 4%, rgba(34, 211, 238, calc(0.32 * var(--lg-tune-aurora))), transparent 70%),\n    radial-gradient(52vmax 52vmax at 84% 0%, rgba(59, 130, 246, calc(0.28 * var(--lg-tune-aurora))), transparent 70%),\n    radial-gradient(62vmax 62vmax at 90% 58%, rgba(139, 92, 246, calc(0.32 * var(--lg-tune-aurora))), transparent 72%),\n    radial-gradient(52vmax 52vmax at 6% 88%, rgba(236, 72, 153, calc(0.20 * var(--lg-tune-aurora))), transparent 72%),\n    radial-gradient(46vmax 46vmax at 68% 98%, rgba(251, 191, 36, calc(0.16 * var(--lg-tune-aurora))), transparent 74%),\n    radial-gradient(120% 100% at 50% 34%, rgba(2, 3, 8, 0) 40%, rgba(2, 3, 8, 0.55) 100%),\n    linear-gradient(160deg, #080a14 0%, #04050c 58%, #030409 100%);\n  background-repeat: no-repeat;\n}\n\nbody {\n  background: transparent !important;\n}\n\n/* Wallpaper-glass reveal mode (experimental): the Settings page writes\n   `data-lg-reveal=\"on\"` on <html> and the document canvas turns transparent,\n   so a host window that itself supports transparency or a system backdrop\n   (mica / acrylic) shows the desktop behind the glass panels. Without host\n   window support the window simply shows its flat window colour — see\n   docs/API.md §1.5. Panels keep their tuned fills; dial 玻璃不透明度 down to\n   let more of the desktop through. */\nhtml[data-lg-reveal=\"on\"],\nhtml[data-lg-reveal=\"on\"]:has(body:not([data-ds-dark-theme])) {\n  background: transparent !important;\n  /* The caption-button probe (windowsAppearance IPC) measures this token and\n     feeds setTitleBarOverlay — report transparent so the native button strip\n     rides the acrylic backdrop instead of painting an opaque block. */\n  --dsw-specific-sidebar-fill: #00000000;\n}\n\n/* ------------------------- interaction palette -------------------------\n   One light/dark pair per interaction colour, declared once on <html> and\n   consumed by every hover / border / placeholder rule below. The previous\n   revision hardcoded white overlays in the base (dark) rules, so the light\n   theme silently lost most hover and border feedback; centralising the\n   palette here makes that class of drift impossible. Every alpha rides a\n   `--lg-tune-*` gain so the Settings row scales whole layers at once. */\nhtml {\n  /* Tunable gains (written by the Settings row; 1 = design default). */\n  --lg-tune-aurora: 1;\n  --lg-tune-glass: 1;\n  --lg-tune-rim: 1;\n  --lg-tune-radius: 1;\n  --lg-tune-shadow: 1;\n  --lg-tune-focus: 1;\n\n  --lg-hover: rgba(255, 255, 255, calc(0.06 * var(--lg-tune-glass)));\n  --lg-hover-strong: rgba(255, 255, 255, calc(0.09 * var(--lg-tune-glass)));\n  --lg-rim: rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim)));\n  --lg-hairline: rgba(255, 255, 255, calc(0.055 * var(--lg-tune-rim)));\n  --lg-selected: rgba(124, 158, 255, calc(0.16 * var(--lg-tune-glass)));\n  --lg-badge-bg: rgba(255, 255, 255, calc(0.09 * var(--lg-tune-glass)));\n  --lg-placeholder: rgba(222, 230, 248, calc(0.55 * var(--lg-tune-glass)));\n  --lg-foot-scrim: rgba(8, 10, 18, calc(0.22 * var(--lg-tune-glass)));\n  --lg-focus-ring: rgba(103, 232, 249, calc(0.55 * var(--lg-tune-focus)));\n  --lg-quote-bar: rgba(129, 140, 248, calc(0.60 * var(--lg-tune-focus)));\n  /* Hairline rim around the whole window: the glass slab needs its edge\n     defined, especially in wallpaper-reveal mode. */\n  --lg-window-rim: rgba(255, 255, 255, calc(0.10 * var(--lg-tune-rim)));\n  /* RGB triple behind the titlebar fade; the opaque end samples the exact\n     caption-button colour via `--dsw-specific-sidebar-fill`. */\n  --lg-titlebar-rgb: 17 24 39;\n}\n\nhtml:has(body:not([data-ds-dark-theme])) {\n  --lg-hover: rgba(13, 28, 60, calc(0.07 * var(--lg-tune-glass)));\n  --lg-hover-strong: rgba(13, 28, 60, calc(0.10 * var(--lg-tune-glass)));\n  --lg-rim: rgba(30, 41, 89, calc(0.16 * var(--lg-tune-rim)));\n  --lg-hairline: rgba(30, 41, 89, calc(0.10 * var(--lg-tune-rim)));\n  --lg-selected: rgba(59, 111, 224, calc(0.14 * var(--lg-tune-glass)));\n  --lg-badge-bg: rgba(30, 41, 89, calc(0.08 * var(--lg-tune-glass)));\n  --lg-placeholder: rgba(52, 64, 88, calc(0.60 * var(--lg-tune-glass)));\n  --lg-foot-scrim: rgba(30, 41, 89, calc(0.08 * var(--lg-tune-glass)));\n  --lg-focus-ring: rgba(59, 111, 224, calc(0.55 * var(--lg-tune-focus)));\n  --lg-quote-bar: rgba(59, 111, 224, calc(0.55 * var(--lg-tune-focus)));\n  --lg-window-rim: rgba(30, 41, 89, calc(0.12 * var(--lg-tune-rim)));\n  --lg-titlebar-rgb: 238 242 251;\n}\n\n/* ---------------------------- app shell ------------------------------- */\n[class*=\"_frame\"] {\n  background: transparent !important;\n  border: 0 !important;\n  /* one hairline specular ring around the whole window edge */\n  box-shadow: inset 0 0 0 1px var(--lg-window-rim) !important;\n}\n\n/* Windows titlebar strip: aurora glass on the left, fading into the exact\n   colour the native caption buttons sample (`--dsw-specific-sidebar-fill`) on\n   the right, so minimise / maximise / close sit on a matching surface instead\n   of a grey block floating on glass. One rule serves both schemes: the fade\n   colour comes from the palette triple, the opaque end from the token. */\n[data-windows-titlebar] [class*=\"_frame\"]::before {\n  background:\n    linear-gradient(\n      90deg,\n      rgb(var(--lg-titlebar-rgb) / 0) 0%,\n      rgb(var(--lg-titlebar-rgb) / 0) calc(100% - 260px),\n      rgb(var(--lg-titlebar-rgb) / 0.55) calc(100% - 200px),\n      var(--dsw-specific-sidebar-fill) calc(100% - 150px),\n      var(--dsw-specific-sidebar-fill) 100%\n    ) !important;\n}\n\n/* Reveal mode: never paint the opaque caption-button block over a native\n   acrylic / mica backdrop (the welcome-window style overlay is fully\n   transparent there) — the strip keeps its readability band and ends in\n   transparency on both sides. */\nhtml[data-lg-reveal=\"on\"] [data-windows-titlebar] [class*=\"_frame\"]::before {\n  background:\n    linear-gradient(\n      90deg,\n      rgb(var(--lg-titlebar-rgb) / 0) 0%,\n      rgb(var(--lg-titlebar-rgb) / 0) calc(100% - 260px),\n      rgb(var(--lg-titlebar-rgb) / 0.55) calc(100% - 200px),\n      rgb(var(--lg-titlebar-rgb) / 0) calc(100% - 150px),\n      rgb(var(--lg-titlebar-rgb) / 0) 100%\n    ) !important;\n}\n\n/* Floating glass columns: the 8px gutter lives on the FRAME (grid gap +\n   padding), never on the columns. The sidebar root carries an inline width\n   equal to its whole grid track and its column clips overflow, so any\n   margin/width inset on the column chopped the right edge of the button area\n   and its text. Gap + padding inset the panels while every column keeps its\n   full track width, so nothing can be clipped. */\n[class*=\"_frame\"]:has(> [class*=\"_sidebarCol\"]) {\n  column-gap: 8px !important;\n  padding-left: 8px;\n  padding-right: 8px;\n  padding-bottom: 8px;\n}\n\nhtml[data-windows-titlebar] [class*=\"_frame\"]:has(> [class*=\"_sidebarCol\"]) {\n  padding-top: calc(var(--dsh-windows-titlebar-height) + 8px) !important;\n}\n\n/* Floating glass panels: the aurora gutter comes from the frame's grid gap and\n   padding (above), so each column keeps its full track width. No overflow\n   clipping on the scrolling column — tint and radius alone carry the shape. */\n[class*=\"_sidebarCol\"],\n[class*=\"_centerCol\"],\n[class*=\"_rightbarCol\"],\n[class*=\"_rightCol\"] {\n  border-radius: calc(20px * var(--lg-tune-radius)) !important;\n  border: 1px solid rgba(255, 255, 255, calc(0.13 * var(--lg-tune-rim))) !important;\n  background-color: rgba(9, 12, 22, calc(0.90 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(155deg, rgba(255, 255, 255, calc(0.07 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.01 * var(--lg-tune-rim))) 46%, rgba(255, 255, 255, calc(0.035 * var(--lg-tune-rim))) 100%);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.22 * var(--lg-tune-rim))),\n    inset 1px 0 0 rgba(103, 232, 249, calc(0.06 * var(--lg-tune-rim))),\n    inset -1px 0 0 rgba(192, 132, 252, calc(0.08 * var(--lg-tune-rim))),\n    0 16px 40px -28px rgba(0, 0, 0, calc(0.85 * var(--lg-tune-shadow)));\n  position: relative;\n}\n\n[class*=\"_sidebarCol\"] {\n  margin: 0 !important;\n}\n\n[class*=\"_centerCol\"] {\n  margin: 0 !important;\n  background-color: rgba(8, 11, 20, calc(0.92 * var(--lg-tune-glass))) !important;\n  border-color: rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim))) !important;\n}\n\n/* inner surfaces stay transparent so the column tint is the only fill */\n[class*=\"_sidebarCol\"] [class*=\"_root\"],\n[class*=\"_centerCol\"] [class*=\"_root\"] {\n  background: transparent !important;\n}\n\n/* header strip */\n[class*=\"_header\"]:not([class*=\"_sectionHeader\"]) {\n  background: transparent !important;\n  border-bottom: 1px solid var(--lg-hairline) !important;\n}\n\n/* ----------------------------- sidebar -------------------------------- */\n[class*=\"_logoRow\"] {\n  border-bottom: 1px solid var(--lg-hairline);\n}\n\n/* New-session button: exactly ONE glass surface. The theme stacks a mask and\n   content spans inside the button; flatten every descendant so the capsule\n   reads as a single pane. */\nbutton[class*=\"_newSession\"] {\n  margin-left: 12px;\n  margin-right: 12px;\n  background: rgba(255, 255, 255, calc(0.065 * var(--lg-tune-glass))) !important;\n  background-image: none !important;\n  border: 1px solid var(--lg-rim) !important;\n  border-radius: calc(14px * var(--lg-tune-radius)) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.16 * var(--lg-tune-rim))),\n    0 6px 14px -12px rgba(0, 0, 0, calc(0.6 * var(--lg-tune-shadow))) !important;\n}\n\nbutton[class*=\"_newSession\"]::before,\nbutton[class*=\"_newSession\"]::after {\n  display: none !important;\n}\n\nbutton[class*=\"_newSession\"] *,\nbutton[class*=\"_newSession\"] *::before,\nbutton[class*=\"_newSession\"] *::after {\n  background: transparent !important;\n  background-image: none !important;\n  border-color: transparent !important;\n  box-shadow: none !important;\n}\n\nbutton[class*=\"_newSession\"]:hover {\n  background: var(--lg-hover-strong) !important;\n}\n\n[class*=\"_panelRow\"] {\n  border-radius: calc(12px * var(--lg-tune-radius));\n}\n\n[class*=\"_panelRow\"]:hover {\n  background: var(--lg-hover) !important;\n}\n\n[class*=\"_iconButton\"] {\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\n[class*=\"_iconButton\"]:hover {\n  background: var(--lg-hover-strong) !important;\n}\n\n[class*=\"_sectionHeader\"] {\n  background: transparent !important;\n}\n\n[class*=\"_search\"] {\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\n[class*=\"_emptyState\"] {\n  opacity: 0.72;\n}\n\n[class*=\"_footArea\"] {\n  background: linear-gradient(0deg, var(--lg-foot-scrim) 0%, transparent 100%);\n  border-top: 1px solid var(--lg-hairline);\n}\n\n/* ----------------------------- composer ------------------------------- */\n[class*=\"_composerStack\"] [class*=\"_card\"],\n[class*=\"_composerSeat\"] [class*=\"_card\"] {\n  border-radius: calc(22px * var(--lg-tune-radius)) !important;\n  border: 1px solid rgba(255, 255, 255, calc(0.16 * var(--lg-tune-rim))) !important;\n  background-color: rgba(17, 21, 35, calc(0.86 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(150deg, rgba(255, 255, 255, calc(0.11 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.02 * var(--lg-tune-rim))) 46%, rgba(255, 255, 255, calc(0.05 * var(--lg-tune-rim))) 100%);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.28 * var(--lg-tune-rim))),\n    inset 0 -1px 0 rgba(255, 255, 255, calc(0.04 * var(--lg-tune-rim))),\n    0 14px 36px -28px rgba(0, 0, 0, calc(0.9 * var(--lg-tune-shadow)));\n}\n\n[class*=\"_composerStack\"] [class*=\"_card\"]:focus-within {\n  border-color: rgba(160, 190, 255, calc(0.32 * var(--lg-tune-rim))) !important;\n}\n\n[class*=\"_composerStack\"] [class*=\"_primary\"],\n[class*=\"_composerSeat\"] [class*=\"_primary\"] {\n  border: 1px solid rgba(255, 255, 255, calc(0.30 * var(--lg-tune-rim))) !important;\n  background: linear-gradient(140deg, #67e8f9 0%, #818cf8 48%, #c084fc 100%) !important;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.45 * var(--lg-tune-rim))) !important;\n  color: #08101f !important;\n}\n\n[class*=\"_composerStack\"] [class*=\"_primary\"] svg,\n[class*=\"_composerSeat\"] [class*=\"_primary\"] svg {\n  color: #07101f !important;\n  fill: currentColor;\n}\n\n[class*=\"_composerStack\"] [class*=\"_add\"],\n[class*=\"_composerSeat\"] [class*=\"_add\"] {\n  border-radius: 50%;\n  background: var(--lg-hover-strong) !important;\n  border: 1px solid var(--lg-rim);\n}\n\n[class*=\"_workspace\"],\n[class*=\"_seat\"] {\n  border-radius: calc(12px * var(--lg-tune-radius)) !important;\n}\n\n[class*=\"_workspace\"]:hover,\n[class*=\"_seat\"]:not([class*=\"_composerSeat\"]):hover {\n  background: var(--lg-hover) !important;\n}\n\n/* --------------------------- menus / dialogs --------------------------- */\n[data-menu-material],\n[role=\"menu\"],\n[role=\"dialog\"],\n[class*=\"_dialog\"],\n[class*=\"_menuSurface\"] {\n  border-radius: calc(16px * var(--lg-tune-radius));\n  border: 1px solid rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim))) !important;\n  background-color: rgba(15, 18, 30, calc(0.95 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(160deg, rgba(255, 255, 255, calc(0.07 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.01 * var(--lg-tune-rim))) 48%, rgba(255, 255, 255, calc(0.04 * var(--lg-tune-rim))) 100%) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.16 * var(--lg-tune-rim))),\n    0 20px 46px -26px rgba(0, 0, 0, calc(0.85 * var(--lg-tune-shadow))) !important;\n}\n\n[data-menu-material] [class*=\"_item\"],\n[role=\"menu\"] [role=\"menuitem\"],\n[class*=\"_menuItem\"] {\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\n[data-menu-material] [class*=\"_item\"]:hover,\n[role=\"menu\"] [role=\"menuitem\"]:hover,\n[class*=\"_menuItem\"]:hover {\n  background: var(--lg-hover) !important;\n}\n\n/* Generic cards only. The substring match is deliberately narrowed with a\n   complex :not(): composer cards carry their own radius / border treatment\n   (above) and must never pick up the generic one through the broad match. */\n[class*=\"_card\"]:not([class*=\"_composerStack\"] [class*=\"_card\"], [class*=\"_composerSeat\"] [class*=\"_card\"]) {\n  border-radius: calc(16px * var(--lg-tune-radius));\n}\n\n[class*=\"_card\"]:not([class*=\"_composerStack\"] [class*=\"_card\"], [class*=\"_composerSeat\"] [class*=\"_card\"]):hover {\n  border-color: var(--lg-rim) !important;\n}\n\n/* ------------------------ top toast / notice bar ----------------------- */\n/* One pane only: the shell toast is a single fixed element at the top of the\n   window. The fill comes from the toast token; this adds the glass sheen, rim\n   and depth. Children (icon / text / action) stay untouched. */\n[class*=\"_toast_\"] {\n  border-radius: calc(16px * var(--lg-tune-radius)) !important;\n  border: 1px solid rgba(255, 255, 255, calc(0.16 * var(--lg-tune-rim))) !important;\n  background-image: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, calc(0.12 * var(--lg-tune-rim))) 0%,\n    rgba(255, 255, 255, calc(0.03 * var(--lg-tune-rim))) 46%,\n    rgba(255, 255, 255, calc(0.07 * var(--lg-tune-rim))) 100%\n  ) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.24 * var(--lg-tune-rim))),\n    inset 0 -1px 0 rgba(0, 0, 0, calc(0.20 * var(--lg-tune-shadow))),\n    0 20px 46px -24px rgba(0, 0, 0, calc(0.88 * var(--lg-tune-shadow))) !important;\n}\n\n/* ---------------------------- scrollbars ------------------------------ */\n::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, calc(0.24 * var(--lg-tune-rim))) !important;\n  border-radius: 999px;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, calc(0.34 * var(--lg-tune-rim))) !important;\n}\n\n::selection {\n  background: rgba(129, 140, 248, 0.35);\n}\n\n/* --------------------------- transcript ------------------------------- */\n[class*=\"_bubble\"] {\n  background-color: rgba(32, 40, 70, calc(0.92 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(145deg, rgba(124, 150, 255, calc(0.22 * var(--lg-tune-glass))) 0%, rgba(90, 106, 218, calc(0.10 * var(--lg-tune-glass))) 46%, rgba(148, 118, 244, calc(0.16 * var(--lg-tune-glass))) 100%) !important;\n  border: 1px solid rgba(190, 205, 255, calc(0.22 * var(--lg-tune-rim))) !important;\n  border-radius: calc(20px * var(--lg-tune-radius)) calc(20px * var(--lg-tune-radius)) calc(6px * var(--lg-tune-radius)) calc(20px * var(--lg-tune-radius)) !important;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.20 * var(--lg-tune-rim)));\n  color: var(--dsw-alias-label-primary) !important;\n}\n\n[class*=\"_tabs\"] {\n  border-radius: calc(12px * var(--lg-tune-radius));\n}\n\n[class*=\"_tab\"]:not([class*=\"_tabs\"]) {\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\n[class*=\"_tab\"]:not([class*=\"_tabs\"]):hover {\n  background: var(--lg-hover) !important;\n}\n\n[class*=\"_tabActive\"] {\n  background: var(--lg-hover-strong) !important;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim)));\n}\n\n[class*=\"_sessionRow\"],\n[class*=\"_projectRow\"] {\n  border-radius: calc(11px * var(--lg-tune-radius));\n}\n\n[class*=\"_sessionRow\"]:hover,\n[class*=\"_projectRow\"]:hover {\n  background: var(--lg-hover) !important;\n}\n\n[class*=\"_sessionRow\"][class*=\"_selected\"] {\n  background: var(--lg-selected) !important;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim)));\n}\n\n[class*=\"_previewBadge\"] {\n  background: var(--lg-badge-bg) !important;\n  border: 1px solid var(--lg-rim);\n  border-radius: 999px !important;\n}\n\n[class*=\"_placeholder\"] {\n  color: var(--lg-placeholder) !important;\n}\n\n/* ------------------------- content surfaces ---------------------------- */\n/* Markdown / message content addressed through SEMANTIC tags only: pre, code,\n   blockquote, table, mark, kbd survive upstream class-hash churn, unlike\n   substring class matching. Every decoration is zero-layout — background\n   fills, border-colour swaps and inset box-shadow rings; no border width,\n   padding or margin is added, so text flow stays exactly as the host lays it\n   out. Fills come from the palette / theme tokens, so both schemes are\n   served by these single rules. */\npre {\n  background-color: var(--dsw-alias-markdown-code-block) !important;\n  border-radius: calc(12px * var(--lg-tune-radius));\n  box-shadow:\n    inset 0 0 0 1px var(--lg-rim),\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.10 * var(--lg-tune-rim))) !important;\n}\n\ncode {\n  background: var(--lg-badge-bg) !important;\n  border-radius: calc(6px * var(--lg-tune-radius));\n}\n\npre code {\n  background: transparent !important;\n  border-radius: 0 !important;\n}\n\nblockquote {\n  background: var(--lg-hover) !important;\n  box-shadow: inset 3px 0 0 var(--lg-quote-bar) !important;\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\ntable,\nth,\ntd {\n  border-color: var(--lg-hairline) !important;\n}\n\nth {\n  background: var(--lg-hover-strong) !important;\n}\n\nhr {\n  border-color: var(--lg-hairline) !important;\n}\n\nmark {\n  background: rgba(251, 191, 36, 0.35) !important;\n  color: inherit !important;\n  border-radius: 4px;\n}\n\nkbd {\n  background: var(--lg-badge-bg) !important;\n  box-shadow: inset 0 0 0 1px var(--lg-rim) !important;\n  border-radius: calc(6px * var(--lg-tune-radius));\n}\n\n/* --------------------------- focus visibility -------------------------- */\n/* Static outline only (no animation, no extra paint layers): keyboard users\n   get an obvious ring on every interactive surface in both schemes. */\nbutton:focus-visible,\n[role=\"button\"]:focus-visible,\n[role=\"menuitem\"]:focus-visible,\n[role=\"tab\"]:focus-visible,\n[role=\"treeitem\"]:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible {\n  outline: 2px solid var(--lg-focus-ring) !important;\n  outline-offset: 2px;\n}\n\n/* ------------------------------ light mode ---------------------------- */\nhtml:has(body:not([data-ds-dark-theme])) {\n  background-color: #eef2fb !important;\n  background-image:\n    radial-gradient(58vmax 58vmax at 12% 4%, rgba(56, 189, 248, calc(0.36 * var(--lg-tune-aurora))), transparent 70%),\n    radial-gradient(52vmax 52vmax at 84% 0%, rgba(129, 140, 248, calc(0.30 * var(--lg-tune-aurora))), transparent 70%),\n    radial-gradient(62vmax 62vmax at 90% 58%, rgba(167, 139, 250, calc(0.32 * var(--lg-tune-aurora))), transparent 72%),\n    radial-gradient(52vmax 52vmax at 6% 88%, rgba(251, 113, 133, calc(0.20 * var(--lg-tune-aurora))), transparent 72%),\n    radial-gradient(46vmax 46vmax at 68% 98%, rgba(251, 191, 36, calc(0.22 * var(--lg-tune-aurora))), transparent 74%),\n    radial-gradient(120% 100% at 50% 34%, rgba(255, 255, 255, 0) 46%, rgba(255, 255, 255, 0.42) 100%),\n    linear-gradient(160deg, #f4f7ff 0%, #e9eefb 60%, #e4e9f8 100%) !important;\n}\n\nbody:not([data-ds-dark-theme]) [class*=\"_sidebarCol\"],\nbody:not([data-ds-dark-theme]) [class*=\"_centerCol\"],\nbody:not([data-ds-dark-theme]) [class*=\"_rightbarCol\"],\nbody:not([data-ds-dark-theme]) [class*=\"_rightCol\"] {\n  border-color: rgba(255, 255, 255, calc(0.85 * var(--lg-tune-rim))) !important;\n  background-color: rgba(255, 255, 255, calc(0.88 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(155deg, rgba(255, 255, 255, calc(0.55 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.22 * var(--lg-tune-rim))) 46%, rgba(255, 255, 255, calc(0.40 * var(--lg-tune-rim))) 100%);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))),\n    0 16px 36px -30px rgba(30, 41, 89, calc(0.25 * var(--lg-tune-shadow)));\n}\n\nbody:not([data-ds-dark-theme]) [class*=\"_composerStack\"] [class*=\"_card\"],\nbody:not([data-ds-dark-theme]) [class*=\"_composerSeat\"] [class*=\"_card\"] {\n  background-color: rgba(255, 255, 255, calc(0.90 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(150deg, rgba(255, 255, 255, calc(0.65 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.28 * var(--lg-tune-rim))) 46%, rgba(255, 255, 255, calc(0.45 * var(--lg-tune-rim))) 100%) !important;\n  border-color: rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))) !important;\n}\n\nbody:not([data-ds-dark-theme]) [data-menu-material],\nbody:not([data-ds-dark-theme]) [role=\"menu\"],\nbody:not([data-ds-dark-theme]) [role=\"dialog\"],\nbody:not([data-ds-dark-theme]) [class*=\"_dialog\"],\nbody:not([data-ds-dark-theme]) [class*=\"_menuSurface\"] {\n  background-color: rgba(251, 252, 255, calc(0.96 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(160deg, rgba(255, 255, 255, calc(0.75 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.35 * var(--lg-tune-rim))) 48%, rgba(255, 255, 255, calc(0.60 * var(--lg-tune-rim))) 100%) !important;\n  border-color: rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, var(--lg-tune-rim)),\n    0 20px 46px -30px rgba(30, 41, 89, calc(0.28 * var(--lg-tune-shadow))) !important;\n}\n\nbody:not([data-ds-dark-theme]) [class*=\"_toast_\"] {\n  border-color: rgba(255, 255, 255, calc(0.92 * var(--lg-tune-rim))) !important;\n  background-image: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, calc(0.88 * var(--lg-tune-rim))) 0%,\n    rgba(255, 255, 255, calc(0.48 * var(--lg-tune-rim))) 46%,\n    rgba(255, 255, 255, calc(0.72 * var(--lg-tune-rim))) 100%\n  ) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, var(--lg-tune-rim)),\n    inset 0 -1px 0 rgba(20, 30, 60, calc(0.06 * var(--lg-tune-rim))),\n    0 20px 46px -26px rgba(30, 41, 89, calc(0.38 * var(--lg-tune-shadow))) !important;\n}\n\nbody:not([data-ds-dark-theme]) [class*=\"_bubble\"] {\n  background-color: rgba(226, 232, 255, calc(0.94 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(145deg, rgba(199, 210, 254, calc(0.85 * var(--lg-tune-glass))) 0%, rgba(224, 231, 255, calc(0.70 * var(--lg-tune-glass))) 46%, rgba(233, 213, 255, calc(0.78 * var(--lg-tune-glass))) 100%) !important;\n  border-color: rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))) !important;\n}\n\nbody:not([data-ds-dark-theme]) ::-webkit-scrollbar-thumb {\n  background: rgba(15, 30, 60, calc(0.20 * var(--lg-tune-rim))) !important;\n}\n\nbody:not([data-ds-dark-theme]) ::-webkit-scrollbar-thumb:hover {\n  background: rgba(15, 30, 60, calc(0.30 * var(--lg-tune-rim))) !important;\n}\n\n/* ------------------------ settings page (tuning) ------------------------ */\n/* The 魔理沙UI page inside the Settings panel (slot `settings.section`, its\n   own nav entry beside General / Models / Plugins). Scoped by\n   [data-lg-settings] so it can never style anything outside its own\n   registration. Colours come from host label tokens and the shared palette,\n   so both schemes stay coherent. */\n[data-lg-settings] {\n  display: grid;\n  gap: 12px;\n  padding: 4px 2px;\n}\n\n[data-lg-settings] .lg-tune-head {\n  display: grid;\n  gap: 4px;\n}\n\n[data-lg-settings] .lg-tune-title {\n  color: var(--dsw-alias-label-primary);\n  font-size: 15px;\n  font-weight: 600;\n}\n\n[data-lg-settings] .lg-tune-desc {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n[data-lg-settings] .lg-tune-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 8px 16px;\n}\n\n[data-lg-settings] .lg-tune-row {\n  display: grid;\n  grid-template-columns: 84px 1fr 44px;\n  align-items: center;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-tune-label {\n  color: var(--dsw-alias-label-primary-dimmed);\n  font-size: 12px;\n}\n\n[data-lg-settings] .lg-tune-value {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n\n[data-lg-settings] input[type=\"range\"] {\n  width: 100%;\n  accent-color: var(--dsw-alias-state-business-primary);\n}\n\n[data-lg-settings] .lg-tune-reset {\n  justify-self: start;\n  padding: 4px 12px;\n  border-radius: calc(8px * var(--lg-tune-radius));\n  border: 1px solid var(--lg-rim);\n  background: var(--lg-badge-bg);\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  cursor: pointer;\n}\n\n[data-lg-settings] .lg-tune-reset:hover {\n  background: var(--lg-hover-strong);\n}\n\n[data-lg-settings] .lg-tune-toggle {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-tune-toggle input[type=\"checkbox\"] {\n  justify-self: start;\n  accent-color: var(--dsw-alias-state-business-primary);\n}\n\n[data-lg-settings] .lg-tune-hint {\n  grid-column: 1 / -1;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 1.5;\n}\n\n/* -------------------- window-glass patch (host actions) ------------------ */\n[data-lg-settings] .lg-patch {\n  display: grid;\n  gap: 6px;\n  padding-top: 10px;\n  border-top: 1px solid var(--lg-hairline);\n}\n\n[data-lg-settings] .lg-patch-status {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 1.7;\n  font-variant-numeric: tabular-nums;\n}\n\n[data-lg-settings] .lg-patch-actions {\n  display: flex;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-patch-actions button:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n[data-lg-settings] .lg-patch-msg {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 1.5;\n}\n";
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

		return module.exports;
	}
});
