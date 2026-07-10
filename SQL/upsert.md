# UPSERT

_SQL · Reference cheat sheet_

---

## 📋 Overview

UPSERT inserts a row or updates it when a conflict occurs (unique/PK violation). Postgres uses `INSERT … ON CONFLICT`; MySQL uses `ON DUPLICATE KEY UPDATE` or `REPLACE`. Choose conflict targets carefully to avoid silent wrong updates.

## 🔧 Core concepts

- **Conflict target** — constraint name or column list that defines uniqueness.
- **DO NOTHING / DO UPDATE** — ignore vs merge (Postgres).
- **Excluded row** — Postgres `EXCLUDED.col` is the would-be insert.
- **MySQL** — `VALUES(col)` (older) / aliases (8.0.19+) for new values.
- **Idempotency** — natural keys + upsert for retries.

## 💡 Examples

```sql
-- Postgres
INSERT INTO users (email, name)
VALUES ('ada@example.com', 'Ada')
ON CONFLICT (email)
DO UPDATE SET
  name = EXCLUDED.name,
  updated_at = NOW()
RETURNING id, email;

INSERT INTO hits (slug, n)
VALUES ('home', 1)
ON CONFLICT (slug)
DO UPDATE SET n = hits.n + 1;

INSERT INTO users (email, name)
VALUES ('ada@example.com', 'Ada')
ON CONFLICT DO NOTHING;
```

```sql
-- MySQL
INSERT INTO users (email, name)
VALUES ('ada@example.com', 'Ada')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  updated_at = CURRENT_TIMESTAMP;

-- REPLACE INTO deletes then inserts (side effects on FKs/AI) — prefer ODKu
```

## ⚠️ Pitfalls

- Upsert updates only on the conflict you specify — wrong unique key → duplicate rows.
- `REPLACE INTO` (MySQL) deletes the old row → FK cascades / new auto-increment.
- Partial unique indexes (Postgres) need matching `ON CONFLICT` inference.
- Concurrent upserts need proper unique constraints or you’ll still race.
- Don’t use upsert to hide missing `WHERE` on updates — be explicit.

## 🔗 Related

- [insert_update_delete.md](./insert_update_delete.md)
- [constraints.md](./constraints.md)
- [transactions.md](./transactions.md)
- [indexes.md](./indexes.md)
- [nulls.md](./nulls.md)
- [foreign_keys.md](./foreign_keys.md)
