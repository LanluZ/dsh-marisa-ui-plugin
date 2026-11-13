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
		const VERSION = "1.12.2";
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
		const CSS = "/* =========================================================================\n   DSH Marisa UI — theme layer (performance edition)\n   -------------------------------------------------------------------------\n   Runtime budget rules:\n     · no backdrop-filter / filter / mix-blend-mode anywhere;\n     · no CSS animations, no pointer-driven JS, no extra DOM layers;\n     · the aurora is one static paint on the document canvas (html), so it is\n       cached by the compositor and never repainted by scrolling or streaming;\n     · glass is expressed with layered gradients, rim light and a tinted fill,\n       not real-time blur. Large scrolling surfaces carry no clip layer.\n   Tunable layer: every decorative alpha / radius below is multiplied by one\n   of the `--lg-tune-*` gains (default 1 = the design baseline). The Settings\n   page writes those gains on <html>; because they are plain custom properties\n   the whole UI re-composites without any repaint scripting.\n   ========================================================================= */\n\n/* ------------------------------ backdrop ------------------------------- */\n/* Whole-window glass master (--lg-tune-total, \"应用级毛玻璃注入后的透明度\"):\n   TEXT AND ICONS ARE NEVER DIMMED. The knob is folded into the glass / window\n   / rim / shadow GAIN WRITES at applyTuning time (client-body.js), so every\n   decorative glass layer — component fills, big-panel fills, sheen, rims,\n   shadows — fades / solidifies as ONE slab while the words stay crisp. The\n   backdrop (aurora canvas), radius and focus ring are not glass and stay on\n   their own axes; --lg-placeholder divides the fold back out (it is text). */\nhtml {\n  /* Canvas decoration layers (aurora + vignette) live in one custom property\n     so the custom window-background layer can drop the opaque base without\n     repeating the list. */\n  --lg-canvas-layers:\n    radial-gradient(58vmax 58vmax at 12% 4%, rgba(34, 211, 238, calc(0.32 * var(--lg-tune-aurora))), transparent 70%),\n    radial-gradient(52vmax 52vmax at 84% 0%, rgba(59, 130, 246, calc(0.28 * var(--lg-tune-aurora))), transparent 70%),\n    radial-gradient(62vmax 62vmax at 90% 58%, rgba(139, 92, 246, calc(0.32 * var(--lg-tune-aurora))), transparent 72%),\n    radial-gradient(52vmax 52vmax at 6% 88%, rgba(236, 72, 153, calc(0.20 * var(--lg-tune-aurora))), transparent 72%),\n    radial-gradient(46vmax 46vmax at 68% 98%, rgba(251, 191, 36, calc(0.16 * var(--lg-tune-aurora))), transparent 74%),\n    radial-gradient(120% 100% at 50% 34%, rgba(2, 3, 8, 0) 40%, rgba(2, 3, 8, 0.55) 100%);\n  background-color: #05060e !important;\n  background-image: var(--lg-canvas-layers), linear-gradient(160deg, #080a14 0%, #04050c 58%, #030409 100%);\n  background-repeat: no-repeat;\n}\n\n/* Window background layer (\"叠背景\", the post-injection window opacity):\n   ONE semi-transparent solid colour painted at the WINDOW SHELL level — the\n   same shell the draggable Windows titlebar rides, whose strip the acrylic\n   injection already made transparent. The layer therefore covers the WHOLE\n   injected window (titlebar band included) as ONE background, stacked over\n   the aurora canvas and under the glass panels + content. Its RGB and A are\n   self-input as RGBA in Settings and written inline as `--lg-bg-*` (A IS the\n   window opacity). Surface fills keep their designed colours and alphas —\n   the layer never leaks into the UI — and decorations (sheen / rims /\n   shadows / hover) and text stay on their own axes. Shell level also means\n   the layer survives \"透出桌面壁纸\": reveal mode turns the html canvas\n   transparent, but the shell layer keeps tinting the window over the acrylic\n   desktop. */\n/* Scope = the window SHELL frame only. The host ships a dozen `_frame` classes\n   and every component frame (chat flow `V4vHZW_frame`, turn rail, sidebar\n   browser / doc preview, attachment, question cards …) is nested INSIDE the\n   shell, so `:not([class*=\"_frame\"] [class*=\"_frame\"])` — \"the outermost\n   frame\" — keeps the tint on the shell while staying immune to hash renames.\n   Without the guard the substring selector also painted the window tint into\n   the chat flow frame, whose box is content-height and full-bleed inside the\n   conversation: a dark (light mode: white) slab behind the whole transcript. */\nhtml[data-lg-bg=\"custom\"] [class*=\"_frame\"]:not([class*=\"_frame\"] [class*=\"_frame\"]) {\n  background: rgb(var(--lg-bg-r) var(--lg-bg-g) var(--lg-bg-b) / var(--lg-bg-a)) !important;\n}\n\nbody {\n  background: transparent !important;\n}\n\n/* Wallpaper-glass reveal mode (experimental): the Settings page writes\n   `data-lg-reveal=\"on\"` on <html> and the document canvas turns transparent,\n   so a host window that itself supports transparency or a system backdrop\n   (mica / acrylic) shows the desktop behind the glass panels. Without host\n   window support the window simply shows its flat window colour — see\n   docs/API.md §1.5. Panels keep their tuned fills; dial 玻璃不透明度 down to\n   let more of the desktop through. */\nhtml[data-lg-reveal=\"on\"],\nhtml[data-lg-reveal=\"on\"]:has(body:not([data-ds-dark-theme])) {\n  background: transparent !important;\n  /* The caption-button probe (windowsAppearance IPC) measures this token and\n     feeds setTitleBarOverlay — report transparent so the native button strip\n     rides the acrylic backdrop instead of painting an opaque block. */\n  --dsw-specific-sidebar-fill: #00000000;\n}\n\n/* ------------------------- interaction palette -------------------------\n   One light/dark pair per interaction colour, declared once on <html> and\n   consumed by every hover / border / placeholder rule below. The previous\n   revision hardcoded white overlays in the base (dark) rules, so the light\n   theme silently lost most hover and border feedback; centralising the\n   palette here makes that class of drift impossible. Every alpha rides a\n   `--lg-tune-*` gain so the Settings row scales whole layers at once. */\nhtml {\n  /* Tunable gains (written by the Settings row; 1 = design default). */\n  --lg-tune-aurora: 1;\n  --lg-tune-glass: 1;\n  /* Window-level fill gain, orthogonal to --lg-tune-glass: glass tunes the\n     component surfaces (composer / menus / bubbles / toast), window tunes only\n     the big window columns' glass fill — so \"everything too transparent\" is\n     fixed on one axis without touching component glass. */\n  --lg-tune-window: 1;\n  /* Whole-window glass master (\"应用级毛玻璃透明度\"): folded into the glass /\n     window / rim / shadow gain WRITES at applyTuning time (client-body.js) —\n     every glass layer fades as one slab. Text and icons never dim: placeholder\n     text divides the fold back out below; label colours come from host tokens\n     and carry no gain. radius / focus stay untouched — geometry and keyboard\n     visibility are not transparency. */\n  --lg-tune-total: 1;\n  --lg-tune-rim: 1;\n  --lg-tune-radius: 1;\n  --lg-tune-shadow: 1;\n  --lg-tune-focus: 1;\n\n  /* Window background layer (\"叠背景\"): the Settings page writes the user RGBA\n     inline (see the html[data-lg-bg] rule above). The layer itself paints on\n     the window shell (the frame the titlebar rides) — one background for the\n     whole injected window. These are theme-baseline fallbacks only; surfaces\n     and decorations keep their own colours and axes. */\n  --lg-bg-r: 5;\n  --lg-bg-g: 6;\n  --lg-bg-b: 14;\n  --lg-bg-a: 1;\n\n  --lg-hover: rgba(255, 255, 255, calc(0.06 * var(--lg-tune-glass)));\n  --lg-hover-strong: rgba(255, 255, 255, calc(0.09 * var(--lg-tune-glass)));\n  --lg-rim: rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim)));\n  --lg-hairline: rgba(255, 255, 255, calc(0.055 * var(--lg-tune-rim)));\n  --lg-selected: rgba(124, 158, 255, calc(0.16 * var(--lg-tune-glass)));\n  --lg-badge-bg: rgba(255, 255, 255, calc(0.09 * var(--lg-tune-glass)));\n  /* Placeholder is TEXT: divide the total fold back out so hint text never\n     dims with the glass master (only its own glass axis applies). */\n  --lg-placeholder: rgba(222, 230, 248, calc(0.55 * var(--lg-tune-glass) / var(--lg-tune-total)));\n  --lg-foot-scrim: rgb(8 10 18 / calc(0.22 * var(--lg-tune-glass)));\n  --lg-focus-ring: rgba(103, 232, 249, calc(0.55 * var(--lg-tune-focus)));\n  --lg-quote-bar: rgba(129, 140, 248, calc(0.60 * var(--lg-tune-focus)));\n  /* Hairline rim around the whole window: the glass slab needs its edge\n     defined, especially in wallpaper-reveal mode. */\n  --lg-window-rim: rgba(255, 255, 255, calc(0.10 * var(--lg-tune-rim)));\n  /* RGB triple behind the titlebar fade; the opaque end samples the exact\n     caption-button colour via `--dsw-specific-sidebar-fill`. */\n  --lg-titlebar-rgb: 17 24 39;\n}\n\nhtml:has(body:not([data-ds-dark-theme])) {\n  --lg-hover: rgba(13, 28, 60, calc(0.07 * var(--lg-tune-glass)));\n  --lg-hover-strong: rgba(13, 28, 60, calc(0.10 * var(--lg-tune-glass)));\n  --lg-rim: rgba(30, 41, 89, calc(0.16 * var(--lg-tune-rim)));\n  --lg-hairline: rgba(30, 41, 89, calc(0.10 * var(--lg-tune-rim)));\n  --lg-selected: rgba(59, 111, 224, calc(0.14 * var(--lg-tune-glass)));\n  --lg-badge-bg: rgba(30, 41, 89, calc(0.08 * var(--lg-tune-glass)));\n  --lg-placeholder: rgba(52, 64, 88, calc(0.60 * var(--lg-tune-glass) / var(--lg-tune-total)));\n  --lg-foot-scrim: rgb(30 41 89 / calc(0.08 * var(--lg-tune-glass)));\n  --lg-focus-ring: rgba(59, 111, 224, calc(0.55 * var(--lg-tune-focus)));\n  --lg-quote-bar: rgba(59, 111, 224, calc(0.55 * var(--lg-tune-focus)));\n  --lg-window-rim: rgba(30, 41, 89, calc(0.12 * var(--lg-tune-rim)));\n  --lg-titlebar-rgb: 238 242 251;\n  --lg-bg-r: 238;\n  --lg-bg-g: 242;\n  --lg-bg-b: 251;\n  --lg-bg-a: 1;\n}\n\n/* ---------------------------- app shell ------------------------------- */\n[class*=\"_frame\"] {\n  background: transparent !important;\n  border: 0 !important;\n  /* one hairline specular ring around the whole window edge */\n  box-shadow: inset 0 0 0 1px var(--lg-window-rim) !important;\n}\n\n/* The rim is a WINDOW-edge treatment too: on nested component frames it drew a\n   faint rectangle outline (e.g. around the whole chat transcript once the\n   tint slab above is gone). Native shadows stay suppressed there exactly as\n   before — only the ring goes. */\n[class*=\"_frame\"] [class*=\"_frame\"] {\n  box-shadow: none !important;\n}\n\n/* Windows titlebar strip: aurora glass on the left, fading into the exact\n   colour the native caption buttons sample (`--dsw-specific-sidebar-fill`) on\n   the right, so minimise / maximise / close sit on a matching surface instead\n   of a grey block floating on glass. One rule serves both schemes: the fade\n   colour comes from the palette triple, the opaque end from the token. */\n[data-windows-titlebar] [class*=\"_frame\"]::before {\n  background:\n    linear-gradient(\n      90deg,\n      rgb(var(--lg-titlebar-rgb) / 0) 0%,\n      rgb(var(--lg-titlebar-rgb) / 0) calc(100% - 260px),\n      rgb(var(--lg-titlebar-rgb) / 0.55) calc(100% - 200px),\n      var(--dsw-specific-sidebar-fill) calc(100% - 150px),\n      var(--dsw-specific-sidebar-fill) 100%\n    ) !important;\n}\n\n/* Reveal mode: never paint the opaque caption-button block over a native\n   acrylic / mica backdrop (the welcome-window style overlay is fully\n   transparent there) — the strip keeps its readability band and ends in\n   transparency on both sides. */\nhtml[data-lg-reveal=\"on\"] [data-windows-titlebar] [class*=\"_frame\"]::before {\n  background:\n    linear-gradient(\n      90deg,\n      rgb(var(--lg-titlebar-rgb) / 0) 0%,\n      rgb(var(--lg-titlebar-rgb) / 0) calc(100% - 260px),\n      rgb(var(--lg-titlebar-rgb) / 0.55) calc(100% - 200px),\n      rgb(var(--lg-titlebar-rgb) / 0) calc(100% - 150px),\n      rgb(var(--lg-titlebar-rgb) / 0) 100%\n    ) !important;\n}\n\n/* Flush glass columns (1.9.2): every rounded panel must measure EXACTLY the\n   host's grid track, so the frame keeps its original box — the host frame has\n   no padding and no gap in the plain layout, and only\n   `padding-top: var(--dsh-windows-titlebar-height)` under a Windows titlebar.\n   Do NOT add frame padding / column-gap here: that is what previously made\n   each panel narrower than the original component (8px outer gutter + 8px per\n   inter-column seam). Columns still never carry their own margin/width inset —\n   the sidebar root's inline width equals its whole track and the column clips\n   overflow, so an inset on the column chops the right edge of the button area.\n   Grid stretch keeps `border: 1px` inside the track (border-box), so the rim\n   costs no width either. To bring the floating-aurora gutter back, re-add\n   `column-gap: 8px` plus 8px frame padding (left/right/bottom, and top as\n   `calc(var(--dsh-windows-titlebar-height) + 8px)`) on the frame. */\n\n/* Floating glass panels: flush with the host grid (no gutter), so each column\n   keeps its exact original track width. No overflow clipping on the scrolling\n   column — tint and radius alone carry the shape. */\n[class*=\"_sidebarCol\"],\n[class*=\"_centerCol\"],\n[class*=\"_rightbarCol\"],\n[class*=\"_rightCol\"] {\n  border-radius: calc(20px * var(--lg-tune-radius)) !important;\n  border: 1px solid rgba(255, 255, 255, calc(0.13 * var(--lg-tune-rim))) !important;\n  background-color: rgb(9 12 22 / calc(0.90 * var(--lg-tune-window))) !important;\n  background-image: linear-gradient(155deg, rgba(255, 255, 255, calc(0.07 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.01 * var(--lg-tune-rim))) 46%, rgba(255, 255, 255, calc(0.035 * var(--lg-tune-rim))) 100%);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.22 * var(--lg-tune-rim))),\n    inset 1px 0 0 rgba(103, 232, 249, calc(0.06 * var(--lg-tune-rim))),\n    inset -1px 0 0 rgba(192, 132, 252, calc(0.08 * var(--lg-tune-rim))),\n    0 16px 40px -28px rgba(0, 0, 0, calc(0.85 * var(--lg-tune-shadow)));\n  position: relative;\n}\n\n[class*=\"_sidebarCol\"] {\n  margin: 0 !important;\n  /* The left column carries NO outer drop shadow (1.9.3): it is flush with the\n     window's left / bottom edges, so the only place the shadow could show is\n     leaking around the rounded corners — the dark smudge at the window's\n     bottom-left corner. Keep just the inset rim / dispersion layers. */\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.22 * var(--lg-tune-rim))),\n    inset 1px 0 0 rgba(103, 232, 249, calc(0.06 * var(--lg-tune-rim))),\n    inset -1px 0 0 rgba(192, 132, 252, calc(0.08 * var(--lg-tune-rim))) !important;\n}\n\n[class*=\"_centerCol\"] {\n  margin: 0 !important;\n  background-color: rgb(8 11 20 / calc(0.92 * var(--lg-tune-window))) !important;\n  border-color: rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim))) !important;\n}\n\n/* inner surfaces stay transparent so the column tint is the only fill */\n[class*=\"_sidebarCol\"] [class*=\"_root\"],\n[class*=\"_centerCol\"] [class*=\"_root\"] {\n  background: transparent !important;\n}\n\n/* header strip. Code-block banner headers (`data-code-block-banner`) are part\n   of a code block and pick up NO theme styling — code blocks are excluded from\n   the theme entirely (1.10.2), and keeping their own fill is exactly what\n   makes the sticky code banner occlude the block scrolling beneath it. */\n[class*=\"_header\"]:not([class*=\"_sectionHeader\"], [data-code-block-banner]) {\n  background: transparent !important;\n  border-bottom: 1px solid var(--lg-hairline) !important;\n}\n\n/* ------------------- plugin-page sticky title bar (吸顶) ------------------ */\n/* The plugin page (插件页面) title bar is a morphing bar whose occluding\n   backdrop is a ::before filled with --dsw-alias-bg-base — a token this theme\n   flattens to transparent so the aurora shows through at rest. The host\n   toggles [data-scrolled] on the bar the moment it pins to the top (吸顶触发)\n   and drops it when the page scrolls back: cancel the transparency while\n   pinned so the content scrolling beneath is occluded, and once it unpins the\n   plain rule returns the transparent style (停止吸顶就返还样式).\n   1.10.3: the fill is translucent (半透明) and cross-fades in/out over 0.15s\n   via a background-color transition on the backdrop pseudo — one short\n   one-shot transition, no keyframes loop. */\n[class*=\"_pageBar\"]::before {\n  transition: background-color 0.15s ease-in-out;\n}\n\n[class*=\"_pageBar\"][data-scrolled]::before {\n  background: rgb(8 11 20 / 0.6) !important;\n}\n\nhtml:has(body:not([data-ds-dark-theme])) [class*=\"_pageBar\"][data-scrolled]::before {\n  background: rgb(255 255 255 / 0.7) !important;\n}\n\n/* ----------------------------- sidebar -------------------------------- */\n[class*=\"_logoRow\"] {\n  border-bottom: 1px solid var(--lg-hairline);\n}\n\n/* New-session button: exactly ONE glass surface. The theme stacks a mask and\n   content spans inside the button; flatten every descendant so the capsule\n   reads as a single pane. */\nbutton[class*=\"_newSession\"] {\n  margin-left: 12px;\n  margin-right: 12px;\n  background: rgb(255 255 255 / calc(0.065 * var(--lg-tune-glass))) !important;\n  background-image: none !important;\n  border: 1px solid var(--lg-rim) !important;\n  border-radius: calc(14px * var(--lg-tune-radius)) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.16 * var(--lg-tune-rim))),\n    0 6px 14px -12px rgba(0, 0, 0, calc(0.6 * var(--lg-tune-shadow))) !important;\n}\n\nbutton[class*=\"_newSession\"]::before,\nbutton[class*=\"_newSession\"]::after {\n  display: none !important;\n}\n\nbutton[class*=\"_newSession\"] *,\nbutton[class*=\"_newSession\"] *::before,\nbutton[class*=\"_newSession\"] *::after {\n  background: transparent !important;\n  background-image: none !important;\n  border-color: transparent !important;\n  box-shadow: none !important;\n}\n\nbutton[class*=\"_newSession\"]:hover {\n  background: var(--lg-hover-strong) !important;\n}\n\n[class*=\"_panelRow\"] {\n  border-radius: calc(12px * var(--lg-tune-radius));\n}\n\n[class*=\"_panelRow\"]:hover {\n  background: var(--lg-hover) !important;\n}\n\n[class*=\"_iconButton\"] {\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\n[class*=\"_iconButton\"]:hover {\n  background: var(--lg-hover-strong) !important;\n}\n\n[class*=\"_sectionHeader\"] {\n  background: transparent !important;\n}\n\n[class*=\"_search\"] {\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\n[class*=\"_emptyState\"] {\n  opacity: 0.72;\n}\n\n[class*=\"_footArea\"] {\n  background: linear-gradient(0deg, var(--lg-foot-scrim) 0%, transparent 100%);\n  border-top: 1px solid var(--lg-hairline);\n}\n\n/* Host session-tree bottom fade (workspace module `…_fade`, a 24px absolute\n   strip): it fades scrolled rows into `--dsw-specific-sidebar-fill`, which is\n   a SOLID panel colour in the host look. Our columns are translucent glass, so\n   the token-tinted gradient reads as a dark shadow band at the sidebar's\n   bottom-left corner (the strip ends in #111827 against the glass fill).\n   The strip only makes sense against an opaque fill — neutralise it.\n   `[class$=\"_fade\"]` matches the workspace fade exactly: the chat fades\n   (`…_fadeTop` / `…_fadeBottom`, mask-only) and `…_fading` / `…_faded` /\n   `…_fade-in` never end in `_fade` and stay untouched. */\n[class$=\"_fade\"] {\n  background: transparent !important;\n}\n\n/* ----------------------------- composer ------------------------------- */\n[class*=\"_composerStack\"] [class*=\"_card\"],\n[class*=\"_composerSeat\"] [class*=\"_card\"] {\n  border-radius: calc(22px * var(--lg-tune-radius)) !important;\n  border: 1px solid rgba(255, 255, 255, calc(0.16 * var(--lg-tune-rim))) !important;\n  background-color: rgb(17 21 35 / calc(0.86 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(150deg, rgba(255, 255, 255, calc(0.11 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.02 * var(--lg-tune-rim))) 46%, rgba(255, 255, 255, calc(0.05 * var(--lg-tune-rim))) 100%);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.28 * var(--lg-tune-rim))),\n    inset 0 -1px 0 rgba(255, 255, 255, calc(0.04 * var(--lg-tune-rim))),\n    0 14px 36px -28px rgba(0, 0, 0, calc(0.9 * var(--lg-tune-shadow)));\n}\n\n[class*=\"_composerStack\"] [class*=\"_card\"]:focus-within {\n  border-color: rgba(160, 190, 255, calc(0.32 * var(--lg-tune-rim))) !important;\n}\n\n[class*=\"_composerStack\"] [class*=\"_primary\"],\n[class*=\"_composerSeat\"] [class*=\"_primary\"] {\n  border: 1px solid rgba(255, 255, 255, calc(0.30 * var(--lg-tune-rim))) !important;\n  background: linear-gradient(140deg, #67e8f9 0%, #818cf8 48%, #c084fc 100%) !important;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.45 * var(--lg-tune-rim))) !important;\n  color: #08101f !important;\n}\n\n[class*=\"_composerStack\"] [class*=\"_primary\"] svg,\n[class*=\"_composerSeat\"] [class*=\"_primary\"] svg {\n  color: #07101f !important;\n  fill: currentColor;\n}\n\n[class*=\"_composerStack\"] [class*=\"_add\"],\n[class*=\"_composerSeat\"] [class*=\"_add\"] {\n  border-radius: 50%;\n  background: var(--lg-hover-strong) !important;\n  border: 1px solid var(--lg-rim);\n}\n\n[class*=\"_workspace\"],\n[class*=\"_seat\"] {\n  border-radius: calc(12px * var(--lg-tune-radius)) !important;\n}\n\n[class*=\"_workspace\"]:hover,\n[class*=\"_seat\"]:not([class*=\"_composerSeat\"]):hover {\n  background: var(--lg-hover) !important;\n}\n\n/* --------------------------- menus / dialogs --------------------------- */\n[data-menu-material],\n[role=\"menu\"],\n[role=\"dialog\"],\n[class*=\"_dialog\"],\n[class*=\"_menuSurface\"] {\n  border-radius: calc(16px * var(--lg-tune-radius));\n  border: 1px solid rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim))) !important;\n  background-color: rgb(15 18 30 / calc(0.95 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(160deg, rgba(255, 255, 255, calc(0.07 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.01 * var(--lg-tune-rim))) 48%, rgba(255, 255, 255, calc(0.04 * var(--lg-tune-rim))) 100%) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.16 * var(--lg-tune-rim))),\n    0 20px 46px -26px rgba(0, 0, 0, calc(0.85 * var(--lg-tune-shadow))) !important;\n}\n\n[data-menu-material] [class*=\"_item\"],\n[role=\"menu\"] [role=\"menuitem\"],\n[class*=\"_menuItem\"] {\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\n[data-menu-material] [class*=\"_item\"]:hover,\n[role=\"menu\"] [role=\"menuitem\"]:hover,\n[class*=\"_menuItem\"]:hover {\n  background: var(--lg-hover) !important;\n}\n\n/* Generic cards only. The substring match is deliberately narrowed with a\n   complex :not(): composer cards carry their own radius / border treatment\n   (above) and must never pick up the generic one through the broad match. */\n[class*=\"_card\"]:not([class*=\"_composerStack\"] [class*=\"_card\"], [class*=\"_composerSeat\"] [class*=\"_card\"]) {\n  border-radius: calc(16px * var(--lg-tune-radius));\n}\n\n[class*=\"_card\"]:not([class*=\"_composerStack\"] [class*=\"_card\"], [class*=\"_composerSeat\"] [class*=\"_card\"]):hover {\n  border-color: var(--lg-rim) !important;\n}\n\n/* ------------------------ top toast / notice bar ----------------------- */\n/* One pane only: the shell toast is a single fixed element at the top of the\n   window. The fill comes from the toast token; this adds the glass sheen, rim\n   and depth. Children (icon / text / action) stay untouched. */\n[class*=\"_toast_\"] {\n  border-radius: calc(16px * var(--lg-tune-radius)) !important;\n  border: 1px solid rgba(255, 255, 255, calc(0.16 * var(--lg-tune-rim))) !important;\n  background-image: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, calc(0.12 * var(--lg-tune-rim))) 0%,\n    rgba(255, 255, 255, calc(0.03 * var(--lg-tune-rim))) 46%,\n    rgba(255, 255, 255, calc(0.07 * var(--lg-tune-rim))) 100%\n  ) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.24 * var(--lg-tune-rim))),\n    inset 0 -1px 0 rgba(0, 0, 0, calc(0.20 * var(--lg-tune-shadow))),\n    0 20px 46px -24px rgba(0, 0, 0, calc(0.88 * var(--lg-tune-shadow))) !important;\n}\n\n/* ---------------------------- scrollbars ------------------------------ */\n::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, calc(0.24 * var(--lg-tune-rim))) !important;\n  border-radius: 999px;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, calc(0.34 * var(--lg-tune-rim))) !important;\n}\n\n::selection {\n  background: rgba(129, 140, 248, 0.35);\n}\n\n/* --------------------------- transcript ------------------------------- */\n[class*=\"_bubble\"] {\n  background-color: rgb(32 40 70 / calc(0.92 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(145deg, rgba(124, 150, 255, calc(0.22 * var(--lg-tune-glass))) 0%, rgba(90, 106, 218, calc(0.10 * var(--lg-tune-glass))) 46%, rgba(148, 118, 244, calc(0.16 * var(--lg-tune-glass))) 100%) !important;\n  border: 1px solid rgba(190, 205, 255, calc(0.22 * var(--lg-tune-rim))) !important;\n  border-radius: calc(20px * var(--lg-tune-radius)) calc(20px * var(--lg-tune-radius)) calc(6px * var(--lg-tune-radius)) calc(20px * var(--lg-tune-radius)) !important;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.20 * var(--lg-tune-rim)));\n  color: var(--dsw-alias-label-primary) !important;\n}\n\n[class*=\"_tabs\"] {\n  border-radius: calc(12px * var(--lg-tune-radius));\n}\n\n/* Tab CHIPS only (1.12.2). The old `[class*=\"_tab\"]` was a matching bug: it\n   hit every class merely STARTING with \"_tab\" — the whole dockkit container\n   hierarchy (`_tabHost_3oazc_164 _pane_3oazc_211` is one section element,\n   plus `_tabCell` / `_tabLayout` / `_tabStrip` / `_tabTitle` …) and even the\n   markdown table classes `_tableFill` / `_tableScroll` (\"_table\" starts with\n   \"_tab\"). Hovering anywhere over a pane painted a filled rounded slab —\n   a \"selected button\" look on a non-button surface — and every one of those\n   containers carried a rounded clip that repainted on each frame of a pane\n   resize drag. `[class*=\"_tab_\"]` matches only classes literally NAMED\n   `tab` (today: `_tab_3oazc_136`, `_tab_1lga9_1`, `_tab_1ocp1_37`). */\n[class*=\"_tab_\"] {\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\n/* Hover fill on the chips only. `_tabActive` keeps its own fill (hovering\n   the active tab no longer swaps its background), and quiet / floating-title\n   tabs stay fill-free exactly as the host defines them. */\n[class*=\"_tab_\"]:not([class*=\"_tabActive\"], [class*=\"_tabQuiet\"], [class*=\"_floatTitle\"]):hover {\n  background: var(--lg-hover) !important;\n}\n\n[class*=\"_tabActive\"] {\n  background: var(--lg-hover-strong) !important;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim)));\n}\n\n[class*=\"_sessionRow\"],\n[class*=\"_projectRow\"] {\n  border-radius: calc(11px * var(--lg-tune-radius));\n}\n\n[class*=\"_sessionRow\"]:hover,\n[class*=\"_projectRow\"]:hover {\n  background: var(--lg-hover) !important;\n}\n\n[class*=\"_sessionRow\"][class*=\"_selected\"] {\n  background: var(--lg-selected) !important;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.14 * var(--lg-tune-rim)));\n}\n\n[class*=\"_previewBadge\"] {\n  background: var(--lg-badge-bg) !important;\n  border: 1px solid var(--lg-rim);\n  border-radius: 999px !important;\n}\n\n[class*=\"_placeholder\"] {\n  color: var(--lg-placeholder) !important;\n}\n\n/* ------------------------- content surfaces ---------------------------- */\n/* Markdown / message content addressed through SEMANTIC tags only: blockquote,\n   table, mark, kbd survive upstream class-hash churn, unlike substring class\n   matching. Every decoration is zero-layout — background fills, border-colour\n   swaps and inset box-shadow rings; no border width, padding or margin is\n   added, so text flow stays exactly as the host lays it out. Fills come from\n   the palette / theme tokens, so both schemes are served by these single\n   rules. Code blocks (pre / code) are DELIBERATELY absent (1.10.2): the\n   theme does not style code blocks at all, so their banner / body keep the\n   host's own opaque fills and the sticky code banner occludes correctly. */\nblockquote {\n  background: var(--lg-hover) !important;\n  box-shadow: inset 3px 0 0 var(--lg-quote-bar) !important;\n  border-radius: calc(10px * var(--lg-tune-radius));\n}\n\ntable,\nth,\ntd {\n  border-color: var(--lg-hairline) !important;\n}\n\nth {\n  background: var(--lg-hover-strong) !important;\n}\n\nhr {\n  border-color: var(--lg-hairline) !important;\n}\n\nmark {\n  background: rgba(251, 191, 36, 0.35) !important;\n  color: inherit !important;\n  border-radius: 4px;\n}\n\nkbd {\n  background: var(--lg-badge-bg) !important;\n  box-shadow: inset 0 0 0 1px var(--lg-rim) !important;\n  border-radius: calc(6px * var(--lg-tune-radius));\n}\n\n/* ------------------------ shortcut hint groups -------------------------- */\n/* Buttons / menu items / tooltips render one key chord as ONE wrapper: the\n   host's Keys component (dsh-web-frontend module 38b9q, consumed by the menu\n   module 1p5el) emits <span class=\"_keys_… [_shortcutKeys_…]\"> holding one\n   <kbd> per key plus <kbd> \"+\" separators. The blanket kbd chip above must NOT\n   fire inside a chord — matching every <kbd> paints one rounded rectangle PER\n   STRING (\"Ctrl\" \"Alt\" \"G\" each in its own box). Matching-rule fix: the single\n   shared rounded rectangle is drawn on the chord wrapper (mirroring the host's\n   own \"_joined_\" look, with the chip padding it already uses) and the per-key\n   <kbd> children are stripped back to bare text. Substring class matching\n   survives upstream hash-suffix churn (38b9q / 1p5el). */\n[class*=\"_keys_\"],\n[class*=\"_shortcutKeys\"] {\n  background: var(--lg-badge-bg) !important;\n  box-shadow: inset 0 0 0 1px var(--lg-rim) !important;\n  border-radius: calc(6px * var(--lg-tune-radius)) !important;\n  padding-inline: 4px;\n}\n\n[class*=\"_keys_\"] kbd,\n[class*=\"_shortcutKeys\"] kbd {\n  background: transparent !important;\n  box-shadow: none !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  min-width: 0 !important;\n  padding: 0 !important;\n}\n\n/* --------------------------- focus visibility -------------------------- */\n/* Static outline only (no animation, no extra paint layers): keyboard users\n   get an obvious ring on every interactive surface in both schemes. */\nbutton:focus-visible,\n[role=\"button\"]:focus-visible,\n[role=\"menuitem\"]:focus-visible,\n[role=\"tab\"]:focus-visible,\n[role=\"treeitem\"]:focus-visible,\na:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible,\nselect:focus-visible {\n  outline: 2px solid var(--lg-focus-ring) !important;\n  outline-offset: 2px;\n}\n\n/* ------------------------------ light mode ---------------------------- */\nhtml:has(body:not([data-ds-dark-theme])) {\n  --lg-canvas-layers:\n    radial-gradient(58vmax 58vmax at 12% 4%, rgba(56, 189, 248, calc(0.36 * var(--lg-tune-aurora))), transparent 70%),\n    radial-gradient(52vmax 52vmax at 84% 0%, rgba(129, 140, 248, calc(0.30 * var(--lg-tune-aurora))), transparent 70%),\n    radial-gradient(62vmax 62vmax at 90% 58%, rgba(167, 139, 250, calc(0.32 * var(--lg-tune-aurora))), transparent 72%),\n    radial-gradient(52vmax 52vmax at 6% 88%, rgba(251, 113, 133, calc(0.20 * var(--lg-tune-aurora))), transparent 72%),\n    radial-gradient(46vmax 46vmax at 68% 98%, rgba(251, 191, 36, calc(0.22 * var(--lg-tune-aurora))), transparent 74%),\n    radial-gradient(120% 100% at 50% 34%, rgba(255, 255, 255, 0) 46%, rgba(255, 255, 255, 0.42) 100%);\n  background-color: #eef2fb !important;\n  background-image: var(--lg-canvas-layers), linear-gradient(160deg, #f4f7ff 0%, #e9eefb 60%, #e4e9f8 100%) !important;\n}\n\nbody:not([data-ds-dark-theme]) [class*=\"_sidebarCol\"],\nbody:not([data-ds-dark-theme]) [class*=\"_centerCol\"],\nbody:not([data-ds-dark-theme]) [class*=\"_rightbarCol\"],\nbody:not([data-ds-dark-theme]) [class*=\"_rightCol\"] {\n  border-color: rgba(255, 255, 255, calc(0.85 * var(--lg-tune-rim))) !important;\n  background-color: rgb(255 255 255 / calc(0.88 * var(--lg-tune-window))) !important;\n  background-image: linear-gradient(155deg, rgba(255, 255, 255, calc(0.55 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.22 * var(--lg-tune-rim))) 46%, rgba(255, 255, 255, calc(0.40 * var(--lg-tune-rim))) 100%);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))),\n    0 16px 36px -30px rgba(30, 41, 89, calc(0.25 * var(--lg-tune-shadow)));\n}\n\n/* Light branch of the left-column shadow fix (1.9.3): same as the dark one\n   above — the sidebar keeps only its inset highlight, so no drop shadow can\n   leak around the bottom-left rounded corner. */\nbody:not([data-ds-dark-theme]) [class*=\"_sidebarCol\"] {\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))) !important;\n}\n\n/* Left-sidebar frame switch (settings → 左侧栏玻璃面板): the host's own left\n   panel is a plain square area — no radius, no rim, no shadow, no fill of\n   its own — while its main panel is a rounded glass card, so the user picks.\n   OFF strips the LEFT column down to bare layout: square corners, no border,\n   no inset highlight / dispersion, no drop shadow, AND no fill layers\n   (background color + sheen gradient) so the window background — the aurora\n   canvas, or the desktop in reveal mode — shows straight through.\n   Center/right columns keep their full glass panel.\n   Must sit AFTER BOTH the dark group rule and the light-mode override above:\n   same (0,2,1) specificity + !important as the light rule, later wins. */\nhtml[data-lg-sidebar-frame=\"off\"] [class*=\"_sidebarCol\"] {\n  border-radius: 0 !important;\n  border: none !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: none !important;\n}\n\n/* The footer fade scrim exists to blend content into the glass fill — with\n   the fill gone it would be a stray dark band over the transparent column. */\nhtml[data-lg-sidebar-frame=\"off\"] [class*=\"_sidebarCol\"] [class*=\"_footArea\"] {\n  background: transparent !important;\n}\n\nbody:not([data-ds-dark-theme]) [class*=\"_composerStack\"] [class*=\"_card\"],\nbody:not([data-ds-dark-theme]) [class*=\"_composerSeat\"] [class*=\"_card\"] {\n  background-color: rgb(255 255 255 / calc(0.90 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(150deg, rgba(255, 255, 255, calc(0.65 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.28 * var(--lg-tune-rim))) 46%, rgba(255, 255, 255, calc(0.45 * var(--lg-tune-rim))) 100%) !important;\n  border-color: rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))) !important;\n}\n\nbody:not([data-ds-dark-theme]) [data-menu-material],\nbody:not([data-ds-dark-theme]) [role=\"menu\"],\nbody:not([data-ds-dark-theme]) [role=\"dialog\"],\nbody:not([data-ds-dark-theme]) [class*=\"_dialog\"],\nbody:not([data-ds-dark-theme]) [class*=\"_menuSurface\"] {\n  background-color: rgb(251 252 255 / calc(0.96 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(160deg, rgba(255, 255, 255, calc(0.75 * var(--lg-tune-rim))) 0%, rgba(255, 255, 255, calc(0.35 * var(--lg-tune-rim))) 48%, rgba(255, 255, 255, calc(0.60 * var(--lg-tune-rim))) 100%) !important;\n  border-color: rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, var(--lg-tune-rim)),\n    0 20px 46px -30px rgba(30, 41, 89, calc(0.28 * var(--lg-tune-shadow))) !important;\n}\n\nbody:not([data-ds-dark-theme]) [class*=\"_toast_\"] {\n  border-color: rgba(255, 255, 255, calc(0.92 * var(--lg-tune-rim))) !important;\n  background-image: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, calc(0.88 * var(--lg-tune-rim))) 0%,\n    rgba(255, 255, 255, calc(0.48 * var(--lg-tune-rim))) 46%,\n    rgba(255, 255, 255, calc(0.72 * var(--lg-tune-rim))) 100%\n  ) !important;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, var(--lg-tune-rim)),\n    inset 0 -1px 0 rgba(20, 30, 60, calc(0.06 * var(--lg-tune-rim))),\n    0 20px 46px -26px rgba(30, 41, 89, calc(0.38 * var(--lg-tune-shadow))) !important;\n}\n\nbody:not([data-ds-dark-theme]) [class*=\"_bubble\"] {\n  background-color: rgb(226 232 255 / calc(0.94 * var(--lg-tune-glass))) !important;\n  background-image: linear-gradient(145deg, rgba(199, 210, 254, calc(0.85 * var(--lg-tune-glass))) 0%, rgba(224, 231, 255, calc(0.70 * var(--lg-tune-glass))) 46%, rgba(233, 213, 255, calc(0.78 * var(--lg-tune-glass))) 100%) !important;\n  border-color: rgba(255, 255, 255, calc(0.95 * var(--lg-tune-rim))) !important;\n}\n\nbody:not([data-ds-dark-theme]) ::-webkit-scrollbar-thumb {\n  background: rgba(15, 30, 60, calc(0.20 * var(--lg-tune-rim))) !important;\n}\n\nbody:not([data-ds-dark-theme]) ::-webkit-scrollbar-thumb:hover {\n  background: rgba(15, 30, 60, calc(0.30 * var(--lg-tune-rim))) !important;\n}\n\n/* ------------------------ settings page (tuning) ------------------------ */\n/* The 魔理沙UI page inside the Settings panel (slot `settings.section`, its\n   own nav entry beside General / Models / Plugins). Scoped by\n   [data-lg-settings] so it can never style anything outside its own\n   registration. Colours come from host label tokens and the shared palette,\n   so both schemes stay coherent. */\n[data-lg-settings] {\n  display: grid;\n  gap: 12px;\n  padding: 4px 2px;\n}\n\n[data-lg-settings] .lg-tune-head {\n  display: grid;\n  gap: 4px;\n}\n\n[data-lg-settings] .lg-tune-title {\n  color: var(--dsw-alias-label-primary);\n  font-size: 15px;\n  font-weight: 600;\n}\n\n[data-lg-settings] .lg-tune-desc {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n[data-lg-settings] .lg-tune-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 8px 16px;\n}\n\n[data-lg-settings] .lg-tune-row {\n  display: grid;\n  grid-template-columns: 84px 1fr 44px;\n  align-items: center;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-tune-label {\n  color: var(--dsw-alias-label-primary-dimmed);\n  font-size: 12px;\n}\n\n[data-lg-settings] .lg-tune-value {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}\n\n[data-lg-settings] input[type=\"range\"] {\n  width: 100%;\n  accent-color: var(--dsw-alias-state-business-primary);\n}\n\n[data-lg-settings] .lg-tune-reset {\n  justify-self: start;\n  padding: 4px 12px;\n  border-radius: calc(8px * var(--lg-tune-radius));\n  border: 1px solid var(--lg-rim);\n  background: var(--lg-badge-bg);\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  cursor: pointer;\n}\n\n[data-lg-settings] .lg-tune-reset:hover {\n  background: var(--lg-hover-strong);\n}\n\n[data-lg-settings] .lg-tune-toggle {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-tune-toggle input[type=\"checkbox\"] {\n  justify-self: start;\n  accent-color: var(--dsw-alias-state-business-primary);\n}\n\n[data-lg-settings] .lg-tune-hint {\n  grid-column: 1 / -1;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 1.5;\n}\n\n/* ------------- style buttons (样式按钮) + collapsible detail cards -------- */\n/* Default view keeps only the 主题配色 style row visible; the 窗口透明度 and\n   背景叠层 cards collapse behind their 「详细设置」 buttons. */\n[data-lg-settings] .lg-style {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-style-chip {\n  padding: 4px 14px;\n  border-radius: calc(8px * var(--lg-tune-radius));\n  border: 1px solid var(--lg-rim);\n  background: var(--lg-badge-bg);\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  cursor: pointer;\n}\n\n[data-lg-settings] .lg-style-chip:hover:not(:disabled) {\n  background: var(--lg-hover-strong);\n}\n\n[data-lg-settings] .lg-style-chip[aria-pressed=\"true\"] {\n  border-color: var(--dsw-alias-state-business-primary);\n  background: var(--lg-selected);\n  color: var(--dsw-alias-label-primary);\n}\n\n[data-lg-settings] .lg-style-chip:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n[data-lg-settings] .lg-card {\n  display: grid;\n  gap: 8px;\n  padding-top: 10px;\n  border-top: 1px solid var(--lg-hairline);\n}\n\n[data-lg-settings] .lg-card-bar {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 10px;\n}\n\n[data-lg-settings] .lg-card-title {\n  color: var(--dsw-alias-label-primary);\n  font-size: 15px;\n  font-weight: 600;\n}\n\n[data-lg-settings] .lg-details-btn {\n  margin-left: auto;\n  padding: 4px 12px;\n  border-radius: calc(8px * var(--lg-tune-radius));\n  border: 1px solid var(--lg-rim);\n  background: var(--lg-badge-bg);\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  cursor: pointer;\n}\n\n[data-lg-settings] .lg-details-btn:hover {\n  background: var(--lg-hover-strong);\n}\n\n[data-lg-settings] .lg-card-body {\n  display: grid;\n  gap: 10px;\n}\n\n/* ------------------- window background layer (叠背景) ------------------- */\n[data-lg-settings] .lg-bg {\n  display: grid;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-bg-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-bg-row label {\n  color: var(--dsw-alias-label-primary-dimmed);\n  font-size: 12px;\n  font-variant-numeric: tabular-nums;\n}\n\n[data-lg-settings] .lg-bg-row input[type=\"number\"] {\n  width: 58px;\n  padding: 3px 6px;\n  border-radius: calc(8px * var(--lg-tune-radius));\n  border: 1px solid var(--lg-hairline);\n  background: var(--lg-badge-bg);\n  color: var(--dsw-alias-label-primary);\n  font-size: 12px;\n  font-variant-numeric: tabular-nums;\n}\n\n[data-lg-settings] .lg-bg-row input[type=\"range\"] {\n  flex: 1;\n  min-width: 140px;\n}\n\n/* -------------------- window-glass patch (host actions) ------------------ */\n[data-lg-settings] .lg-patch {\n  display: grid;\n  gap: 6px;\n  padding-top: 10px;\n  border-top: 1px solid var(--lg-hairline);\n}\n\n[data-lg-settings] .lg-patch-status {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 1.7;\n  font-variant-numeric: tabular-nums;\n}\n\n[data-lg-settings] .lg-patch-actions {\n  display: flex;\n  gap: 8px;\n}\n\n[data-lg-settings] .lg-patch-actions button:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n[data-lg-settings] .lg-patch-msg {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 1.5;\n}\n";
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

		return module.exports;
	}
});
