const CDP = "http://127.0.0.1:9222";

async function target() {
  const list = await (await fetch(CDP + "/json/list")).json();
  const page = list.find((t) => t.type === "page");
  if (!page) throw new Error("no page target");
  return page.webSocketDebuggerUrl;
}

let ws;
let nextId = 1;
const pending = new Map();
const events = new Map();

async function connect() {
  const url = await target();
  ws = new WebSocket(url);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = (e) => rej(new Error("ws error"));
  });
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method) {
      const list = events.get(msg.method) ?? [];
      events.set(msg.method, []);
      for (const fn of list) fn(msg.params);
    }
  };
}

function send(method, params = {}) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function once(method, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const list = events.get(method) ?? [];
    list.push(resolve);
    events.set(method, list);
    setTimeout(() => reject(new Error("timeout " + method)), timeout);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function evalJs(expression) {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
    userGesture: true,
  });
  if (r.exceptionDetails) {
    throw new Error(r.exceptionDetails.exception?.description ?? JSON.stringify(r.exceptionDetails));
  }
  return r.result?.value;
}

async function shot(path) {
  const r = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  const fs = await import("node:fs");
  fs.writeFileSync(path, Buffer.from(r.data, "base64"));
  return path;
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  await connect();
  switch (cmd) {
    case "goto": {
      await send("Page.enable");
      const loaded = once("Page.loadEventFired");
      await send("Page.navigate", { url: args[0] });
      await loaded.catch(() => {});
      await sleep(Number(args[1] ?? 4000));
      console.log("navigated", args[0]);
      break;
    }
    case "shot": {
      console.log(await shot(args[0]));
      break;
    }
    case "eval": {
      const value = await evalJs(args.join(" "));
      console.log(typeof value === "string" ? value : JSON.stringify(value, null, 2));
      break;
    }
    case "evalfile": {
      const fs = await import("node:fs");
      const expr = fs.readFileSync(args[0], "utf8");
      const value = await evalJs(expr);
      console.log(typeof value === "string" ? value : JSON.stringify(value, null, 2));
      break;
    }
    case "css": {
      const fs = await import("node:fs");
      const css = fs.readFileSync(args[0], "utf8");
      const id = args[1] ?? "lg-dev";
      await evalJs(`(() => {
        let el = document.getElementById(${JSON.stringify(id)});
        if (!el) { el = document.createElement("style"); el.id = ${JSON.stringify(id)}; document.head.appendChild(el); }
        el.textContent = ${JSON.stringify(css)};
        return "css injected " + ${JSON.stringify(css.length)} + " chars";
      })()`);
      console.log("css injected", css.length);
      break;
    }
    case "wait": {
      await sleep(Number(args[0] ?? 500));
      console.log("waited");
      break;
    }
    case "apply": {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const { pathToFileURL } = await import("node:url");
      const dir = args[0] ?? "plugin/src";
      const tokensPath = path.resolve(dir, "tokens.js");
      const { TOKENS } = await import(pathToFileURL(tokensPath).href);
      const backdropPath = path.resolve(dir, "backdrop.js");
      const { mountBackdrop } = await import(pathToFileURL(backdropPath).href);
      const names = Object.keys(TOKENS);
      const light = names.map((n) => `${n}:${TOKENS[n].light} !important;`).join("");
      const dark = names.map((n) => `${n}:${TOKENS[n].dark} !important;`).join("");
      const tokenCss = `body{${light}}\nbody[data-ds-dark-theme]{${dark}}\n`;
      const theme = fs.readFileSync(path.resolve(dir, "theme.css"), "utf8");
      const css = tokenCss + theme;
      await evalJs(`(() => {
        let el = document.getElementById("lg-dev");
        if (!el) { el = document.createElement("style"); el.id = "lg-dev"; document.head.appendChild(el); }
        el.textContent = ${JSON.stringify(css)};
        return true;
      })()`);
      const layer = `(() => { const mountBackdrop = ${mountBackdrop.toString()}; return mountBackdrop(); })()`;
      const layerResult = await evalJs(layer);
      console.log("applied tokens=" + names.length + " css=" + css.length + " layer=" + layerResult);
      break;
    }
    case "click": {
      console.log(await evalJs(`(()=>{const el=document.querySelector(${JSON.stringify(args[0])}); if(!el) return "missing"; el.scrollIntoView({block:"center"}); el.click(); return "clicked"})()`));
      break;
    }
    case "text": {
      console.log(await evalJs(`document.body.innerText`));
      break;
    }
    case "size": {
      console.log(await evalJs(`JSON.stringify({w:innerWidth,h:innerHeight,dpr:devicePixelRatio})`));
      break;
    }
    default:
      throw new Error("unknown command: " + cmd);
  }
  ws.close();
}

main().catch((e) => {
  console.error("CDP-ERROR:", e.message);
  process.exit(1);
});
