# useCallback

_React · Reference cheat sheet_

---

## 📋 Overview

`useCallback(fn, deps)` returns a memoized function identity until dependencies change. Useful when passing callbacks to memoized children, effect deps, or libraries that compare by reference.

## 🔧 Core concepts

- **Identity** — same function reference across renders if deps unchanged.
- **Pair with `memo`** — child skips re-render if props are equal.
- **Effect deps** — stable callbacks avoid effect churn.
- **Not free** — only when measured or required by API contracts.

## 💡 Examples

```tsx
import { memo, useCallback, useState } from "react";

const Row = memo(function Row({
  id,
  onSelect,
}: {
  id: string;
  onSelect: (id: string) => void;
}) {
  return (
    <button type="button" onClick={() => onSelect(id)}>
      {id}
    </button>
  );
});

export function List({ ids }: { ids: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const onSelect = useCallback((id: string) => setSelected(id), []);

  return (
    <div>
      {ids.map((id) => (
        <Row key={id} id={id} onSelect={onSelect} />
      ))}
      <p>Selected: {selected}</p>
    </div>
  );
}
```

**Functional updates avoid deps:**

```tsx
const increment = useCallback(() => setCount((c) => c + 1), []);
```

## ⚠️ Pitfalls

- Wrapping every function “just in case”.
- Omitting deps that the callback closes over → stale closures.
- Expecting `useCallback` alone to prevent re-renders—child must be `memo` (or equivalent).
- Putting unstable objects in deps.

## 🔗 Related

- [useMemo.md](./useMemo.md) — value memoization
- [memo.md](./memo.md) — pure components
- [useEffect.md](./useEffect.md) — dependency arrays
- [performance.md](./performance.md) — profiling
- [hooks.md](./hooks.md) — rules
