# Conditional Types

*_TypeScript · Reference cheat sheet_*

---

## 📖 Overview

Conditional types choose a type based on a check: `T extends U ? X : Y`. They power many built-in utilities and enable distributive logic over unions. Prefer them for type-level branching, not runtime control flow.

## 🧩 Core concepts

- **Basic form** — `T extends U ? TrueBranch : FalseBranch`.
- **Distributive conditionals** — naked type params distribute over unions (`A | B` becomes two checks).
- **`infer`** — extract a type variable from a matched pattern (e.g. Promise payload, function return).
- **Non-distributive** — wrap in a tuple `[T] extends [U]` to disable distribution.
- **Filtering unions** — `T extends U ? T : never` keeps matching members.

## 💡 Examples

```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<"hi">; // true
type B = IsString<42>; // false

// Distributive: applied per union member
type ToArray<T> = T extends unknown ? T[] : never;
type Arr = ToArray<string | number>; // string[] | number[]

// infer
type AwaitedLike<T> = T extends Promise<infer U> ? U : T;
type V = AwaitedLike<Promise<number>>; // number

type ReturnOf<F> = F extends (...args: never[]) => infer R ? R : never;
type R = ReturnOf<() => boolean>; // boolean

// Filter
type OnlyStrings<T> = T extends string ? T : never;
type S = OnlyStrings<"a" | 1 | "b">; // "a" | "b"

// Non-distributive
type IsUnion<T> = [T] extends [never]
  ? false
  : [T] extends [infer U]
    ? [U] extends [T]
      ? false
      : true
    : never;
```

## ⚠️ Pitfalls

- Forgetting distribution leads to unexpected `never` or overly wide results.
- `infer` only works in the `extends` clause of a conditional.
- Deep recursive conditionals can hit instantiation depth limits — keep them shallow.
- Prefer built-ins (`Extract`, `Exclude`, `Awaited`) when they already express the idea.

## 🔗 Related

- [Generic types](./generic_types.md)
- [Mapped types](./mapped_types.md)
- [Utility types](./utility_types.md)
- [Union types](./union_types.md)
- [Types](./types.md)
