import fs from "node:fs";
import path from "node:path";

const asarPath = process.argv[2];
const outDir = process.argv[3];
const needles = process.argv.slice(4).map((s) => s.toLowerCase());
if (!asarPath || !outDir) {
  console.error("usage: node extract-matched.mjs <app.asar> <outDir> <substr...>");
  process.exit(2);
}

const fd = fs.openSync(asarPath, "r");
const sizeBuf = Buffer.alloc(16);
fs.readSync(fd, sizeBuf, 0, 16, 0);
const headerSize = sizeBuf.readUInt32LE(4);
const headerStringSize = sizeBuf.readUInt32LE(12);
const headerBuf = Buffer.alloc(headerStringSize);
fs.readSync(fd, headerBuf, 0, headerStringSize, 16);
const header = JSON.parse(headerBuf.toString("utf8"));
const baseOffset = 8 + headerSize;

let count = 0;
function walk(node, rel) {
  if (node.files) {
    for (const [name, child] of Object.entries(node.files)) {
      walk(child, rel ? rel + "/" + name : name);
    }
    return;
  }
  if (typeof node.offset === "string" && typeof node.size === "number") {
    const lower = rel.toLowerCase();
    if (!needles.some((n) => lower.includes(n))) return;
    const dest = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const buf = Buffer.alloc(node.size);
    fs.readSync(fd, buf, 0, node.size, baseOffset + Number(node.offset));
    fs.writeFileSync(dest, buf);
    count += 1;
  }
}
walk(header, "");
fs.closeSync(fd);
console.log(`extracted ${count} files to ${outDir}`);
