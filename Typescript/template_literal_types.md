# Template literal types

_TypeScript · Reference cheat sheet_

---

## 📋 Overview

Template literal types build string types from unions and literals using `` `${A}${B}` `` syntax. They power event names, CSS units, route paths, and string manipulation utilities (`Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`).

## 🔧 Core concepts

- **Interpolation** — unions distribute: `` `on${"Click" | "Focus"}` `` → `"onClick" | "onFocus"`.
- **Intrinsic helpers** — `Uppercase<S>`, `Lowercase<S>`, `Capitalize<S>`, `Uncapitalize<S>`.
- **Inference** — pattern match with `infer` inside template positions.
- **Constraints** — `extends `${string}`` / branded path patterns.
- **Mapped keys** — `` { [K in keyof T as `get${Capitalize<K & string>}`]: … } ``.

## 💡 Examples

```ts
type HttpMethod = "get" | "post" | "put";
type Endpoint = `/api/${string}`;
type Route = `${HttpMethod} ${Endpoint}`;
// "get /api/..." | "post /api/..." | ...

type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickHandler = EventName<"click">; // "onClick"

type PropEvent<T> = {
  [K in keyof T & string as EventName<K>]?: (value: T[K]) => void;
};

type CssUnit = `${number}px` | `${number}rem` | `${number}%`;

type ExtractId<S extends string> =
  S extends `user:${infer Id}` ? Id : never;
type U = ExtractId<"user:42">; // "42"

type DotPath = `${string}.${string}`;
function getByPath(obj: object, path: DotPath) {
  /* ... */
}
```

```ts
// Widen carefully — plain string breaks literal unions
type Bad = `${string}-id`; // effectively string-ish patterns
```

## ⚠️ Pitfalls

- Large distributed unions explode compile time — keep unions small.
- `` `${number}` `` allows any number string pattern, not only integers.
- Template types are erased — runtime strings still need validation.
- `Capitalize` only affects the first character type-wise.
- Don’t use for complex parsing — prefer Zod / regex at runtime.

## 🔗 Related

- [literal_types.md](./literal_types.md)
- [infer.md](./infer.md)
- [conditional_types.md](./conditional_types.md)
- [mapped_types.md](./mapped_types.md)
- [satisfies.md](./satisfies.md)
