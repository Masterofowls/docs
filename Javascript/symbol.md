# Symbol

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

`Symbol` is a primitive unique key type. Each `Symbol("desc")` is unique (except `Symbol.for`). Symbols enable non-colliding object properties, protocol hooks (`Symbol.iterator`), and meta behavior without string key clashes.

## 🔧 Core concepts

- **Create**: `Symbol(description?)` — always unique.
- **Global registry**: `Symbol.for(key)` / `Symbol.keyFor(sym)`.
- **As keys**: `obj[sym] = value` — skipped by most string enumerations.
- **Well-known**: `Symbol.iterator`, `Symbol.asyncIterator`, `Symbol.toStringTag`, `Symbol.hasInstance`, `Symbol.toPrimitive`, etc.
- **Description**: `sym.description` (informational only).
- **Not constructible**: `new Symbol()` throws.

```js
const id = Symbol("id");
const user = { [id]: 42, name: "Ada" };
user[id]; // 42
```

## 💡 Examples

```js
const SECRET = Symbol("secret");
const bag = {
  visible: true,
  [SECRET]: "hidden",
};
Object.keys(bag); // ["visible"]
Object.getOwnPropertySymbols(bag); // [Symbol(secret)]

// Global shared symbol
const a = Symbol.for("app.token");
const b = Symbol.for("app.token");
a === b; // true
Symbol.keyFor(a); // "app.token"

// Custom iterable
const range = {
  from: 1,
  to: 3,
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) yield i;
  },
};
[...range]; // [1, 2, 3]

// toStringTag
class Queue {
  get [Symbol.toStringTag]() {
    return "Queue";
  }
}
Object.prototype.toString.call(new Queue()); // "[object Queue]"

// hasInstance
class Even {
  static [Symbol.hasInstance](x) {
    return Number(x) % 2 === 0;
  }
}
2 instanceof Even; // true
```

```js
// Unique enum-like constants
const Color = {
  Red: Symbol("red"),
  Blue: Symbol("blue"),
};
```

## ⚠️ Pitfalls

- `JSON.stringify` omits symbol keys — serialize explicitly if needed.
- Symbols are not truly private — `getOwnPropertySymbols` reveals them; use `#private` fields for real privacy.
- `Symbol.for` shares across the realm — choose unique registry keys.
- Spreading `{...obj}` copies enumerable string keys; symbol copy needs `getOwnPropertySymbols` + descriptors.

## 🔗 Related

- [objects.md](./objects.md) — property keys
- [iterator.md](./iterator.md) — Symbol.iterator
- [oop.md](./oop.md) — private fields
- [proxy_reflect.md](./proxy_reflect.md) — ownKeys traps
- [json.md](./json.md) — serialization limits
