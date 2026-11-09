import fs from "node:fs";

process.noAsar = true;
const src = process.argv[2];
const out = process.argv[3];
const text = fs.readFileSync(src, "utf8");

// Collect double-quoted string literals that look like CSS.
const re = /"((?:[^"\\]|\\.)*)"/g;
const css = [];
let m;
while ((m = re.exec(text))) {
  const raw = m[1];
  if (raw.length < 40) continue;
  if (!raw.includes("{") || !raw.includes("}")) continue;
  if (!/[:;{}]/.test(raw)) continue;
  if (!raw.includes("--dsw-") && !raw.includes("@media") && !raw.includes("display:") && !raw.includes(":root")) continue;
  let decoded;
  try {
    decoded = JSON.parse('"' + raw + '"');
  } catch {
    continue;
  }
  if (!decoded.includes("{")) continue;
  css.push(decoded);
}
fs.writeFileSync(out, css.join("\n\n/* --- */\n\n"));
console.log(`wrote ${css.length} css chunks, ${fs.statSync(out).size} bytes -> ${out}`);
