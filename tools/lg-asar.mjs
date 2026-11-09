#!/usr/bin/env node
/**
 * Marisa UI — app.asar window-glass patcher CLI.
 *
 *   node tools/lg-asar.mjs <status|inject|restore>
 *
 * Same engine as the settings-page buttons (plugin/index.js asarActions) —
 * for emergency use when the app cannot start or the settings page is
 * unreachable. "restore" brings back the pristine app.asar from the
 * `app.asar.lg-backup` the first inject keeps beside it.
 */
import { asarActions } from "../plugin/index.js";

const action = process.argv[2];
const fn = Object.prototype.hasOwnProperty.call(asarActions, action) ? asarActions[action] : null;
if (typeof fn !== "function") {
  console.error("usage: node tools/lg-asar.mjs <status|inject|restore>");
  process.exit(2);
}

fn()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
    process.exit(result && result.ok === false ? 1 : 0);
  })
  .catch((error) => {
    console.error(String((error && error.message) || error));
    process.exit(1);
  });
