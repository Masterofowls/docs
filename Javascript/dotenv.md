# dotenv

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

In Node.js, configuration often lives in environment variables via `process.env`. The popular `dotenv` package loads a `.env` file into `process.env` at startup. Never commit secrets; use `.env.example` for templates.

```bash
npm install dotenv
```

## 🔧 Core concepts

- **`process.env.KEY`**: always a string (or `undefined` if unset).
- **`dotenv.config()`**: reads `.env` from cwd by default; does not overwrite existing env vars.
- **`.env` syntax**: `KEY=value`, comments with `#`, optional quotes.
- **Precedence**: real environment (shell, CI, host) wins over `.env` unless you opt into override.
- **Validation**: check required keys early and exit with a clear error.

## 💡 Examples

```js
// CommonJS
require("dotenv").config();

// ESM (early in entry file)
import "dotenv/config";
// or
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const port = Number(process.env.PORT ?? "3000");
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

// Optional override (use carefully)
dotenv.config({ override: true });

// Typed-ish helper
function requireEnv(name) {
  const v = process.env[name];
  if (v === undefined || v === "") {
    throw new Error(`Missing env: ${name}`);
  }
  return v;
}

const apiKey = requireEnv("API_KEY");
```

```env
# .env
PORT=9000
DATABASE_URL=postgres://localhost:5432/app
# FEATURE_FLAG=true
```

## ⚠️ Pitfalls

- `process.env` values are strings: `"false"` is truthy; parse booleans/numbers explicitly.
- `dotenv` does not magically load in every worker/child — call config in each process entry.
- Do not rely on `.env` in production if the platform injects env vars (Render, Netlify, etc.).
- Avoid putting secrets in client bundles; `dotenv` is a Node/server concern.
- Empty `KEY=` sets `process.env.KEY` to `""`, not `undefined`.

## 🔗 Related

- [process](process.md) — `process.env`, `argv`, `exit`
- [fs](fs.md) — reading config files manually
- [JSON](json.md) — config as JSON instead of `.env`
- [CommonJS modules](modules_commonjs.md) — `require("dotenv")`
- [ESM import/export](import_export.md) — `import "dotenv/config"`
