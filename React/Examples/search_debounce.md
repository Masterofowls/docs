# Search Debounce

_React · Example / how-to_

---

## 📋 Overview

Debounce a search input so fetches run after the user pauses typing.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Local query | Immediate input |
| Debounced value | Effect dependency |
| Abort | Cancel in-flight |

## 💡 Examples

```tsx
import { useEffect, useState } from 'react';

function useDebounced<T>(value: T, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

export function Search() {
  const [q, setQ] = useState('');
  const debounced = useDebounced(q, 300);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!debounced) {
      setResults([]);
      return;
    }
    const ac = new AbortController();
    fetch(`/api/search?q=${encodeURIComponent(debounced)}`, { signal: ac.signal })
      .then((r) => r.json())
      .then((data) => setResults(data.items ?? []))
      .catch(() => {});
    return () => ac.abort();
  }, [debounced]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search"
        aria-label="Search"
      />
      <ul>{results.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
```

## ⚠️ Pitfalls

- Debounce delay too high feels laggy; 200–400ms is common.
- Always abort on change/unmount.

## 🔗 Related

- [Data fetching](../data_fetching.md)
- [useEffect](../useEffect.md)
