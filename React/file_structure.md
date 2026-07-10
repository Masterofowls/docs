# File structure

_React · Reference cheat sheet_

---

## 📋 Overview

Organize by feature or route, keep components small, and colocate styles/tests. Exact layout depends on Vite, Next.js, or CRA — patterns below are common.

## 🔧 Core concepts

- **Entry** — `main.tsx` / `index.tsx` mounts the root.
- **App shell** — `App.tsx` for providers, layout, routes.
- **Features** — `features/auth/`, `features/cart/` with local components.
- **Shared** — `components/`, `hooks/`, `lib/`, `types/`.
- **Pages/routes** — framework-specific (`pages/`, `app/`, `routes/`).

## 💡 Examples

```text
src/
  main.tsx
  App.tsx
  components/
    Button.tsx
    Button.module.css
  features/
    todos/
      TodoList.tsx
      useTodos.ts
      api.ts
  hooks/
    useMediaQuery.ts
  lib/
    http.ts
  pages/
    HomePage.tsx
    TodoPage.tsx
```

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## ⚠️ Pitfalls

- Deep `../../../` imports — use path aliases (`@/`).
- Giant `components/` dumping ground — prefer feature folders.
- Mixing business logic into presentational files without clear boundaries.

## 🔗 Related

- [main.md](./main.md) — entry point
- [root.md](./root.md) — root mount
- [pages.md](./pages.md) — page components
- [import_export.md](./import_export.md) — modules
