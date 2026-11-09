(() => {
  function chainFor(el) {
    const chain = [];
    let cur = el;
    while (cur && cur !== document.documentElement) {
      const r = cur.getBoundingClientRect();
      const cs = getComputedStyle(cur);
      const cls = typeof cur.className === "string" ? cur.className : "";
      chain.push({
        tag: cur.tagName.toLowerCase(),
        cls: cls.slice(0, 160),
        rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
        bg: cs.backgroundColor,
        radius: cs.borderRadius,
        pos: cs.position,
        z: cs.zIndex,
      });
      cur = cur.parentElement;
    }
    return chain;
  }

  function findText(t) {
    const els = [...document.querySelectorAll("div,span,label,p,h1,h2,h3,button,textarea,input")];
    return els.find((e) => e.childElementCount === 0 && (e.textContent || "").trim() === t) || els.find((e) => (e.textContent || "").trim().includes(t) && e.childElementCount <= 2);
  }

  const composer = document.querySelector('[class*="_card"]') || findText("选择工作区");
  const composerEl = [...document.querySelectorAll('[class*="_card"]')].sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0];

  const targets = {};
  const composerChain = composerEl ? chainFor(composerEl) : [];
  targets.composer = composerChain;

  const sidebarRoot = document.querySelector('[class*="wtg9ga_root"]');
  targets.sidebar = sidebarRoot ? chainFor(sidebarRoot).slice(0, 5) : [];

  const newChat = [...document.querySelectorAll("button")].find((b) => (b.innerText || "").includes("新会话"));
  targets.newChat = newChat ? chainFor(newChat).slice(0, 8) : [];

  const switchBtn = [...document.querySelectorAll("button")].find((b) => (b.getAttribute("aria-label") || "").includes("折叠") || (b.getAttribute("aria-label") || "").includes("侧边栏"));
  targets.collapse = switchBtn ? chainFor(switchBtn).slice(0, 8) : [];

  return JSON.stringify(targets, null, 1);
})()
