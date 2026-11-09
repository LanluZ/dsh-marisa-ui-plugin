(() => {
  // close dialogs
  for (const b of [...document.querySelectorAll("button")]) {
    const al = (b.getAttribute("aria-label") || "").toLowerCase();
    if (al.includes("关闭") || al.includes("close")) b.click();
  }
  document.body.setAttribute("data-ds-dark-theme", "");
  document.documentElement.style.colorScheme = "dark";
  const bs = getComputedStyle(document.body);
  const names = [
    "--dsw-alias-bg-layer-1","--dsw-alias-bg-layer-2","--dsw-alias-bg-layer-3","--dsw-alias-bg-layer-4",
    "--dsw-alias-bg-base","--dsw-alias-label-primary","--dsw-alias-label-secondary","--dsw-alias-label-tertiary",
    "--dsw-alias-border-l1","--dsw-alias-border-l2","--dsw-alias-border-l3","--dsw-alias-border-l4",
    "--dsw-alias-markdown-code-block","--dsw-alias-interactive-bg-hover","--dsw-specific-menu","--dsw-menu-surface-fill",
    "--dsw-alias-bg-document-selection","--dsw-alias-scrollbar-bg-l1"
  ];
  const tokens = {};
  for (const n of names) tokens[n] = bs.getPropertyValue(n).trim();
  return JSON.stringify({ tokens, bodyBg: bs.backgroundColor, frameBg: getComputedStyle(document.querySelector('[class*="_frame"]')).backgroundColor }, null, 1);
})()
