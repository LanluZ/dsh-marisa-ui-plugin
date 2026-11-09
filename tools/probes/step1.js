(() => {
  const labels = [...document.querySelectorAll("button")].map((b) => b.innerText.trim());
  const cont = [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "继续");
  if (cont) cont.click();
  return JSON.stringify({ labels, clicked: Boolean(cont) });
})()
