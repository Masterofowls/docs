# Iterators & Generators

_JavaScript · Reference cheat sheet_

## 📋 Overview

The **iterable protocol** (`obj[Symbol.iterator]`) supplies an iterator with `next()` → `{ value, done }`. **Generators** (`function*`) produce iterators lazily and support `yield` / `yield*`. Async generators use `async function*` and `for await...of`.

## 🔧 Core concepts

- **Iterable**: has `[Symbol.iterator]()` returning an iterator.
- **Iterator**: `{ next() }`; optional `return()` / `throw()`.
- **Generator**: `function*` pauses at `yield`; calling it returns a generator object.
- **`yield*`**: delegate to another iterable/generator.
- **Async**: `async function*`, `yield` awaited values, consume with `for await`.

```js
const iterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  },
};
[...iterable]; // [1, 2]
```

## 💡 Examples

```js
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}
console.log([...range(0, 5)]); // [0,1,2,3,4]

function* idGen() {
  let id = 1;
  while (true) yield id++;
}
const ids = idGen();
ids.next().value; // 1

// yield*
function* flatten(arr) {
  for (const x of arr) {
    if (Array.isArray(x)) yield* flatten(x);
    else yield x;
  }
}
[...flatten([1, [2, [3], 4]])]; // [1,2,3,4]

// Manual iterator
const it = range(0, 2);
console.log(it.next()); // { value: 0, done: false }
console.log(it.next());
console.log(it.next()); // { value: undefined, done: true }

// Async generator
async function* poll(url, signal) {
  while (!signal.aborted) {
    const data = await fetch(url, { signal }).then((r) => r.json());
    yield data;
    await new Promise((r) => setTimeout(r, 1000));
  }
}
```

```js
// Infinite take helper
function take(n, iterable) {
  return {
    *[Symbol.iterator]() {
      let i = 0;
      for (const v of iterable) {
        if (i++ >= n) return;
        yield v;
      }
    },
  };
}
[...take(3, idGen())]; // [1,2,3]
```

## ⚠️ Pitfalls

- Generators are lazy — side effects run only as you pull values.
- After `done: true`, further `next()` stay done (unless still open with return values).
- `break` in `for...of` calls iterator `return()` — use `try/finally` in generators for cleanup.
- Do not mix sync `for...of` with async generators — use `for await...of`.
- Spreading infinite generators never finishes.

## 🔗 Related

- [for_of.md](./for_of.md) — consuming iterables
- [iteration.md](./iteration.md) — loop overview
- [arrays.md](./arrays.md) — Array.from / spread
- [async.md](./async.md) — async iteration
- [map.md](./map.md) — built-in iterables
- [set.md](./set.md) — built-in iterables
