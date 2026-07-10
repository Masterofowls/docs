# ORDER BY and LIMIT

_SQL · Reference cheat sheet_

---

## 📋 Overview

`ORDER BY` sorts result rows; `LIMIT`/`OFFSET` (or `FETCH FIRST` / `TOP`) page results. Stable pagination needs a deterministic order key. Dialects differ: Postgres/`MySQL` use `LIMIT`; SQL Server uses `TOP`/`OFFSET FETCH`.

## 🔧 Core concepts

- **Sort keys** — columns or expressions; `ASC`/`DESC`; multi-key sorts.
- **NULL order** — Postgres `NULLS FIRST|LAST`; MySQL NULLs first in ASC by default.
- **LIMIT / OFFSET** — `LIMIT count OFFSET skip` (MySQL/Postgres).
- **FETCH** — standard: `OFFSET n ROWS FETCH NEXT m ROWS ONLY`.
- **Determinism** — add unique tie-breaker (e.g. `id`) for stable pages.

## 💡 Examples

```sql
SELECT id, email, created_at
FROM users
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 40;

-- Keyset pagination (preferred over deep OFFSET)
SELECT id, email, created_at
FROM users
WHERE (created_at, id) < ('2026-07-01 12:00:00+00', 12345)
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- Standard FETCH (Postgres)
SELECT * FROM products
ORDER BY price
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;

-- MySQL
SELECT * FROM products ORDER BY price LIMIT 10 OFFSET 0;
```

## ⚠️ Pitfalls

- Large `OFFSET` is slow — prefer keyset/seek pagination.
- `ORDER BY` without index can sort on disk — check `EXPLAIN`.
- Non-deterministic order without unique keys → duplicate/missing rows across pages.
- Selecting `*` with random order (`ORDER BY random()`) is expensive.
- `LIMIT` without `ORDER BY` returns an arbitrary set.

## 🔗 Related

- [select.md](./select.md)
- [nulls.md](./nulls.md)
- [indexes.md](./indexes.md)
- [window_functions.md](./window_functions.md)
- [explain_analyze.md](./explain_analyze.md)
- [distinct_group_by.md](./distinct_group_by.md)
