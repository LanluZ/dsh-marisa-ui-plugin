(async () => {
  const settingsArea = document.querySelector('[class*="_settingsArea"]');
  const trigger = settingsArea ? settingsArea.querySelector("button") : null;
  if (trigger) trigger.click();
  await new Promise((r) => setTimeout(r, 700));

  const labels = [...document.querySelectorAll("*")].filter(
    (el) => el.childElementCount === 0 && (el.textContent || "").trim() === "设置"
  );
  let clickedClass = null;
  for (const label of labels) {
    let row = label;
    for (let i = 0; i < 6 && row.parentElement; i++) {
      const cls = typeof row.className === "string" ? row.className : "";
      if (row.getAttribute("role") === "menuitem" || cls.includes("_item") || row.tagName === "BUTTON") break;
      row = row.parentElement;
    }
    row.click();
    clickedClass = (typeof row.className === "string" ? row.className : row.tagName).slice(0, 160);
    break;
  }
  await new Promise((r) => setTimeout(r, 1800));

  const dialogs = [...document.querySelectorAll('[role="dialog"], [class*="_dialog"], [class*="_modal"]')]
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 170),
        rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
        bg: getComputedStyle(el).backgroundColor,
        bf: getComputedStyle(el).backdropFilter,
        overflow: getComputedStyle(el).overflow,
        text: (el.innerText || "").trim().slice(0, 60),
      };
    })
    .filter((d) => d.rect[2] > 300);
  return JSON.stringify({ triggered: Boolean(trigger), labelsFound: labels.length, clickedClass, dialogs }, null, 1);
})()
