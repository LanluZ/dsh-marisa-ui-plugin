(() => {
  const dark = document.body.hasAttribute("data-ds-dark-theme");
  const names = [
    "--dsw-alias-bg-base","--dsw-alias-bg-layer-1","--dsw-alias-bg-layer-2","--dsw-alias-bg-layer-3","--dsw-alias-bg-layer-4",
    "--dsw-alias-bg-l1","--dsw-alias-bg-overlay","--dsw-alias-bg-mask-1","--dsw-alias-bg-mask-2","--dsw-alias-bg-mask-3",
    "--dsw-alias-bg-mask-drop","--dsw-alias-bg-mask-photo","--dsw-alias-bg-module-platform","--dsw-alias-bg-multi-select",
    "--dsw-alias-bg-skeleton","--dsw-alias-bg-document-preview","--dsw-alias-bg-document-selection",
    "--dsw-menu-surface-fill","--dsw-specific-menu","--dsw-menu-backdrop-filter",
    "--dsw-alias-border-l1","--dsw-alias-border-l2","--dsw-alias-border-l3","--dsw-alias-border-l4",
    "--dsw-alias-label-primary","--dsw-alias-label-primary-dimmed","--dsw-alias-label-secondary","--dsw-alias-label-tertiary",
    "--dsw-alias-label-on-business","--dsw-alias-interactive-bg-hover","--dsw-alias-interactive-bg-active",
    "--dsw-alias-state-business-primary","--dsw-alias-state-business-tertiary",
    "--dsw-alias-markdown-code-block","--dsw-alias-toast-bg","--dsw-alias-toast-label","--dsw-alias-switch-thumb",
    "--dsw-alias-scrollbar-bg-l1","--dsw-alias-scrollbar-hover-l1","--dsw-alias-tooltip-bg","--dsw-alias-tooltip-label",
    "--dsw-alias-menu-group-header-fill","--dsw-alias-menu-icon","--dsw-alias-input-bg","--dsw-alias-button-primary-fill",
    "--dsw-alias-state-error-primary","--dsw-alias-state-success-primary","--dsw-alias-state-warning-primary"
  ];
  const bodyStyle = getComputedStyle(document.body);
  const out = {};
  for (const n of names) out[n] = bodyStyle.getPropertyValue(n).trim();
  return JSON.stringify({ dark, out }, null, 1);
})()
