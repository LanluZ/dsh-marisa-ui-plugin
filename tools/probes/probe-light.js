(() => {
  const names = [
    "--dsw-alias-bg-base","--dsw-alias-bg-layer-1","--dsw-alias-bg-layer-2","--dsw-alias-bg-layer-3",
    "--dsw-alias-bg-overlay","--dsw-alias-bg-mask-1","--dsw-alias-bg-mask-2","--dsw-alias-bg-mask-3",
    "--dsw-alias-bg-mask-drop","--dsw-alias-bg-module-platform","--dsw-alias-bg-multi-select","--dsw-alias-bg-skeleton",
    "--dsw-menu-surface-fill","--dsw-specific-menu","--dsw-menu-backdrop-filter",
    "--dsw-alias-border-l1","--dsw-alias-border-l2","--dsw-alias-border-l3","--dsw-alias-border-l4",
    "--dsw-alias-label-primary","--dsw-alias-label-secondary","--dsw-alias-label-tertiary",
    "--dsw-alias-interactive-bg-hover","--dsw-alias-interactive-bg-active",
    "--dsw-alias-state-business-primary","--dsw-alias-state-business-tertiary",
    "--dsw-alias-markdown-code-block","--dsw-alias-toast-bg","--dsw-alias-scrollbar-bg-l1",
    "--dsw-alias-menu-group-header-fill","--dsw-alias-menu-icon","--dsw-alias-button-primary-fill"
  ];
  const read = () => {
    const s = getComputedStyle(document.body);
    const o = {};
    for (const n of names) o[n] = s.getPropertyValue(n).trim();
    return o;
  };
  const had = document.body.hasAttribute("data-ds-dark-theme");
  document.body.removeAttribute("data-ds-dark-theme");
  const light = read();
  if (had) document.body.setAttribute("data-ds-dark-theme", "");
  return JSON.stringify(light, null, 1);
})()
