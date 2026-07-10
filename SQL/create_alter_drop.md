# CREATE, ALTER, DROP

_SQL · Reference cheat sheet_

---

## 📋 Overview

DDL statements define and change schema objects: tables, columns, indexes, and constraints. Prefer additive, reversible migrations. Dialects differ in types, `IF EXISTS`, and online `ALTER` support (Postgres vs MySQL).

## 🔧 Core concepts

- **CREATE** — tables, indexes, views, schemas.
- **ALTER** — add/drop/rename columns, constraints, defaults.
- **DROP** — remove objects; `CASCADE` / `RESTRICT` control dependents.
- **IF EXISTS / IF NOT EXISTS** — idempotent DDL (widely supported).
- **Transactions** — Postgres DDL is transactional; MySQL DDL often commits implicitly.

## 💡 Examples

```sql
CREATE TABLE users (
  id           BIGSERIAL PRIMARY KEY,          -- Postgres
  -- id BIGINT AUTO_INCREMENT PRIMARY KEY,    -- MySQL
  email        VARCHAR(255) NOT NULL UNIQUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE users
  ADD COLUMN display_name VARCHAR(120),
  ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE users RENAME COLUMN display_name TO name;  -- Postgres
-- MySQL: CHANGE/RENAME COLUMN syntax variants by version

ALTER TABLE users DROP COLUMN is_active;

DROP TABLE IF EXISTS sessions;
DROP TABLE old_events CASCADE;  -- also drops dependent views/FKs (careful)
```

```sql
CREATE INDEX CONCURRENTLY idx_users_email ON users (email);  -- Postgres online
-- MySQL: CREATE INDEX … (locks vary by version/engine)
```

## ⚠️ Pitfalls

- `DROP … CASCADE` can wipe far more than the target table.
- MySQL `ALTER` may rebuild tables and lock writes — plan maintenance windows.
- Changing column types can rewrite data and fail on incompatible values.
- Forgetting `NOT NULL` / defaults on new columns breaks existing row inserts.
- Don’t mix manual DDL with migration tools without a single source of truth.

## 🔗 Related

- [constraints.md](./constraints.md)
- [data_types.md](./data_types.md)
- [indexes.md](./indexes.md)
- [foreign_keys.md](./foreign_keys.md)
- [schemas.md](./schemas.md)
- [views.md](./views.md)
