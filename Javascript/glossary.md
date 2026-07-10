# Glossary

_Javascript · Reference cheat sheet_

---

## 📋 Overview

Alphabetical glossary of core JavaScript terms spanning values, functions, async flow, objects, and browser/runtime APIs.

## 🔧 Core concepts

| Term | Definition |
| --- | --- |
| Array | An ordered, indexable collection of values with array methods. |
| Async/await | Syntax that pauses an async function until a Promise settles. |
| BigInt | An integer type for values beyond `Number.MAX_SAFE_INTEGER`. |
| Boolean | A primitive that is either `true` or `false`. |
| Callback | A function passed to another function to run later. |
| Closure | A function that retains access to variables from its outer scope. |
| Coercion | Automatic or explicit conversion of a value from one type to another. |
| Destructuring | Syntax that unpacks values from arrays or properties from objects. |
| Event loop | The runtime mechanism that schedules macrotasks and microtasks. |
| Fetch | The standard API for making HTTP requests that returns a Promise. |
| Function | A callable object that executes a block of code with parameters. |
| Generator | A function using `function*` and `yield` that produces an iterator. |
| Hoisting | Moving declarations to the top of their scope during compilation. |
| IIFE | Immediately Invoked Function Expression that runs as soon as it is defined. |
| Iterable | An object that implements `[Symbol.iterator]` and can be looped with `for...of`. |
| JSON | A text data format and global object for parse/stringify. |
| Map | A collection of key–value pairs that preserves insertion order. |
| Module | A file with its own scope that exports and imports bindings. |
| Null | A primitive representing intentional absence of an object value. |
| Object | A collection of named properties; almost everything non-primitive is one. |
| Optional chaining | The `?.` operator that short-circuits when a reference is nullish. |
| Promise | An object representing a future success or failure of an async operation. |
| Prototype | The object linked for inheritance lookups via the prototype chain. |
| Proxy | An object that intercepts fundamental operations on another object. |
| Scope | The region of code where a binding is visible. |
| Set | A collection of unique values. |
| Spread | The `...` syntax that expands iterables or object properties. |
| Strict mode | A restricted JavaScript variant that catches silent errors. |
| Symbol | A unique, immutable primitive often used as non-colliding property keys. |
| Template literal | A string delimited by backticks that supports interpolation and multiline text. |
| This | A binding whose value depends on how a function is called. |
| Undefined | A primitive meaning a variable has been declared but not assigned. |
| WeakMap | A Map-like collection whose keys are weakly held objects. |

## 💡 Examples

**Closure and destructuring:**

```js
function makeCounter() {
  let n = 0;
  return () => ++n;
}
const { length } = [1, 2, 3];
```

**Promise with async/await:**

```js
async function loadUser(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("failed");
  return res.json();
}
```

**Optional chaining and nullish coalescing:**

```js
const name = user?.profile?.name ?? "Anonymous";
```

## ⚠️ Pitfalls

- Confusing **null** (intentional empty) with **undefined** (missing value).
- Mixing **==** coercion equality with **===** strict equality.
- Assuming **this** always means the enclosing object — it depends on call style.
- Treating **Map** like a plain **Object** — keys and iteration differ.
- Equating **callback** hell with **Promise** chains — both are async, different control styles.

## 🔗 Related

- [closures](closures.md)
- [promise](promise.md)
- [async](async.md)
- [prototypes](prototypes.md)
- [destructuring](destructuring.md)
- [event_loop](event_loop.md)
