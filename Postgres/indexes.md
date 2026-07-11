# Indexes

_Postgres · Reference cheat sheet_

---

## 📋 Overview

Indexes speed lookups and enforce uniqueness at the cost of write overhead and storage. Choose type based on query patterns (equality, range, JSON, text search).

## 🔧 Core concepts

| Type | Good for |
| --- | --- |
| B-tree (default) | `=`, `<`, `>`, `BETWEEN`, `ORDER BY` |
| Hash | Equality only (less common) |
| GIN | JSONB, arrays, full-text |
| GiST | Geometry, ranges, some text |
| BRIN | Very large append-only time series |

| Command | Role |
| --- | --- |
| `CREATE INDEX` | Add index |
| `CREATE UNIQUE INDEX` | Uniqueness |
| `CREATE INDEX CONCURRENTLY` | Online create (ops) |
| `DROP INDEX` | Remove |
| `REINDEX` | Rebuild |

## 💡 Examples

**B-tree + partial:**

```sql
CREATE INDEX CONCURRENTLY users_email_lower_idx
  ON users (lower(email));

CREATE INDEX CONCURRENTLY orders_open_idx
  ON orders (created_at)
  WHERE status = 'open';
```

**JSONB GIN:**

```sql
CREATE INDEX CONCURRENTLY events_payload_gin
  ON events USING GIN (payload jsonb_path_ops);
```

**Find unused-ish indexes (heuristic):**

```sql
SELECT * FROM pg_stat_user_indexes ORDER BY idx_scan NULLS FIRST LIMIT 20;
```

## ⚠️ Pitfalls

- Over-indexing slows writes and bloats storage.
- Non-concurrent index builds lock writes — use `CONCURRENTLY` in prod (with caveats).
- Function indexes only help when queries use the same expression.

## 🔗 Related

- [explain_analyze.md](./explain_analyze.md)
- [vacuum_analyze.md](./vacuum_analyze.md)
- [json_jsonb.md](./json_jsonb.md)
- [migrations_ops.md](./migrations_ops.md)
