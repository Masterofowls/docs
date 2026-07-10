# Modules (CommonJS)

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

CommonJS (CJS) is Node’s classic module system: `require`, `module.exports`, and synchronous loading. ES modules (`import`/`export`) are the web standard and Node’s modern default — know CJS for legacy packages, interop, and tooling. Prefer ESM for new browser and Node code.

## 🔧 Core concepts

- **Export**: `module.exports = value` or `exports.foo = ...` (alias of `module.exports` initially).
- **Import**: `const x = require("./file")` — cached after first load.
- **Resolution**: core modules, `node_modules`, relative paths; optional extensions.
- **`__filename` / `__dirname`**: file path helpers (not in ESM — use `import.meta.url`).
- **Circular deps**: partially filled `exports` during cycle.
- **Interop**: ESM can sometimes `import` CJS; CJS loads ESM via dynamic `import()`.

```js
// math.cjs
function add(a, b) {
  return a + b;
}
module.exports = { add };
```

## 💡 Examples

```js
// Export patterns
module.exports = function main() {};
module.exports = { read, write };
exports.version = "1.0.0"; // OK if not reassigned module.exports

// BAD: breaks exports alias
exports = { a: 1 }; // does not change module.exports

// Import
const { add } = require("./math");
const path = require("node:path");

// Conditional / dynamic path
const lang = require(`./locales/${name}.js`); // still sync; path must be resolvable

// Cache bust (rare)
delete require.cache[require.resolve("./config")];

// ESM consuming CJS (typical bundler/Node)
import pkg from "./legacy.cjs";
import * as ns from "./legacy.cjs";

// CJS consuming ESM
async function load() {
  const esm = await import("./modern.mjs");
  return esm.default;
}

// __dirname in ESM
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

## ⚠️ Pitfalls

- Reassigning `exports = ...` does not export — assign `module.exports`.
- `require` is sync and blocks — avoid for huge optional deps at startup when dynamic `import` fits.
- Dual packages (CJS+ESM) can cause “duplicate instance” bugs — follow package `exports` map.
- Browser has no native `require` — use ESM or a bundler.
- Live bindings differ: CJS copies values on require; ESM exports are live.

## 🔗 Related

- [import_export.md](./import_export.md) — ES modules
- [oop.md](./oop.md) — organizing code
- [json.md](./json.md) — require JSON in Node
- [error.md](./error.md) — MODULE_NOT_FOUND
