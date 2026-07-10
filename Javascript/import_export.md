# Import / Export

_JavaScript · Reference cheat sheet_

## 📋 Overview

ES modules (`import` / `export`) are the standard module system. Static imports are hoisted and analyzed at load time; dynamic `import()` returns a Promise. Use `.js` extensions in native ESM paths as required by the runtime.

## 🔧 Core concepts

- **Named exports**: `export const x = 1`, `export function f() {}`, `export { a, b as c }`.
- **Default export**: one per module — `export default expr`.
- **Import named**: `import { a, b as c } from "./mod.js"`.
- **Import default**: `import Name from "./mod.js"`.
- **Namespace**: `import * as mod from "./mod.js"`.
- **Side-effect**: `import "./polyfill.js"`.
- **Dynamic**: `const mod = await import("./mod.js")`.
- **Re-export**: `export { x } from "./x.js"`, `export * from "./x.js"`.

```js
// math.js
export const PI = Math.PI;
export function area(r) {
  return PI * r * r;
}
export default function sum(...ns) {
  return ns.reduce((a, b) => a + b, 0);
}
```

## 💡 Examples

```js
// consumer.js
import sum, { PI, area } from "./math.js";
import * as math from "./math.js";

console.log(area(2), sum(1, 2), math.PI);

// Rename
import { area as circleArea } from "./math.js";

// Dynamic / conditional
async function loadLocale(lang) {
  const mod = await import(`./locales/${lang}.js`);
  return mod.default;
}

// Import attributes (JSON modules — where supported)
import data from "./config.json" with { type: "json" };

// Re-export barrel
// index.js
export { area, PI } from "./math.js";
export { default as sum } from "./math.js";

// Top-level await in modules
const config = await fetch("/config.json").then((r) => r.json());
export { config };
```

```js
// Live bindings — exports are live
// counter.js
export let count = 0;
export function inc() {
  count += 1;
}

// main.js
import { count, inc } from "./counter.js";
inc();
console.log(count); // 1
```

## ⚠️ Pitfalls

- Mixing CommonJS `require` and ESM needs interop — prefer one system per package.
- Default + named: `import foo, { bar }` — default is not in `{ bar }` unless also exported named.
- Circular imports can yield temporal dead zone / partial bindings — redesign cycles.
- Bundlers may tree-shake only static `import`; dynamic paths limit analysis.
- In browsers, modules need `type="module"` and usually CORS for file URLs.

## 🔗 Related

- [objects.md](./objects.md) — module namespaces as objects
- [async.md](./async.md) — top-level await
- [promise.md](./promise.md) — dynamic import()
- [json.md](./json.md) — JSON module data
- [api.md](./api.md) — runtime module loaders
