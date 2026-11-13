(() => {
  const out = { found: 0, samples: [] };
  const nodes = [...document.querySelectorAll('[class*="_keys_"]')];
  out.found = nodes.length;
  for (const el of nodes.slice(0, 6)) {
    const cs = getComputedStyle(el);
    const parent = el.parentElement;
    const entry = {
      keysCls: el.className,
      parentCls: (parent && parent.className || "").toString().slice(0, 160),
      keysStyle: {
        bg: cs.backgroundColor,
        radius: cs.borderRadius,
        padding: cs.padding,
        boxShadow: cs.boxShadow,
      },
      keysText: (el.textContent || "").slice(0, 40),
      kbd: [...el.querySelectorAll("kbd")].map((k) => {
        const kcs = getComputedStyle(k);
        return {
          cls: k.className,
          text: k.textContent,
          bg: kcs.backgroundColor,
          radius: kcs.borderRadius,
          shadow: kcs.boxShadow,
          padding: kcs.padding,
        };
      }),
    };
    // Which stylesheets rule sets the kbd background? enumerate matching rules.
    entry.kbdRules = [];
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch { continue; }
      const walk = (list) => {
        for (const r of list) {
          if (r.cssRules) { walk(r.cssRules); continue; }
          if (!r.selectorText) continue;
          try {
            if (r.style && (r.style.backgroundColor || r.style.borderRadius || r.style.background)) {
              const k = el.querySelector("kbd");
              if (k && k.matches(r.selectorText) && r.style.backgroundColor) {
                entry.kbdRules.push({ sel: r.selectorText.slice(0, 200), bg: r.style.backgroundColor, sheet: (sheet.href || "inline").slice(-60) });
              }
            }
          } catch {}
        }
      };
      walk(rules);
    }
    out.samples.push(entry);
  }
  return JSON.stringify(out, null, 1);
})()
