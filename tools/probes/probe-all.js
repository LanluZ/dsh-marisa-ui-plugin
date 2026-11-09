(() => {
  const nodes = [];
  for (const el of document.querySelectorAll("body *")) {
    const tag = el.tagName.toLowerCase();
    if (["svg", "path", "symbol", "use", "script", "style", "link", "meta"].includes(tag)) continue;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < 500) continue;
    const cls = typeof el.className === "string" ? el.className : "";
    if (!cls && !el.getAttribute("data-menu-material") && !el.getAttribute("role")) continue;
    const cs = getComputedStyle(el);
    nodes.push({
      tag,
      cls: cls.slice(0, 180),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      bg: cs.backgroundColor,
      bf: cs.backdropFilter !== "none" ? cs.backdropFilter : "",
      radius: cs.borderRadius,
      pos: cs.position,
      z: cs.zIndex,
      role: el.getAttribute("role") || undefined,
      menu: el.hasAttribute("data-menu-material") || undefined,
      text: (el.innerText || "").trim().slice(0, 40) || undefined,
    });
  }
  return JSON.stringify(nodes, null, 1);
})()
