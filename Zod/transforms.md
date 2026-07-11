# Transforms

_Zod · Reference cheat sheet_

---

## 📋 Overview

Transforms change values during parsing: trim strings, normalize casing, map DTOs, or convert types. Output types can differ from input types.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `.transform(fn)` | Map value after validation |
| `.pipe(schema)` | Feed output into another schema |
| `z.preprocess` | Run before validation |
| Input vs output | `z.input<typeof S>` / `z.output<typeof S>` |

| Use | Example |
| --- | --- |
| Normalize | trim + lowercase email |
| Defaults | fill missing fields |
| DTO mapping | rename keys |

## 💡 Examples

**Trim email:**

```ts
const Email = z
  .string()
  .trim()
  .toLowerCase()
  .email();
```

**Transform shape:**

```ts
const Raw = z.object({ user_id: z.string() }).transform((d) => ({
  userId: d.user_id,
}));
```

**Pipe:**

```ts
const IsoDate = z.string().datetime().pipe(z.coerce.date());
```

## ⚠️ Pitfalls

- Transforms run on success path — failed refinements skip later transforms.
- Inferred `z.infer` is the *output* type; use `z.input` when typing forms that submit raw values.
- Overusing preprocess can hide invalid data instead of failing loudly.

## 🔗 Related

- [coerce.md](./coerce.md)
- [infer_types.md](./infer_types.md)
- [refinements.md](./refinements.md)
- [objects.md](./objects.md)
