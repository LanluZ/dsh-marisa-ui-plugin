(async () => {
  const triggers = [...document.querySelectorAll("button")].filter((b) => {
    const r = b.getBoundingClientRect();
    return (typeof b.className === "string" && b.className.includes("_trigger")) || (b.textContent || "").trim() === "更多";
  });
  const bottom = triggers.filter((b) => b.getBoundingClientRect().y > 800).pop();
  if (bottom) bottom.click();
  await new Promise((r) => setTimeout(r, 600));

  const all = [...document.querySelectorAll("*")];
  const labels = all.filter((el) => el.childElementCount === 0 && (el.textContent || "").trim() === "设置");
  let clickedClass = null;
  for (const label of labels) {
    let row = label;
    for (let i = 0; i < 5 && row.parentElement; i++) {
      const cls = typeof row.className === "string" ? row.className : "";
      if (cls.includes("_item") || cls.includes("menu") || row.getAttribute("role") === "menuitem" || row.tagName === "BUTTON") break;
      row = row.parentElement;
    }
    if (row) {
      row.click();
      clickedClass = (typeof row.className === "string" ? row.className : row.tagName).slice(0, 140);
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 1600));

  const dialogs = [...document.querySelectorAll('[role="dialog"], [class*="_dialog"], [class*="_modal"]')]
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 160),
        rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
        bg: getComputedStyle(el).backgroundColor,
        bf: getComputedStyle(el).backdropFilter,
        text: (el.innerText || "").trim().slice(0, 50),
      };
    })
    .filter((d) => d.rect[2] > 200);
  return JSON.stringify({ labelsFound: labels.length, clickedClass, dialogs }, null, 1);
})()
