# Performance

_React · Reference cheat sheet_

---

## 📋 Overview

Optimize after measuring (React DevTools Profiler, browser performance). Biggest wins: fewer unnecessary re-renders, smaller JS bundles, virtualized long lists, and concurrent features for responsiveness. Avoid premature `memo` everywhere.

## 🔧 Core concepts

| Lever | Technique |
| --- | --- |
| Re-renders | `memo`, stable props, split context |
| Bundles | `lazy` + `Suspense`, route splitting |
| Lists | windowing (`react-window` / FlashList on RN) |
| Urgency | `useTransition` / `useDeferredValue` |
| Images | correct size, lazy load, modern formats |
| State | lift only as high as needed; colocate |

Profile → find slow commits → fix the cause.

## 💡 Examples

```tsx
import { lazy, Suspense, memo, useCallback, useState } from "react";

const HeavyChart = lazy(() => import("./HeavyChart"));

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

export function Dashboard({ ids }: { ids: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const onSelect = useCallback((id: string) => setSelected(id), []);

  return (
    <>
      {ids.map((id) => (
        <Row key={id} id={id} onSelect={onSelect} />
      ))}
      <Suspense fallback={<p>Loading chart…</p>}>
        {selected ? <HeavyChart id={selected} /> : null}
      </Suspense>
    </>
  );
}
```

## ⚠️ Pitfalls

- Optimizing without a profile.
- Giant context values updating every keystroke.
- Anonymous components defined inside parents (`function Row` inside render).
- Derived state duplicated instead of computing during render.
- Huge lists without virtualization.

## 🔗 Related

- [memo.md](./memo.md) — skip renders
- [useMemo.md](./useMemo.md) / [useCallback.md](./useCallback.md)
- [useTransition.md](./useTransition.md) — responsiveness
- [suspense.md](./suspense.md) — code split
- [keys_lists.md](./keys_lists.md) — list identity
