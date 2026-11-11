// One-off: verify the zh / en dictionaries in plugin/src/client-body.js keep
// identical key sets (zh is the key-set source of truth).
import fs from "node:fs";

const s = fs.readFileSync(new URL("../plugin/src/client-body.js", import.meta.url), "utf8");
const grab = (name) => {
  const i = s.indexOf("const " + name + " = {");
  const j = s.indexOf("\n};", i);
  return [...s.slice(i, j).matchAll(/\n {2}"([a-zA-Z0-9.]+)":/g)].map((m) => m[1]);
};
const zh = grab("zh");
const en = grab("en");
const missing = zh.filter((k) => !en.includes(k)).concat(en.filter((k) => !zh.includes(k)));
console.log("zh keys:", zh.length, "| en keys:", en.length, "| mismatch:", missing.length ? missing.join(", ") : "none");
process.exit(missing.length ? 1 : 0);
