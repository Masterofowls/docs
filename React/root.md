# Root

_React · Reference cheat sheet_

---

## 📋 Overview

The **root** is the React 18+ mount point created with `createRoot(domNode)`. It owns the tree: `render`, `unmount`, and concurrent features.

## 🔧 Core concepts

- **`createRoot(container)`** — returns a root object.
- **`root.render(<App />)`** — mount or update the tree.
- **`root.unmount()`** — tear down listeners and DOM React owns.
- **Hydration** — `hydrateRoot` for SSR; match server HTML.

## 💡 Examples

```tsx
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);

// Later (e.g. microfrontend teardown):
// root.unmount();
```

```tsx
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";

hydrateRoot(document.getElementById("root")!, <App />);
```

## ⚠️ Pitfalls

- Calling `createRoot` twice on the same node without unmounting.
- Using deprecated `ReactDOM.render` on React 18+.
- Hydration mismatches (different server vs client markup) cause warnings and remounts.

## 🔗 Related

- [main.md](./main.md) — typical entry usage
- [render.md](./render.md) — what gets rendered
- [file_structure.md](./file_structure.md) — project entry
- [layout.md](./layout.md) — top-level UI
