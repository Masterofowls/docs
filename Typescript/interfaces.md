# Interfaces

_TypeScript · Reference cheat sheet_

---

## 📋 Overview

Interfaces declare the shape of objects, classes, and callables. They support declaration merging and `extends`. Prefer `interface` for object APIs that may grow; use `type` for unions, tuples, and mapped types.

## 🔧 Core concepts

- **Object shape** — required / optional (`?`) / `readonly` properties.
- **Extends** — `interface B extends A` (multiple bases allowed).
- **Declaration merging** — same name in a scope merges members.
- **Index / call / construct** — `[k: string]: T`, `(x: T) => R`, `new (...) => T`.
- **Implements** — classes must satisfy the interface (structural check).
- **vs `type`** — `type` can alias any type; interfaces only describe object-like forms (plus callables).

## 💡 Examples

```ts
interface User {
  readonly id: string;
  name: string;
  email?: string;
}

interface Admin extends User {
  permissions: string[];
}

interface StringMap {
  [key: string]: string;
}

interface Comparator {
  (a: number, b: number): number;
}

interface Box<T> {
  value: T;
}

class Point implements User {
  readonly id = "p1";
  name = "origin";
}

// Declaration merging (e.g. augmenting libs)
interface Window {
  myAppConfig?: { debug: boolean };
}

// Hybrid: callable + properties
interface Counter {
  (start: number): number;
  reset(): void;
}
```

```ts
// Prefer interface for public object contracts
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

// Prefer type for unions
type Result<T> = { ok: true; value: T } | { ok: false; error: string };
```

## ⚠️ Pitfalls

- Excess property checks apply to object *literals*, not variables with extra fields.
- Merged interfaces must be compatible — conflicting property types error.
- `implements` does not change the class’s inferred instance type beyond checking.
- Open-ended index signatures weaken property types (`string` index → all props assignable to that type).
- Don’t use empty interfaces as “branding” without a unique field — prefer branded types.

## 🔗 Related

- [types.md](./types.md)
- [object_types.md](./object_types.md)
- [index_signatures.md](./index_signatures.md)
- [readonly.md](./readonly.md)
- [class.md](./class.md)
- [branded_types.md](./branded_types.md)
