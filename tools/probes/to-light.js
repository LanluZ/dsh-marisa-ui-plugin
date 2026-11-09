(() => {
  const el = document.getElementById("lg-dev");
  const had = document.body.hasAttribute("data-ds-dark-theme");
  document.body.removeAttribute("data-ds-dark-theme");
  document.documentElement.style.colorScheme = "light";
  return JSON.stringify({ had, dark: document.body.hasAttribute("data-ds-dark-theme") });
})()
