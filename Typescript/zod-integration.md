# Zod integration

_TypeScript · Reference cheat sheet_

---

## 📋 Overview

Use Zod schemas as the runtime source of truth, then `z.infer` for TypeScript types. Validate at boundaries (forms, API payloads). See the dedicated [Zod](../Zod/getting_started.md) topic for full API coverage.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `z.object` | Shape schema |
| `safeParse` | Non-throwing validation |
| `z.infer<typeof schema>` | Derived TS type |
| Boundary | Parse untrusted input once |

## 💡 Examples

```ts
import { z } from 'zod';

const User = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});

type User = z.infer<typeof User>;

export function parseUser(data: unknown): User {
  const result = User.safeParse(data);
  if (!result.success) throw new Error(result.error.message);
  return result.data;
}
```

## ⚠️ Pitfalls

- Don’t duplicate types by hand — infer from schemas.
- `parse` throws; prefer `safeParse` in UI code.
- Keep schemas near the boundary that receives data.

## 🔗 Related

- [annotating_basics](annotating_basics.md)
- [Examples/zod_form](Examples/zod_form.md)
- [Zod getting started](../Zod/getting_started.md)
