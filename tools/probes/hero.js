JSON.stringify(
  [...document.querySelectorAll('[class*="_titleGroup"]')].map((el) => ({
    cls: el.className,
    children: [...el.children].map((c) => ({
      tag: c.tagName.toLowerCase(),
      cls: typeof c.className === "string" ? c.className : "",
      text: (c.innerText || "").trim().slice(0, 30),
    })),
  })),
  null,
  1
)
