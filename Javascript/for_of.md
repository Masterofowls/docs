# for...of

_JavaScript · Reference cheat sheet_

## 📋 Overview

`for...of` iterates values from any iterable (`Array`, `String`, `Map`, `Set`, generators, DOM collections that are iterable). Prefer it over index loops when you need values, not indices.

## 🔧 Core concepts

- **Syntax**: `for (const item of iterable) { ... }`.
- **Bindings**: `const` / `let` / destructuring per iteration.
- **Control**: `break`, `continue`, `return` (from enclosing function).
- **Async**: `for await (const x of asyncIterable)`.
- **vs `for...in`**: `in` enumerates keys; `of` yields values.

```js
for (const n of [10, 20, 30]) {
  console.log(n);
}
```

## 💡 Examples

```js
// Entries with index
for (const [i, v] of ["a", "b"].entries()) {
  console.log(i, v);
}

// Strings (Unicode code points with for...of)
for (const ch of "A🙂B") {
  console.log(ch);
}

// Map / Set
const m = new Map([["x", 1], ["y", 2]]);
for (const [k, v] of m) console.log(k, v);

for (const v of new Set([1, 1, 2])) console.log(v);

// Destructure objects in arrays
const rows = [{ id: 1 }, { id: 2 }];
for (const { id } of rows) console.log(id);

// early exit
for (const n of nums) {
  if (n < 0) break;
}

// NodeList (modern browsers — iterable)
for (const el of document.querySelectorAll("li")) {
  el.classList.add("ready");
}

// Async iterable
async function consume(stream) {
  for await (const chunk of stream) {
    console.log(chunk);
  }
}
```

```js
// Generator source
function* range(n) {
  for (let i = 0; i < n; i++) yield i;
}
for (const i of range(3)) console.log(i); // 0 1 2
```

## ⚠️ Pitfalls

- Do not use `for...in` on arrays when you want values — it yields keys as strings and enumerable prototype props.
- Closing iterators: `break` calls `return()` on the iterator if present (important for generators with `finally`).
- `for await...of` only works in async functions / modules with top-level await.
- Mutating a collection while iterating can skip items or throw — iterate a snapshot (`[...list]`).

## 🔗 Related

- [iteration.md](./iteration.md) — all loop styles
- [iterator.md](./iterator.md) — iterable protocol
- [arrays.md](./arrays.md) — array helpers
- [map.md](./map.md) — Map iteration
- [set.md](./set.md) — Set iteration
- [async.md](./async.md) — for await...of
- [while.md](./while.md) — while / do...while
