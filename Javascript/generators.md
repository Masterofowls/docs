# Generators

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Generator functions (`function*`) pause with `yield` and resume later, producing an iterator. They implement the iterable protocol, enable lazy sequences, custom iteration, and cooperative async flows (often via `async function*` for async iterables).

## 🔧 Core concepts

- **Define**: `function* gen() { yield 1; }`.
- **Iterator**: `const it = gen()` → `{ next, return, throw }`.
- **`next(value)`**: resumes; argument becomes the result of the current `yield`.
- **`yield*`**: delegate to another iterable/generator.
- **Done**: `{ value, done: true }` after `return` or end.
- **Async**: `async function*` + `for await...of`.

```js
function* count(n) {
  for (let i = 0; i < n; i++) yield i;
}
[...count(3)]; // [0, 1, 2]
```

## 💡 Examples

```js
function* idMaker() {
  let id = 1;
  while (true) yield id++;
}
const ids = idMaker();
ids.next().value; // 1
ids.next().value; // 2

// Two-way communication
function* quiz() {
  const name = yield "What is your name?";
  return `Hello, ${name}`;
}
const q = quiz();
q.next(); // { value: "What is your name?", done: false }
q.next("Ada"); // { value: "Hello, Ada", done: true }

// yield*
function* a() {
  yield 1;
  yield* [2, 3];
  yield 4;
}

// Lazy infinite filter
function* filter(iterable, pred) {
  for (const x of iterable) if (pred(x)) yield x;
}

// Async generator
async function* streamLines(readable) {
  for await (const chunk of readable) {
    yield* String(chunk).split("\n");
  }
}

for await (const line of streamLines(res.body)) {
  console.log(line);
}
```

```js
// Early cleanup
function* withResource() {
  try {
    yield "open";
  } finally {
    console.log("cleanup");
  }
}
const r = withResource();
r.next();
r.return(); // runs finally
```

## ⚠️ Pitfalls

- Generators are paused, not multithreaded — still single-threaded JS.
- Forgetting `*` makes a normal function that returns a generator object only if you call another generator.
- `yield` is invalid in non-generator callbacks (e.g. inside `.map` callback) — extract a generator helper.
- Infinite generators need care with `[...gen()]` — it never finishes.
- Mixing `throw` into generators requires handling inside the generator body.

## 🔗 Related

- [iterator.md](./iterator.md) — iterator protocol
- [iteration.md](./iteration.md) — for...of
- [async.md](./async.md) — async iteration
- [event_loop.md](./event_loop.md) — scheduling
- [arrays.md](./arrays.md) — materializing with spread
