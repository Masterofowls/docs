# Literal Types

*_TypeScript · Reference cheat sheet_*

---

## 📖 Overview

Literal types represent exact values (`"left"`, `42`, `true`) rather than the general primitive. Combined with unions they model finite sets of allowed values — ideal for flags, modes, and discriminants.

## 🧩 Core concepts

- **String / number / boolean / bigint literals** — e.g. `"admin"`, `0`, `true`, `1n`.
- **Literal unions** — `"a" | "b" | "c"` as a closed set.
- **`as const`** — widens inference to the narrowest literal / readonly tuple / readonly object.
- **Template literal types** — pattern types like `` `on${Capitalize<S>}` `` (TS 4.1+).
- **Widening** — `let x = "hi"` is `string`; `const x = "hi"` is `"hi"`.

## 💡 Examples

```ts
type Direction = "north" | "south" | "east" | "west";

function move(dir: Direction) {
  /* ... */
}
move("north");
// move("up"); // error

const role = "admin" as const; // type: "admin"

const config = {
  mode: "dark",
  retries: 3,
} as const;
// typeof config.mode → "dark"

// Template literal types
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickHandler = EventName<"click">; // "onClick"

// Numeric literals
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
```

## ⚠️ Pitfalls

- Mutable `let` widens literals to the base primitive unless annotated.
- Object properties widen unless `as const` or an explicit type is given.
- Excessively large literal unions hurt readability and editor performance.
- Template literal types can explode combinatorially — keep patterns small.

## 🔗 Related

- [Union types](./union_types.md)
- [Primitive types](./primitive_types.md)
- [Conditional types](./conditional_types.md)
- [Mapped types](./mapped_types.md)
- [Types](./types.md)
