# util

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Node.js `node:util` offers helpers for promisifying callback APIs, debugging inspection, type checks, and text formatting. Small but frequently used when bridging older Node APIs to async/await.

```js
import util from "node:util";
```

## 🔧 Core concepts

- **`promisify(fn)`**: wrap `(…args, (err, result) => …)` into a function returning a Promise.
- **`callbackify(fn)`**: opposite direction — Promise function → error-first callback.
- **`inspect(obj, options?)`**: rich string representation for logging (depth, colors, getters).
- **`util.types`**: precise type predicates (`isPromise`, `isDate`, `isRegExp`, `isUint8Array`, …).
- **`format` / `styleText`**: printf-like formatting; styled terminal text (Node 20+ for `styleText`).
- **`deprecate(fn, msg)`**: wrap APIs to emit deprecation warnings once.

## 💡 Examples

```js
import util from "node:util";
import { readFile } from "node:fs";
import { execFile } from "node:child_process";

const readFileP = util.promisify(readFile);
const text = await readFileP("a.txt", "utf8");

const execFileP = util.promisify(execFile);
const { stdout } = await execFileP("node", ["-v"]);

console.log(util.inspect({ a: 1, nest: { b: [1, 2] } }, { depth: 3, colors: true }));

const { types } = util;
types.isPromise(Promise.resolve(1)); // true
types.isDate(new Date()); // true
types.isRegExp(/x/); // true

util.format("%s: %d", "count", 3); // 'count: 3'

const oldApi = util.deprecate(function legacy() {}, "legacy() is deprecated");
oldApi();
```

```js
// Custom inspect
const box = {
  value: 42,
  [util.inspect.custom](depth, opts) {
    return `Box(${this.value})`;
  },
};
console.log(util.inspect(box)); // Box(42)
```

## ⚠️ Pitfalls

- `promisify` expects error-first callbacks; nonstandard APIs need a custom promisify symbol or manual wrapper.
- `inspect` default depth can hide nested data — raise `depth` or use `depth: null` carefully (huge output).
- `typeof` is weaker than `util.types` for built-ins (e.g. promises, typed arrays).
- Do not use `inspect` output as a serialization format — use JSON or a real serializer.
- Some APIs already return Promises (`fs/promises`) — no need to promisify.

## 🔗 Related

- [Async](async.md) — async/await with promisified APIs
- [Promise](promise.md) — Promise basics
- [fs](fs.md) — prefer `fs/promises` over promisify
- [child_process](child_process.md) — promisify `execFile`
- [typeof basics](typeof_basics.md) — `typeof` vs precise checks
- [console](console.md) — logging alternatives
