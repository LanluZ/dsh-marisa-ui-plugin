(() => {
  const rows = [];
  for (const el of document.querySelectorAll('[role="treeitem"], [class*="_session"], [class*="_treeRow"], [class*="_row"]')) {
    const r = el.getBoundingClientRect();
    if (r.width < 120 || r.height < 18) continue;
    rows.push({
      tag: el.tagName.toLowerCase(),
      cls: (typeof el.className === "string" ? el.className : "").slice(0, 120),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      text: (el.innerText || "").trim().slice(0, 40),
    });
  }
  return JSON.stringify(rows.slice(0, 40), null, 1);
})()
