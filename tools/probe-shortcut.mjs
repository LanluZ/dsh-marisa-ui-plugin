// Extract CSS rules mentioning a substring from a minified single-line CSS file.
import fs from "node:fs";

const src = process.argv[2];
const needle = process.argv[3];
const radius = Number(process.argv[4] || 800);
const text = fs.readFileSync(src, "utf8");

let idx = 0;
let hits = 0;
while ((idx = text.indexOf(needle, idx)) !== -1) {
  hits += 1;
  // Walk backwards to the nearest '{' that opens a rule (selector ends there).
  const start = text.lastIndexOf("}", idx) + 1;
  // Walk forward to the matching rule end.
  const end = text.indexOf("}", idx) + 1;
  console.log(`--- hit ${hits} @${idx} ---`);
  console.log(text.slice(Math.max(0, start - radius), Math.min(text.length, end + radius)));
  console.log("");
  idx += needle.length;
}
console.log(`total hits: ${hits}`);
