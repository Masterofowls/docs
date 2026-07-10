# Strict Mode

_React · Reference cheat sheet_

---

## 📋 Overview

`<StrictMode>` enables extra development checks: double-invoking render/effects (React 18+), warning on deprecated APIs, and detecting unsafe lifecycles. It does not affect production builds. Prefer wrapping the app root during development.

## 🔧 Core concepts

- **Dev-only** — no production behavior change.
- **Double effects** — mount → unmount → remount to surface missing cleanups.
- **Double render** — helps find impure renders.
- **Nested** — can wrap subsections.
- **Not a performance tool** — diagnostics only.

## 💡 Examples

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

**Effect that survives Strict Mode:**

```tsx
useEffect(() => {
  const ac = new AbortController();
  fetch("/api", { signal: ac.signal }).then(/* ... */);
  return () => ac.abort(); // required — runs on simulated remount
}, []);
```

## ⚠️ Pitfalls

- Thinking double-fetch in dev is a production bug—check cleanup first.
- Impure renders (Math.random in render, mutating props)—Strict Mode exposes them.
- Removing Strict Mode to “fix” bugs instead of fixing cleanups.
- Expecting warnings for all async race conditions—it won’t catch everything.

## 🔗 Related

- [useEffect.md](./useEffect.md) — cleanup
- [root.md](./root.md) — createRoot
- [concurrent.md](./concurrent.md) — concurrent features
- [testing.md](./testing.md) — act / cleanup
- [hooks.md](./hooks.md) — purity
