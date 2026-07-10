# Structured Clone

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

The structured clone algorithm deep-copies certain JS values across realms — used by `structuredClone()`, `postMessage`, IndexedDB, and history state. It handles built-ins that `JSON` cannot (Dates, Maps, typed arrays) but rejects functions, DOM nodes, and symbols as keys in some cases.

## 🔧 Core concepts

- **API**: `structuredClone(value, { transfer })`.
- **Supported**: primitives, plain objects/arrays, `Date`, `RegExp`, `Map`, `Set`, `Blob`, `File`, `ArrayBuffer`, typed arrays, `Error` (mostly), cyclic refs.
- **Unsupported**: functions, DOM nodes, class instances’ methods / prototype identity, some platform objects.
- **Transfer**: move `ArrayBuffer` ownership (detached source) via `transfer` list.
- **vs JSON**: JSON drops `undefined`, converts Date to string, can’t cycle; clone keeps more types.

```js
const copy = structuredClone({ d: new Date(), m: new Map([[1, 2]]) });
copy.d instanceof Date; // true
```

## 💡 Examples

```js
// Deep clone with cycles
const a = { name: "a" };
a.self = a;
const b = structuredClone(a);
b.self === b; // true
b !== a; // true

// Map / Set
structuredClone(new Set([1, 2, 2]));

// Transfer buffer to worker-like flow
const buf = new ArrayBuffer(8);
const moved = structuredClone(buf, { transfer: [buf] });
// buf.byteLength === 0 (detached)

// postMessage uses same algorithm
worker.postMessage({ pixels }, [pixels.buffer]);

// History state
history.pushState(structuredClone(state), "", url);

// What fails
// structuredClone(() => {}); // DataCloneError
// structuredClone(document.body); // DataCloneError

// JSON fallback comparison
JSON.parse(JSON.stringify({ d: new Date() })).d; // string, not Date
```

```js
// Clone error
const err = structuredClone(new Error("boom"));
err.message; // "boom"
```

## ⚠️ Pitfalls

- Class instances become plain objects (prototype lost) or throw — don’t expect methods.
- `transfer` detaches the original buffer — subsequent access throws.
- Older browsers need polyfills / fallbacks for `structuredClone`.
- `WeakMap` / functions / symbols as object keys are not cloneable.
- Not a security boundary by itself — still validate untrusted data.

## 🔗 Related

- [json.md](./json.md) — JSON clone limits
- [web_workers.md](./web_workers.md) — postMessage
- [typed_arrays.md](./typed_arrays.md) — transferable buffers
- [history_api.md](./history_api.md) — pushState data
- [freeze_seal.md](./freeze_seal.md) — immutability after clone
