# Primitives

_Zod · Reference cheat sheet_

---

## 📋 Overview

Zod provides schemas for JS primitives and common string/number refinements (email, URL, int, min/max, etc.).

## 🔧 Core concepts

| Schema | Validates |
| --- | --- |
| `z.string()` | string |
| `z.number()` | number (not `NaN` by default in typical setups) |
| `z.boolean()` | boolean |
| `z.bigint()` | bigint |
| `z.date()` | Date instance |
| `z.undefined()` / `z.null()` | exact undefined / null |
| `z.any()` / `z.unknown()` | anything / unknown |
| `z.literal(x)` | exact value |
| `z.enum([...])` | string union |

| String helpers | Example |
| --- | --- |
| `.min` / `.max` / `.length` | Length bounds |
| `.email` / `.url` / `.uuid` | Formats |
| `.regex` | Custom pattern |
| `.trim` / `.toLowerCase` | String transforms |

## 💡 Examples

**Strings and numbers:**

```ts
const Password = z.string().min(8).max(72);
const Port = z.number().int().min(1).max(65535);
```

**Literals and enums:**

```ts
const Role = z.enum(["admin", "user"]);
const Ok = z.literal("ok");
```

**Optional / nullable:**

```ts
z.string().optional(); // string | undefined
z.string().nullable(); // string | null
z.string().nullish();  // string | null | undefined
```

## ⚠️ Pitfalls

- JSON has no `Date` — use `z.coerce.date()` or ISO strings + transform.
- Empty string is still a string; use `.min(1)` or `.trim().min(1)` for required text.
- `z.number()` rejects numeric strings unless you coerce.

## 🔗 Related

- [objects.md](./objects.md)
- [coerce.md](./coerce.md)
- [refinements.md](./refinements.md)
- [getting_started.md](./getting_started.md)
