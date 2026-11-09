(async () => {
  const trigger = document.querySelector('[class*="_trigger"][class*="_5Qcc8a"], [class*="_triggerRow"] button, button[class*="_trigger"]');
  const candidates = [...document.querySelectorAll("button,[role=button],div")].filter(
    (b) => (b.textContent || "").trim() === "更多" && b.getBoundingClientRect().width > 100
  );
  const btn = candidates[candidates.length - 1] || trigger;
  if (btn) btn.click();
  await new Promise((r) => setTimeout(r, 500));
  const overlay = document.querySelector('[data-shell-overlay], [class*="_overlayLayer"]');
  const menus = [...document.querySelectorAll('[data-menu-material], [role="menu"], [role="dialog"]')].map((el) => ({
    tag: el.tagName.toLowerCase(),
    cls: (typeof el.className === "string" ? el.className : "").slice(0, 160),
    rect: (() => {
      const r = el.getBoundingClientRect();
      return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)];
    })(),
    bg: getComputedStyle(el).backgroundColor,
    bf: getComputedStyle(el).backdropFilter,
    radius: getComputedStyle(el).borderRadius,
    text: (el.innerText || "").trim().slice(0, 80),
  }));
  return JSON.stringify({ clicked: Boolean(btn), menus, overlayChildren: overlay ? overlay.children.length : 0 }, null, 1);
})()
