import fs from "node:fs";

process.noAsar = true;
const asarPath = process.argv[2];
const needles = process.argv.slice(3).map((s) => s.toLowerCase());
if (!asarPath || !needles.length) {
  console.error("usage: node find-in-asar.mjs <app.asar> <substr...>");
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

const hits = [];
function walk(node, rel) {
  if (node.files) {
    for (const [name, child] of Object.entries(node.files)) walk(child, rel ? rel + "/" + name : name);
    return;
  }
  if (typeof node.offset === "string" && typeof node.size === "number") {
    if (node.size === 0 || node.size > 80 * 1024 * 1024) return;
    if (!/\.(js|mjs|cjs|css|html|json|txt)$/i.test(rel)) return;
    const buf = Buffer.alloc(node.size);
    fs.readSync(fd, buf, 0, node.size, baseOffset + Number(node.offset));
    const lower = buf.toString("utf8").toLowerCase();
    const found = needles.filter((n) => lower.includes(n));
    if (found.length) hits.push({ path: rel, size: node.size, found });
  }
}
walk(header, "");
fs.closeSync(fd);
console.log(JSON.stringify(hits, null, 2));
