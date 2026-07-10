# readonly

_TypeScript · Reference cheat sheet_

---

## 📋 Overview

`readonly` marks properties and array/tuple positions as immutable in the type system. It does not freeze values at runtime. Use `Readonly<T>`, `readonly T[]`, `ReadonlyArray<T>`, and `as const` for immutable APIs.

## 🔧 Core concepts

- **Property** — `readonly id: string` — cannot reassign after init.
- **Arrays** — `readonly string[]` / `ReadonlyArray<string>` — no `push` / index write.
- **Tuples** — `readonly [string, number]`.
- **Mapped** — `Readonly<T>` adds `readonly` to all props (shallow).
- **`const` params** (TS 5.0+) — `function f(xs: const string[])` infers literal/readonly.

## 💡 Examples

```ts
interface User {
  readonly id: string;
  name: string;
}

const u: User = { id: "1", name: "Ada" };
// u.id = "2"; // error
u.name = "Grace"; // OK

function sum(nums: readonly number[]) {
  // nums.push(1); // error
  return nums.reduce((a, b) => a + b, 0);
}

type Point = readonly [number, number];
const p: Point = [0, 0];

type ReadonlyUser = Readonly<User>; // both fields readonly

// Shallow only
type Nested = Readonly<{ meta: { flag: boolean } }>;
const n: Nested = { meta: { flag: true } };
n.meta.flag = false; // allowed — inner object not readonly

// const type parameters (TS 5.0+)
function pair<const T>(x: T) {
  return [x, x] as const;
}
const pr = pair("hi"); // readonly ["hi", "hi"]
```

## ⚠️ Pitfalls

- `readonly` is compile-time — `Object.assign` / casts can still mutate.
- `Readonly<T>` is shallow; use deep helpers or `as const` for nested data.
- `readonly T[]` is not assignable to `T[]` (mutable); reverse often is OK.
- Class `readonly` fields can still be mutated via aliasing if typed loosely.
- Don’t confuse with JS `Object.freeze` — combine both when needed.

## 🔗 Related

- [const_assertions.md](./const_assertions.md)
- [interfaces.md](./interfaces.md)
- [utility_types.md](./utility_types.md)
- [tuple_types.md](./tuple_types.md)
- [object_types.md](./object_types.md)
