# Data Fetching

_React · Reference cheat sheet_

---

## 📋 Overview

Client fetching usually lives in `useEffect` + state, a custom hook, or a library (React Query/SWR). Track `loading` / `error` / `data`; cancel or ignore stale responses.

## 🔧 Core concepts

| Concern | Approach |
| --- | --- |
| Mount fetch | `useEffect` + abort |
| Cache / revalidate | SWR / Query |
| Derived UI | status enum |
| Auth header | shared client |

## 💡 Examples

**Abortable fetch hook:**

```tsx
import { useEffect, useState } from 'react';

export function useJson<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    fetch(url, { signal: ac.signal })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(setData)
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e);
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [url]);

  return { data, error, loading };
}
```

## ⚠️ Pitfalls

- Race conditions when `url` changes quickly — abort or ignore stale.
- Fetching in render is illegal — side effects belong in effects/libs.
- Don't block the whole tree if only a panel needs data — suspense boundaries help.

## 🔗 Related

- [useEffect](useEffect.md)
- [Custom hooks](custom_hooks.md)
- [Fetch list example](Examples/fetch_list.md)
- [Testing](testing.md)
