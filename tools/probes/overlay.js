(async () => {
  const overlay = document.querySelector('[class*="_overlayLayer"]');
  const items = [];
  if (overlay) {
    for (const el of overlay.querySelectorAll("*")) {
      const t = (el.textContent || "").trim();
      if (!t) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 20) continue;
      items.push({
        tag: el.tagName.toLowerCase(),
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 160),
        rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
        text: t.slice(0, 30),
        childCount: el.childElementCount,
      });
    }
  }
  return JSON.stringify(items.slice(0, 80), null, 1);
})()
