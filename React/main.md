# Main

_React · Reference cheat sheet_

---

## 📋 Overview

`main.tsx` / `main.jsx` (or `index.tsx`) is the **entry module**: it finds the DOM node and mounts the React tree with `createRoot`.

## 🔧 Core concepts

- **`createRoot`** — React 18+ API from `react-dom/client`.
- **`StrictMode`** — double-invokes effects in dev to surface unsafe patterns.
- **Providers** — wrap `App` with router, query client, theme, auth.
- **Legacy** — `ReactDOM.render` is removed in React 19; migrate to `createRoot`.

## 💡 Examples

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";

const el = document.getElementById("root");
if (!el) throw new Error("Root element #root not found");

createRoot(el).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

## ⚠️ Pitfalls

- Mounting twice on the same node without `root.unmount()`.
- Missing `#root` in HTML → silent or thrown failure.
- Putting heavy logic in `main` instead of `App` / feature modules.

## 🔗 Related

- [root.md](./root.md) — root API details
- [file_structure.md](./file_structure.md) — project layout
- [pages.md](./pages.md) — routed pages
- [import_export.md](./import_export.md) — entry imports
