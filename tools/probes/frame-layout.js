JSON.stringify(
  (() => {
    const f = document.querySelector('[class*="_frame"]');
    const s = document.querySelector('[class*="_sidebarCol"]');
    const c = document.querySelector('[class*="_centerCol"]');
    const cs = getComputedStyle(f);
    const ss = getComputedStyle(s);
    return {
      frame: {
        display: cs.display,
        flexDirection: cs.flexDirection,
        gap: cs.gap,
        padding: cs.padding,
        position: cs.position,
        width: cs.width,
        gridTemplate: cs.gridTemplateColumns,
      },
      sidebar: { flex: ss.flex, width: ss.width, position: ss.position, margin: ss.margin, borderRadius: ss.borderRadius },
      center: { flex: getComputedStyle(c).flex, width: getComputedStyle(c).width, borderRadius: getComputedStyle(c).borderRadius },
    };
  })(),
  null,
  1
)
