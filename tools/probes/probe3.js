(() => {
  const frame = document.querySelector('[class*="_frame"]');
  if (!frame) return "no frame";
  const out = [];
  const maxDepth = 6;
  function walk(el, depth) {
    if (depth > maxDepth) return;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < 1200) return;
    const cs = getComputedStyle(el);
    const cls = typeof el.className === "string" ? el.className : "";
    const attrs = {};
    for (const a of el.attributes) {
      if (a.name.startsWith("data-") || a.name === "role" || a.name === "aria-label") {
        attrs[a.name] = a.value.slice(0, 80);
      }
    }
    out.push({
      d: depth,
      tag: el.tagName.toLowerCase(),
      cls: cls.slice(0, 140),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      bg: cs.backgroundColor,
      bf: cs.backdropFilter !== "none" ? cs.backdropFilter : "",
      radius: cs.borderRadius,
      pos: cs.position,
      attrs: Object.keys(attrs).length ? attrs : undefined,
    });
    for (const c of el.children) {
      if (["svg", "script", "style"].includes(c.tagName.toLowerCase())) continue;
      walk(c, depth + 1);
    }
  }
  walk(frame, 0);

  const uniq = [];
  const seen = new Set();
  for (const o of out) {
    const key = o.cls + "|" + o.d;
    if (seen.has(key)) continue;
    seen.add(key);
    uniq.push(o);
  }
  return JSON.stringify({ frameCls: frame.className, nodes: uniq }, null, 1);
})()
