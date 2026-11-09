(async () => {
  const trigger = [...document.querySelectorAll("button,[role=button]")].find(
    (b) => (b.textContent || "").trim() === "更多" && b.getBoundingClientRect().width > 150
  );
  if (trigger) trigger.click();
  await new Promise((r) => setTimeout(r, 500));
  const labels = [...document.querySelectorAll("*")].filter(
    (el) => el.childElementCount === 0 && (el.textContent || "").trim() === "设置"
  );
  let clicked = null;
  for (const label of labels) {
    const row = label.closest('button,[role="menuitem"],[class*="_item"],[class*="_row"]') || label.parentElement;
    if (row) {
      row.click();
      clicked = (typeof row.className === "string" ? row.className : "").slice(0, 120);
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 1400));
  const dialogs = [...document.querySelectorAll('[role="dialog"], [class*="_dialog"], [class*="_modal"], [class*="_settings"]')]
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 150),
        rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
        text: (el.innerText || "").trim().slice(0, 40),
      };
    })
    .filter((d) => d.rect[2] > 200);
  return JSON.stringify({ clicked, dialogs }, null, 1);
})()
