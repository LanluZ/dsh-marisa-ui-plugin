(() => {
  // dismiss any open dialog
  const close = [...document.querySelectorAll("button")].find(
    (b) => (b.getAttribute("aria-label") || "").includes("关闭") || (b.getAttribute("aria-label") || "").toLowerCase().includes("close")
  );
  if (close) close.click();

  const ls = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    ls[k] = (localStorage.getItem(k) || "").slice(0, 300);
  }

  const rootVars = getComputedStyle(document.documentElement);
  const tokenNames = [
    "--dsw-alias-bg-layer-1","--dsw-alias-bg-layer-2","--dsw-alias-bg-layer-3","--dsw-alias-bg-base",
    "--dsw-alias-bg-body","--dsw-alias-bg-primary","--dsw-alias-label-primary","--dsw-alias-label-secondary",
    "--dsw-alias-border-l1","--dsw-alias-border-l2","--dsw-alias-markdown-code-block","--dsw-alias-interactive-bg-hover"
  ];
  const tokens = {};
  for (const n of tokenNames) tokens[n] = rootVars.getPropertyValue(n).trim();

  const bodyStyle = getComputedStyle(document.body);
  const htmlStyle = getComputedStyle(document.documentElement);

  function outline(el, depth, maxDepth) {
    if (!el || depth > maxDepth) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const o = {
      tag: el.tagName.toLowerCase(),
      cls: (el.className && typeof el.className === "string" ? el.className : "").slice(0, 120),
      id: el.id || undefined,
      role: el.getAttribute("role") || undefined,
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      bg: cs.backgroundColor,
      bf: cs.backdropFilter !== "none" ? cs.backdropFilter : undefined,
      radius: cs.borderRadius,
      children: [],
    };
    if (depth < maxDepth) {
      for (const c of el.children) {
        if (c.tagName === "SCRIPT" || c.tagName === "STYLE" || c.tagName === "LINK") continue;
        const co = outline(c, depth + 1, maxDepth);
        if (co) o.children.push(co);
      }
    }
    return o;
  }

  return JSON.stringify(
    {
      ls,
      html: { bg: htmlStyle.backgroundColor, colorScheme: htmlStyle.colorScheme, cls: document.documentElement.className },
      body: { bg: bodyStyle.backgroundColor, cls: document.body.className },
      tokens,
      outline: outline(document.body, 0, 5),
    },
    null,
    1
  );
})()
