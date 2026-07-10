# Map

_JavaScript · Reference cheat sheet_

## 📋 Overview

`Map` is a keyed collection that preserves insertion order and accepts any value as a key (including objects). Prefer `Map` over plain objects when keys are unknown, non-strings, or you need reliable size / iteration.

## 🔧 Core concepts

- **Create**: `new Map()`, `new Map([[k, v], ...])`.
- **Mutate**: `set`, `get`, `has`, `delete`, `clear`.
- **Size**: `map.size` (not a method).
- **Iterate**: `keys()`, `values()`, `entries()`, `forEach`, `for...of`.
- **Key equality**: SameValueZero (`NaN` equals `NaN`; `+0` / `-0` equal).

```js
const m = new Map();
m.set("a", 1).set("b", 2);
m.get("a"); // 1
m.size; // 2
```

## 💡 Examples

```js
// Object keys by reference
const user = { id: 1 };
const scores = new Map();
scores.set(user, 100);
scores.get(user); // 100

// Build from object
const fromObj = new Map(Object.entries({ x: 1, y: 2 }));

// To object (string keys only)
const obj = Object.fromEntries(fromObj);

// Frequency map
function frequencies(list) {
  const freq = new Map();
  for (const item of list) {
    freq.set(item, (freq.get(item) ?? 0) + 1);
  }
  return freq;
}

// Default get
function getOr(map, key, factory) {
  if (!map.has(key)) map.set(key, factory());
  return map.get(key);
}

// Iterate
for (const [k, v] of scores) console.log(k, v);

// Group into Map
function groupBy(list, keyFn) {
  const map = new Map();
  for (const item of list) {
    const key = keyFn(item);
    getOr(map, key, () => []).push(item);
  }
  return map;
}
```

```js
// WeakMap — keys must be objects; not iterable; GC-friendly
const privateState = new WeakMap();
function attach(el) {
  privateState.set(el, { clicks: 0 });
}
```

## ⚠️ Pitfalls

- Object keys are by **reference**, not deep equality.
- `JSON.stringify(map)` → `"{}"` — convert with `Object.fromEntries` or entries array.
- `map["a"] = 1` does not use Map storage — always use `.set` / `.get`.
- `WeakMap` is not iterable and cannot use primitive keys.
- Converting to object fails for non-string/symbol keys.

## 🔗 Related

- [set.md](./set.md) — Set collections
- [objects.md](./objects.md) — plain object maps
- [iteration.md](./iteration.md) — iterating Maps
- [for_of.md](./for_of.md) — for...of entries
- [json.md](./json.md) — serialization
- [arrays.md](./arrays.md) — Object.groupBy
