(async () => {
  const settingsArea = document.querySelector('[class*="_settingsArea"]');
  const trigger = settingsArea ? settingsArea.querySelector("button") : null;
  if (trigger) trigger.click();
  await new Promise((r) => setTimeout(r, 700));
  const out = [];
  const overlay = document.querySelector('[data-shell-overlay], [class*="_overlayLayer"]');
  const scope = overlay || document.body;
  for (const el of scope.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width < 60 || r.height < 20) continue;
    const cls = typeof el.className === "string" ? el.className : "";
    const cs = getComputedStyle(el);
    out.push({
      tag: el.tagName.toLowerCase(),
      cls: cls.slice(0, 150),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      bg: cs.backgroundColor,
      bgi: cs.backgroundImage.slice(0, 80),
      bf: cs.backdropFilter,
      radius: cs.borderRadius,
      menuMaterial: el.hasAttribute("data-menu-material") || el.closest("[data-menu-material]") ? true : undefined,
      text: (el.innerText || "").trim().slice(0, 24) || undefined,
    });
  }
  return JSON.stringify(out.slice(-30), null, 1);
})()
