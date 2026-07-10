# useDeferredValue

_React · Reference cheat sheet_

---

## 📋 Overview

`useDeferredValue(value)` returns a deferred version of `value` that may “lag behind” during urgent updates. Keep showing the latest input while expensive children render with the deferred value.

## 🔧 Core concepts

- **Lagging copy** — UI can show `value` immediately and `deferred` for heavy work.
- **vs useTransition** — defer a prop/value vs wrap a state update.
- **Concurrent** — React may interrupt rendering the deferred tree.
- **Pending UX** — compare `value !== deferred` to show a stale indicator.

## 💡 Examples

```tsx
import { useDeferredValue, useMemo, useState } from "react";

function SlowList({ query }: { query: string }) {
  const items = useMemo(() => {
    // expensive filter/render
    return Array.from({ length: 5000 }, (_, i) => `${query}-${i}`);
  }, [query]);
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        <SlowList query={deferredQuery} />
      </div>
    </div>
  );
}
```

## ⚠️ Pitfalls

- Deferring values that must stay in sync for correctness (validation, submit payload).
- Using as a substitute for debouncing network requests—still debounce fetches.
- Memoizing children incorrectly so deferred updates don’t help.
- Ignoring stale UI—users may click outdated rows; disable or mark pending.

## 🔗 Related

- [useTransition.md](./useTransition.md) — startTransition
- [concurrent.md](./concurrent.md) — concurrent rendering
- [performance.md](./performance.md) — optimization
- [memo.md](./memo.md) — skip re-renders
- [hooks.md](./hooks.md) — rules
