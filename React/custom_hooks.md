# Custom hooks

_React · Reference cheat sheet_

---

## 📋 Overview

Custom hooks are functions named `useXxx` that call other hooks to reuse stateful logic (not JSX). Extract repeated effect/state patterns; keep components focused on rendering.

## 🔧 Core concepts

- **Naming** — must start with `use` so lint rules apply.
- **Composition** — call `useState`, `useEffect`, other custom hooks.
- **Return** — values, setters, or tuples/objects—be consistent.
- **No shared state** — each call gets independent state (unless you use context/store inside).
- **Rules of Hooks** — still top-level only.

## 💡 Examples

```tsx
import { useCallback, useEffect, useState } from "react";

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  const setTrue = useCallback(() => setOn(true), []);
  const setFalse = useCallback(() => setOn(false), []);
  return { on, toggle, setTrue, setFalse } as const;
}
```

```tsx
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
```

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const ac = new AbortController();
    fetch(url, { signal: ac.signal })
      .then((r) => r.json())
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e);
      });
    return () => ac.abort();
  }, [url]);
  return { data, error };
}
```

## ⚠️ Pitfalls

- Returning new object literals every render without need—destructure or memoize if passed deep.
- Hiding too much: hooks that fetch + cache + toast + navigate become untestable.
- Conditional hook calls inside custom hooks.
- Forgetting cleanup (listeners, abort).

## 🔗 Related

- [hooks.md](./hooks.md) — overview
- [useEffect.md](./useEffect.md) — effects
- [useContext.md](./useContext.md) — shared subscriptions
- [testing.md](./testing.md) — testing hooks
- [performance.md](./performance.md) — stable returns
