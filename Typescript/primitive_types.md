# Primitive Types

*_TypeScript · Reference cheat sheet_*

---

## 📖 Overview

Primitives are the built-in scalar types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, and `undefined`. TypeScript mirrors JavaScript’s runtime primitives and adds compile-time distinctions (e.g. literal types, `strictNullChecks`).

## 🧩 Core concepts

- **`string` / `number` / `boolean`** — everyday scalars; `number` covers IEEE-754 floats (no separate `int`).
- **`bigint`** — arbitrary-precision integers (`100n`); not assignable to/from `number` without conversion.
- **`symbol`** — unique keys; `unique symbol` for singleton symbol types.
- **`null` / `undefined`** — with `strictNullChecks`, not assignable to other types unless unioned.
- **`void`** — function return with no useful value (usually `undefined` at runtime).
- **Boxed wrappers** — avoid `String`, `Number`, `Boolean` object types; use primitives.

## 💡 Examples

```ts
const name: string = "Ada";
const age: number = 36;
const ok: boolean = true;
const huge: bigint = 10n ** 20n;
const id: symbol = Symbol("id");

function log(msg: string): void {
  console.log(msg);
}

// strictNullChecks
let maybe: string | null = null;
maybe = "ready";

// Template / string primitives
const greeting: string = `Hello, ${name}`;

// Prefer primitives over wrappers
const bad: String = new String("no"); // avoid
const good: string = "yes";
```

## ⚠️ Pitfalls

- `typeof null === "object"` in JS — use `=== null` checks, not `typeof`.
- `NaN` is a `number`; use `Number.isNaN` for checks.
- Without `strictNullChecks`, `null`/`undefined` sneak into almost every type.
- `void` is not the same as `undefined` in all assignability positions (callback returns).

## 🔗 Related

- [Types](./types.md)
- [Literal types](./literal_types.md)
- [Union types](./union_types.md)
- [Type guards](./type_guards.md)
- [Object types](./object_types.md)
