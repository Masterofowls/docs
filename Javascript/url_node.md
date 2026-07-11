# Node URL helpers

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Node.js `node:url` complements the WHATWG `URL` API with filesystem bridges: **`pathToFileURL`**, **`fileURLToPath`**, and legacy `url.parse` (avoid). Use these when converting between OS paths and `file:` URLs — especially in ESM (`import.meta.url`).

```js
import { pathToFileURL, fileURLToPath } from "node:url";
```

## 🔧 Core concepts

- **`URL`**: standard absolute URL class (also global in Node) — `href`, `pathname`, `searchParams`, etc.
- **`pathToFileURL(path)`**: absolute filesystem path → `URL` with `file:` protocol.
- **`fileURLToPath(url)`**: `file:` URL / string → absolute OS path (handles Windows quirks).
- **`import.meta.url`**: ESM module’s own `file:` URL.
- **Legacy**: `url.parse` / `url.format` are legacy; prefer WHATWG `URL`.

## 💡 Examples

```js
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

// ESM __filename / __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileUrl = pathToFileURL(path.join(__dirname, "data.json"));
console.log(fileUrl.href); // file:///…

const back = fileURLToPath(fileUrl);
console.log(back); // absolute path

// Dynamic import from path
const modUrl = pathToFileURL(path.join(__dirname, "plugin.js")).href;
const plugin = await import(modUrl);

// WHATWG URL (same as browsers)
const u = new URL("https://example.com/a?x=1#h");
u.searchParams.get("x"); // '1'
u.pathname = "/b";
console.log(u.toString());
```

```js
// Resolve relative to current module
const asset = new URL("./assets/logo.png", import.meta.url);
const assetPath = fileURLToPath(asset);
```

## ⚠️ Pitfalls

- `fileURLToPath` only accepts `file:` URLs — http(s) throws.
- On Windows, paths and `file:` URLs differ (`C:\` vs `file:///C:/`); always convert with these helpers.
- `URL.pathname` is percent-encoded; do not treat it as a raw filesystem path — use `fileURLToPath`.
- Legacy `url.parse` is mutable/quirky and marked legacy in docs.
- Relative path strings are not valid `URL` bases without a base argument.

## 🔗 Related

- [URL](url.md) — WHATWG `URL` / `URLSearchParams`
- [Path](path.md) — `join`, `dirname`, `resolve`
- [ESM import/export](import_export.md) — `import.meta.url`
- [CommonJS modules](modules_commonjs.md) — `__dirname` without URL helpers
- [fetch](fetch.md) — requesting http(s) URLs
- [fs](fs.md) — open paths from `fileURLToPath`
