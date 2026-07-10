# useMemo

_React · Reference cheat sheet_

---

## 📋 Overview

`useMemo(() => compute(a, b), [a, b])` caches a computed value until dependencies change. Use for expensive pure calculations or to keep referential equality for children/context—not as a default optimization.

## 🔧 Core concepts

- **Signature** — `const memo = useMemo(factory, deps)`.
- **Deps** — recompute when any dep fails `Object.is`.
- **React 19 / Compiler** — compiler may memoize automatically; manual useMemo still valid for guarantees.
- **vs useCallback** — memoize value vs memoize function (`useCallback(fn, deps)` ≈ `useMemo(() => fn, deps)`).

## 💡 Examples

```tsx
import { useMemo, useState } from "react";

export function FilteredList({ items, query }: { items: string[]; query: string }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => item.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <ul>
      {filtered.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```

**Stable context value:**

```tsx
const value = useMemo(() => ({ user, logout }), [user, logout]);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
```

## ⚠️ Pitfalls

- Memoizing cheap work—overhead can exceed savings.
- Missing deps → stale values; extra deps → useless recomputes.
- Mutating the memoized object/array in place.
- Using `useMemo` to “hide” side effects—factory must be pure.

## 🔗 Related

- [useCallback.md](./useCallback.md) — function identity
- [memo.md](./memo.md) — skip child re-renders
- [performance.md](./performance.md) — when to optimize
- [useContext.md](./useContext.md) — stable provider values
- [hooks.md](./hooks.md) — rules
