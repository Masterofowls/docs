# Freeze & Seal

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

`Object.freeze`, `Object.seal`, and `Object.preventExtensions` progressively lock objects against extension and mutation. They are shallow. For true immutability in apps, combine with conventions, structuredClone, or immutable libraries — and know what each level allows.

## 🔧 Core concepts

| Method | Add props | Delete | Reassign values | Reconfigure |
| --- | --- | --- | --- | --- |
| `preventExtensions` | ✗ | ✓* | ✓ | ✓ |
| `seal` | ✗ | ✗ | ✓ | ✗ (configurable false) |
| `freeze` | ✗ | ✗ | ✗ | ✗ |

\*existing configurable props can still be deleted if not sealed.

- **Checks**: `Object.isFrozen`, `isSealed`, `isExtensible`.
- **Strict mode**: failed mutations throw `TypeError`; sloppy mode fails silently.
- **Shallow**: nested objects remain mutable unless frozen too.

```js
const cfg = Object.freeze({ theme: "dark", nested: { a: 1 } });
cfg.theme = "light"; // ignored / TypeError
cfg.nested.a = 2; // still works — shallow!
```

## 💡 Examples

```js
"use strict";

const sealed = Object.seal({ x: 1 });
sealed.x = 2; // OK
// sealed.y = 3; // TypeError
// delete sealed.x; // TypeError

const frozen = Object.freeze({ x: 1 });
// frozen.x = 2; // TypeError

Object.preventExtensions(arrLike);
// arrLike.newProp = 1; // TypeError

// Deep freeze (simple)
function deepFreeze(obj) {
  Object.freeze(obj);
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return obj;
}

// Constants pattern
const ROUTES = Object.freeze({
  HOME: "/",
  ABOUT: "/about",
});

// Arrays
const list = Object.freeze([1, 2, 3]);
// list.push(4); // TypeError
```

```js
// Copy then freeze
const next = Object.freeze({ ...state, count: state.count + 1 });
```

## ⚠️ Pitfalls

- Shallow freeze is the #1 surprise — nested mutation still works.
- Freezing does not make values deeply immutable or protect against Proxy targets specially.
- `const` ≠ immutable — only rebinding is blocked; freeze the object too.
- Frozen arrays reject mutator methods; some libraries assume extensible objects.
- Cannot unfreeze — make a new object instead.

## 🔗 Related

- [objects.md](./objects.md) — property descriptors
- [strict_mode.md](./strict_mode.md) — TypeError on mutate
- [structured_clone.md](./structured_clone.md) — deep copy
- [proxy_reflect.md](./proxy_reflect.md) — deeper control
- [spread_rest.md](./spread_rest.md) — immutable updates
