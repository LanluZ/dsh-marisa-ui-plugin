(() => {
  const bodyStyle = getComputedStyle(document.body);
  const tokenNames = [
    "--dsw-alias-bg-layer-1","--dsw-alias-bg-layer-2","--dsw-alias-bg-layer-3","--dsw-alias-bg-base",
    "--dsw-alias-bg-body","--dsw-alias-bg-primary","--dsw-alias-bg-secondary","--dsw-alias-bg-tertiary",
    "--dsw-alias-label-primary","--dsw-alias-label-secondary","--dsw-alias-border-l1","--dsw-alias-border-l2",
    "--dsw-alias-markdown-code-block","--dsw-alias-interactive-bg-hover"
  ];
  const tokens = {};
  for (const n of tokenNames) tokens[n] = bodyStyle.getPropertyValue(n).trim();

  const shell = document.getElementById("root") || document.body;
  function walk(el, depth, out) {
    if (depth > 3) return;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < 500) return;
    const cs = getComputedStyle(el);
    out.push({
      d: depth,
      tag: el.tagName.toLowerCase(),
      cls: (typeof el.className === "string" ? el.className : "").slice(0, 150),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      bg: cs.backgroundColor,
      bf: cs.backdropFilter !== "none" ? cs.backdropFilter : "",
      radius: cs.borderRadius,
      overflow: cs.overflow,
    });
    for (const c of el.children) {
      if (["svg", "script", "style", "link", "symbol", "path"].includes(c.tagName.toLowerCase())) continue;
      walk(c, depth + 1, out);
    }
  }
  const out = [];
  walk(document.getElementById("root") || document.body, 0, out);

  const big = [];
  for (const el of document.querySelectorAll("body *")) {
    if (["svg","path","symbol","use","script","style","link"].includes(el.tagName.toLowerCase())) continue;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < 20000) continue;
    const cs = getComputedStyle(el);
    if (cs.backgroundColor === "rgba(0, 0, 0, 0)" && cs.backdropFilter === "none") continue;
    const cls = typeof el.className === "string" ? el.className : "";
    big.push({
      tag: el.tagName.toLowerCase(),
      cls: cls.slice(0, 200),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      bg: cs.backgroundColor,
      bf: cs.backdropFilter,
      radius: cs.borderRadius,
      z: cs.zIndex,
    });
  }

  return JSON.stringify({ tokens, bodyCls: document.body.className, rootCls: shell.className, shellTree: out, big }, null, 1);
})()
