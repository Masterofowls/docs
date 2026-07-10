# Index signatures

_TypeScript · Reference cheat sheet_

---

## 📋 Overview

Index signatures type objects used as maps: `{ [key: string]: V }`. Prefer `Record<K, V>`, `Map`, or explicit keys when the key set is known. Combine carefully with declared properties — values must be assignable to the index type.

## 🔧 Core concepts

- **String / symbol / number / template** — `[k: string]: T`, `[k: number]: T`, `` [k: `id-${string}`]: T ``.
- **Compatibility** — every explicit property must match the index value type.
- **`Record<K, V>`** — mapped type sugar for key unions.
- **Readonly index** — `[k: string]: readonly T[]` / `Readonly<Record<…>>`.
- **`noUncheckedIndexedAccess`** — indexed reads include `| undefined`.

## 💡 Examples

```ts
interface Dict {
  [key: string]: number;
  length: number; // OK — number assignable to number
  // name: string; // error — string not assignable to number
}

const scores: Record<string, number> = { alice: 10, bob: 8 };
scores.carol = 12;

type IdMap = { [id: `user-${string}`]: { name: string } };
const users: IdMap = {
  "user-1": { name: "Ada" },
};

// Number index (arrays / array-like)
interface StringArray {
  [index: number]: string;
}

// Prefer known keys when possible
type Role = "admin" | "user";
const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "billing"],
  user: ["read"],
};

function get(map: Record<string, number>, key: string) {
  return map[key]; // number | undefined if noUncheckedIndexedAccess
}
```

## ⚠️ Pitfalls

- String index signatures weaken `keyof` to include `string`.
- Mixing required props with a broad index often forces props to `string | …`.
- Prefer `Map<K, V>` for frequent add/delete and non-string keys.
- Empty object `{}` is not a safe “any key” type — use `Record` or index sig.
- Numeric keys are coerced to strings at runtime — type them intentionally.

## 🔗 Related

- [object_types.md](./object_types.md)
- [interfaces.md](./interfaces.md)
- [mapped_types.md](./mapped_types.md)
- [keyof_typeof.md](./keyof_typeof.md)
- [strict_options.md](./strict_options.md)
