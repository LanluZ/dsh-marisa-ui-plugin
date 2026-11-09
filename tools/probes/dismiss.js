(() => {
  let closed = 0;
  for (const b of [...document.querySelectorAll("button[aria-label]")]) {
    const label = b.getAttribute("aria-label") || "";
    if (/关闭|close|close dialog/i.test(label)) {
      b.click();
      closed += 1;
    }
  }
  const cont = [...document.querySelectorAll("button")].find((b) => (b.textContent || "").trim() === "继续");
  if (cont) {
    cont.click();
    closed += 1;
  }
  return JSON.stringify({ closed });
})()
