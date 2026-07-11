# Infer Types

_Zod · Reference cheat sheet_

---

## 📋 Overview

Zod schemas are a single source of truth: validate at runtime and derive TypeScript types with `z.infer`, `z.input`, and `z.output`.

## 🔧 Core concepts

| Helper | Yields |
| --- | --- |
| `z.infer<typeof S>` | Output type (usual choice) |
| `z.input<typeof S>` | Type before transforms |
| `z.output<typeof S>` | Type after transforms |
| `z.infer` on objects | Nested object types |

| Pattern | Benefit |
| --- | --- |
| Schema-first | No drift between types and validators |
| Shared DTO module | API + client agree |
| Env schema | Typed `process.env` |

## 💡 Examples

**Basic infer:**

```ts
const User = z.object({
  id: z.string(),
  email: z.string().email(),
});
type User = z.infer<typeof User>;
// { id: string; email: string }
```

**Input vs output:**

```ts
const S = z.string().transform((s) => s.length);
type In = z.input<typeof S>;   // string
type Out = z.output<typeof S>; // number
```

**Function boundary:**

```ts
function save(user: z.infer<typeof User>) {
  /* ... */
}
```

## ⚠️ Pitfalls

- Don't hand-write a duplicate `interface` that can drift — infer from the schema.
- Optional fields (`?`) vs `| undefined` differ slightly in TS excess property checks.
- Circular types need `z.lazy` — plain infer won't recurse infinitely by itself.

## 🔗 Related

- [transforms.md](./transforms.md)
- [objects.md](./objects.md)
- [safeparse.md](./safeparse.md)
- [getting_started.md](./getting_started.md)
