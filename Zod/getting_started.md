# Getting Started with Zod

_Zod · Reference cheat sheet_

---

## 📋 Overview

Zod is a TypeScript-first schema library for parsing and validating data at runtime while inferring static types. Common for API payloads, env config, and forms.

## 🔧 Core concepts

| Idea | Meaning |
| --- | --- |
| Schema | Declarative description of a value shape |
| Parse | Validate + return typed data (or throw) |
| Safe parse | Validate without throwing |
| Infer | Extract TS type from a schema |
| Transform | Map input → output during parse |

**Install:**

```bash
npm install zod
```

| Entry | Import |
| --- | --- |
| Zod 3 | `import { z } from "zod"` |
| Schemas | `z.string()`, `z.object({...})`, … |

## 💡 Examples

**First schema:**

```ts
import { z } from "zod";

const User = z.object({
  email: z.string().email(),
  age: z.number().int().positive(),
});

const user = User.parse({ email: "a@b.co", age: 30 });
```

**Type inference:**

```ts
type User = z.infer<typeof User>;
```

**Env-style parse:**

```ts
const Env = z.object({ PORT: z.coerce.number().default(9000) });
const env = Env.parse(process.env);
```

## ⚠️ Pitfalls

- `parse` throws `ZodError` — use `safeParse` at trust boundaries if you prefer Result-style control flow.
- Zod validates runtime values; it does not replace compile-time TS checking alone.
- Major version APIs differ (Zod 3 vs 4) — match docs to your installed version.

## 🔗 Related

- [primitives.md](./primitives.md)
- [objects.md](./objects.md)
- [safeparse.md](./safeparse.md)
- [infer_types.md](./infer_types.md)
- [glossary.md](./glossary.md)
