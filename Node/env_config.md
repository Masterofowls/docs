# Environment & Config

_Node.js · Reference cheat sheet_

---

## 📋 Overview

Configure Node apps with environment variables, optionally loaded from `.env` files via `dotenv` or platform secrets. Validate required keys at startup.

## 🔧 Core concepts

| Source | Use |
| --- | --- |
| `process.env` | Primary config bag |
| `.env` + dotenv | Local development |
| Host secrets | Production (Vercel, Docker, K8s, etc.) |
| `NODE_ENV` | `development` / `production` / `test` |

| Practice | Why |
| --- | --- |
| Fail fast | Crash if required vars missing |
| No secrets in repo | Use `.env.example` templates only |
| Typed config module | Single parse point |

## 💡 Examples

**Fail-fast config:**

```js
function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const config = {
  port: Number(process.env.PORT || 9000),
  databaseUrl: required("DATABASE_URL"),
};
```

**dotenv (dev):**

```js
import "dotenv/config";
```

**`.env.example`:**

```bash
PORT=9000
DATABASE_URL=postgres://user:pass@localhost:5432/app
```

## ⚠️ Pitfalls

- `process.env` values are strings — `PORT` needs `Number(...)`.
- Loading `.env` in production can accidentally override platform secrets if misordered.
- Never log raw env objects — they often contain credentials.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [error_handling.md](./error_handling.md)
- [packaging.md](./packaging.md)
- [Next.js/env.md](../Next.js/env.md)
