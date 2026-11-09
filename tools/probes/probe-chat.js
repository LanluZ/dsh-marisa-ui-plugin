(() => {
  const nodes = [];
  for (const el of document.querySelectorAll("body *")) {
    const tag = el.tagName.toLowerCase();
    if (["svg", "path", "symbol", "use", "script", "style", "link"].includes(tag)) continue;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < 1200) continue;
    if (r.y < 40) continue;
    const cls = typeof el.className === "string" ? el.className : "";
    if (!cls) continue;
    const cs = getComputedStyle(el);
    nodes.push({
      tag,
      cls: cls.slice(0, 170),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      bg: cs.backgroundColor,
      radius: cs.borderRadius,
      text: (el.innerText || "").trim().slice(0, 30) || undefined,
    });
  }
  return JSON.stringify(nodes.slice(0, 120), null, 1);
})()
