# Coerce

_Zod · Reference cheat sheet_

---

## 📋 Overview

`z.coerce` converts inputs before validation — useful for query strings, form fields, and env vars where everything arrives as strings.

## 🔧 Core concepts

| Schema | Coerces via |
| --- | --- |
| `z.coerce.string()` | `String(value)` |
| `z.coerce.number()` | `Number(value)` |
| `z.coerce.boolean()` | Boolean conversion (careful!) |
| `z.coerce.bigint()` | BigInt |
| `z.coerce.date()` | `new Date(value)` |

| Good fit | Risky fit |
| --- | --- |
| `"42"` → number | Boolean: `"false"` is truthy in JS |
| ISO date strings | Invalid dates becoming Invalid Date |
| Env PORT | Objects coerced to `"[object Object]"` |

## 💡 Examples

**Query params:**

```ts
const Query = z.object({
  page: z.coerce.number().int().min(1).default(1),
  q: z.string().optional(),
});
Query.parse({ page: "2", q: "zod" });
```

**Env:**

```ts
const Env = z.object({
  PORT: z.coerce.number().default(9000),
  DEBUG: z.coerce.boolean().default(false),
});
```

**Dates:**

```ts
z.coerce.date().parse("2026-07-11T00:00:00.000Z");
```

## ⚠️ Pitfalls

- `z.coerce.boolean()` treats any non-empty string as `true` — including `"false"`. Prefer `z.enum(['true','false'])` + transform for forms.
- Coercion can hide bugs by accepting unexpected types.
- Prefer explicit transforms when conversion rules are domain-specific.

## 🔗 Related

- [primitives.md](./primitives.md)
- [transforms.md](./transforms.md)
- [safeparse.md](./safeparse.md)
- [getting_started.md](./getting_started.md)
