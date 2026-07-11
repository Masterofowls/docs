# Refinements

_Zod · Reference cheat sheet_

---

## 📋 Overview

Refinements add custom predicates and cross-field checks that built-in validators cannot express — passwords match, date ranges, XOR fields, etc.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `.refine(fn, message)` | Extra boolean check |
| `.superRefine` | Multiple issues via `ctx.addIssue` |
| `.refine` on objects | Cross-field validation |
| Second arg | Custom error message / path |

| Pattern | Example use |
| --- | --- |
| Confirm password | `password === confirm` |
| Conditional required | If `type==='card'` require `cvv` |
| Business rules | Unique SKU format |

## 💡 Examples

**Simple refine:**

```ts
const Even = z.number().refine((n) => n % 2 === 0, {
  message: "Expected even number",
});
```

**Cross-field:**

```ts
const Signup = z
  .object({
    password: z.string().min(8),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });
```

**superRefine:**

```ts
z.string().superRefine((val, ctx) => {
  if (val.includes(" ")) {
    ctx.addIssue({ code: "custom", message: "No spaces" });
  }
});
```

## ⚠️ Pitfalls

- Refinements run after base parsing — coercions/transforms order matters.
- Forgetting `path` makes UI error mapping harder.
- Heavy async refinements (DB uniqueness) belong in an app layer; keep schemas fast when possible (Zod supports async refine carefully).

## 🔗 Related

- [transforms.md](./transforms.md)
- [objects.md](./objects.md)
- [safeparse.md](./safeparse.md)
- [primitives.md](./primitives.md)
