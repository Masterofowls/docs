# useRef

_React · Reference cheat sheet_

---

## 📋 Overview

`useRef(initial)` returns a stable `{ current }` box that persists across renders without causing re-renders when mutated. Use for DOM nodes, timer IDs, previous values, and imperative handles—not for UI state.

## 🔧 Core concepts

- **Mutable box** — `ref.current = x` does not trigger render.
- **DOM refs** — `ref={elRef}` on host components; read after commit.
- **Same identity** — ref object is stable for the component lifetime.
- **vs state** — state → re-render; ref → silent store.
- **Callback refs** — function form when you need attach/detach logic.

## 💡 Examples

```tsx
import { useEffect, useRef } from "react";

export function TextField() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

**Previous value / interval:**

```tsx
function usePrevious<T>(value: T) {
  const ref = useRef<T>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function Ticker() {
  const idRef = useRef<number | null>(null);
  useEffect(() => {
    idRef.current = window.setInterval(() => {}, 1000);
    return () => {
      if (idRef.current != null) window.clearInterval(idRef.current);
    };
  }, []);
  return null;
}
```

## ⚠️ Pitfalls

- Reading/writing `ref.current` during render for values that drive UI—use state.
- Assuming ref is set during first render of a child—refs populate after commit.
- Storing JSX in refs instead of state.
- Forgetting to clear timers/subscriptions stored on refs.

## 🔗 Related

- [useEffect.md](./useEffect.md) — sync after paint
- [forwardRef.md](./forwardRef.md) — expose refs to parents
- [useLayoutEffect.md](./useLayoutEffect.md) — measure DOM before paint
- [hooks.md](./hooks.md) — hook rules
- [forms.md](./forms.md) — uncontrolled inputs
