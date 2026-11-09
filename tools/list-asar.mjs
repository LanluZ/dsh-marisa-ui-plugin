import fs from "node:fs";

const asarPath = process.argv[2];
const filter = (process.argv[3] ?? "").toLowerCase();
if (!asarPath) {
  console.error("usage: node list-asar.mjs <app.asar> [path-substring]");
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
fs.closeSync(fd);

const rows = [];
function walk(node, rel) {
  if (node.files) {
    for (const [name, child] of Object.entries(node.files)) {
      walk(child, rel ? rel + "/" + name : name);
    }
    return;
  }
  if (typeof node.offset === "string" && typeof node.size === "number") {
    rows.push({ path: rel, size: node.size });
  }
}
walk(header, "");

const matched = filter ? rows.filter((r) => r.path.toLowerCase().includes(filter)) : rows;
matched.sort((a, b) => b.size - a.size);
for (const r of matched) console.log(`${String(r.size).padStart(10)}  ${r.path}`);
console.log(`\n${matched.length}/${rows.length} files`);
