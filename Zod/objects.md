# Objects

_Zod · Reference cheat sheet_

---

## 📋 Overview

`z.object` defines keyed shapes with required/optional fields, nested objects, and helpers for picking, omitting, extending, and strictness.

## 🔧 Core concepts

| API | Effect |
| --- | --- |
| `z.object({...})` | Define shape |
| `.partial()` | All keys optional |
| `.required()` | All keys required |
| `.pick` / `.omit` | Subset keys |
| `.extend` | Add fields |
| `.merge` | Combine objects |
| `.strict()` | Reject unknown keys |
| `.passthrough()` | Keep unknown keys |
| `.strip()` | Drop unknown keys (default) |

## 💡 Examples

**Nested object:**

```ts
const Address = z.object({
  city: z.string(),
  zip: z.string().min(3),
});

const Person = z.object({
  name: z.string(),
  address: Address,
});
```

**Strict vs strip:**

```ts
z.object({ id: z.string() }).strict().parse({ id: "1", extra: true });
// throws — unknown key
```

**Pick / extend:**

```ts
const User = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
});
const PublicUser = User.omit({ password: true });
const Admin = User.extend({ role: z.literal("admin") });
```

## ⚠️ Pitfalls

- Default object schemas strip unknown keys — fine for DTOs, surprising for proxies.
- `.optional()` on a field allows missing key; distinguish from `.nullable()`.
- Deep partials need care — `.partial()` is shallow unless you build recursively.

## 🔗 Related

- [primitives.md](./primitives.md)
- [arrays_tuples.md](./arrays_tuples.md)
- [infer_types.md](./infer_types.md)
- [transforms.md](./transforms.md)
