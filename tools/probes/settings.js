(async () => {
  const item = [...document.querySelectorAll("button,[role=menuitem],div,span")].find(
    (el) => (el.textContent || "").trim().startsWith("设置") && el.getBoundingClientRect().width > 80 && el.getBoundingClientRect().width < 260
  );
  if (item) item.click();
  await new Promise((r) => setTimeout(r, 900));
  const results = [];
  for (const el of document.querySelectorAll('[role="dialog"], [class*="_surface"], [class*="_modal"], [class*="_dialog"], [class*="_panel"], [data-menu-material]')) {
    const r = el.getBoundingClientRect();
    if (r.width < 200 || r.height < 200) continue;
    results.push({
      tag: el.tagName.toLowerCase(),
      cls: (typeof el.className === "string" ? el.className : "").slice(0, 180),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      bg: getComputedStyle(el).backgroundColor,
      bf: getComputedStyle(el).backdropFilter,
      radius: getComputedStyle(el).borderRadius,
      text: (el.innerText || "").trim().slice(0, 60),
    });
  }
  return JSON.stringify(results, null, 1);
})()
