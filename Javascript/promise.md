# Promise

_JavaScript · Reference cheat sheet_

## 📋 Overview

A Promise represents a future settlement: pending → fulfilled or rejected. Chain with `then` / `catch` / `finally`, or use `async`/`await`. Combinators coordinate multiple promises.

## 🔧 Core concepts

- **Create**: `new Promise((resolve, reject) => { ... })`, `Promise.resolve`, `Promise.reject`.
- **Consume**: `then(onFulfilled, onRejected)`, `catch`, `finally`.
- **Combinators**: `all`, `allSettled`, `race`, `any`.
- **Thenables**: objects with a `then` method are assimilated.
- **States**: settled state is immutable; further `resolve`/`reject` ignored.

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(42), 100);
});
p.then((v) => console.log(v));
```

## 💡 Examples

```js
// Wrap callback API
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
  });
}

// Combinators
await Promise.all([fetchA(), fetchB()]); // fail-fast
await Promise.allSettled([fetchA(), fetchB()]); // wait all
await Promise.race([fetch(url), timeout(5000)]); // first settled
await Promise.any([mirror1(), mirror2()]); // first fulfilled

// Timeout helper
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("timeout")), ms);
  });
}

// finally for cleanup
fetch(url)
  .then((r) => r.json())
  .finally(() => hideSpinner());

// Flattening
Promise.resolve(1)
  .then((n) => n + 1)
  .then((n) => Promise.resolve(n * 2))
  .then(console.log); // 4
```

```js
// Avoid classic constructor anti-pattern when you already have a promise
// bad: new Promise((resolve) => fetch(url).then(resolve))
// good: return fetch(url)

// Unhandled rejection — always catch
queueMicrotask(() => {
  Promise.reject(new Error("oops")).catch(console.error);
});
```

## ⚠️ Pitfalls

- `Promise.all` rejects on the first failure — use `allSettled` for partial results.
- Forgetting `return` inside `then` breaks the chain.
- Creating promises that never settle leaks resources — pair with AbortSignal.
- `then(fn, fn)` vs `.catch`: errors in `onFulfilled` skip the second arg — prefer `.catch`.
- Mixing callbacks and promises without wrapping causes double-resolve bugs.

## 🔗 Related

- [async.md](./async.md) — async/await
- [fetch.md](./fetch.md) — promise-based HTTP
- [error.md](./error.md) — rejection causes
- [api.md](./api.md) — microtasks / AbortSignal
- [iteration.md](./iteration.md) — async iteration
- [import_export.md](./import_export.md) — dynamic import()
