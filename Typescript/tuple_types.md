# Tuple Types

*_TypeScript · Reference cheat sheet_*

---

## 📖 Overview

Tuples are fixed-length (or variadic) arrays where each position has its own type. Use them for ordered pairs/triples, rest argument lists, and labeled slots for clearer errors.

## 🧩 Core concepts

- **Fixed tuples** — `[string, number]` means length 2 with those element types.
- **Optional elements** — `[string, number?]` allows length 1 or 2.
- **Rest elements** — `[string, ...number[]]` for a head plus homogeneous tail.
- **Labeled tuples** — `[x: number, y: number]` improves hover/error messages (TS 4.0+).
- **`readonly` tuples** — `readonly [string, number]` or `as const` inference.
- **Variadic tuple types** — spread other tuples in type positions (TS 4.0+).

## 💡 Examples

```ts
type Pair = [string, number];
const entry: Pair = ["age", 30];

type Point = [x: number, y: number, z?: number];
const p: Point = [1, 2];

type StringBools = [string, ...boolean[]];
const flags: StringBools = ["id", true, false];

function usePair([key, value]: Pair) {
  return `${key}=${value}`;
}

// as const → readonly tuple of literals
const rgb = [255, 128, 0] as const;
// typeof rgb → readonly [255, 128, 0]

// Variadic
type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B];
type Both = Concat<[1, 2], [3]>; // [1, 2, 3]
```

## ⚠️ Pitfalls

- Open-ended arrays (`string[]`) are not assignable to fixed tuples without care.
- Pushing to a mutable tuple can break length assumptions at runtime — prefer `readonly`.
- Optional tuple elements must appear at the end (before rest).
- Destructuring still needs runtime checks if data comes from untyped sources.

## 🔗 Related

- [Primitive types](./primitive_types.md)
- [Generic types](./generic_types.md)
- [Literal types](./literal_types.md)
- [Utility types](./utility_types.md)
- [Types](./types.md)
