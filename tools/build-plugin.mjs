import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TOKENS } from "../plugin/src/tokens.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const pluginDir = path.resolve(here, "../plugin");
const srcDir = path.join(pluginDir, "src");

const css = fs.readFileSync(path.join(srcDir, "theme.css"), "utf8");
const body = fs.readFileSync(path.join(srcDir, "client-body.js"), "utf8");
const tokens = JSON.parse(JSON.stringify(TOKENS));
const pkg = JSON.parse(fs.readFileSync(path.join(pluginDir, "package.json"), "utf8"));
const version = pkg.version;

// Indent the body one level so the generated factory stays readable.
const bodyIndented = body
  .split("\n")
  .map((line) => (line.length > 0 ? "\t\t" + line : line))
  .join("\n");

const client = `/* GENERATED FILE — built by tools/build-plugin.mjs from
   plugin/src/{theme.css,tokens.js,client-body.js}.
   Do not edit by hand; edit the sources and rerun the build. */
window.__ModuleLoader__.load({
\tid: "@local/dsh-ui-liquidglass",
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
\t\tconst PLUGIN_ID = "@local/dsh-ui-liquidglass";
\t\tconst VERSION = ${JSON.stringify(version)};
\t\t/** Alias-token override layers, one light/dark pair per token. */
\t\tconst TOKENS = ${JSON.stringify(tokens, null, 2).replace(/\n/g, "\n\t\t")};
\t\t/** Complete stylesheet for the glass surface language. */
\t\tconst CSS = ${JSON.stringify(css)};
${bodyIndented}
\t\treturn module.exports;
\t}
});
`;

fs.writeFileSync(path.join(pluginDir, "client.js"), client);
console.log(
  "client.js written:",
  Buffer.byteLength(client),
  "bytes; tokens:",
  Object.keys(tokens).length,
  "css:",
  css.length,
  "body:",
  body.length
);
