(async () => {
  const rows = [...document.querySelectorAll('[class*="_sessionRow"]')];
  const target = rows.find((r) => (r.innerText || "").trim().startsWith("未命名")) || rows.find((r) => (r.innerText || "").trim().length > 2);
  if (target) target.click();
  await new Promise((r) => setTimeout(r, 1500));
  return JSON.stringify({ clicked: target ? (target.innerText || "").trim().slice(0, 30) : null, rows: rows.length });
})()
