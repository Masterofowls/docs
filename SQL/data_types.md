# Data types

_SQL · Reference cheat sheet_

---

## 📋 Overview

Choose types that match domain constraints and indexing needs. Prefer precise numerics for money, `TIMESTAMPTZ` for instants (Postgres), and explicit character types. Dialects differ: Postgres `TEXT`/`JSONB` vs MySQL `VARCHAR`/`JSON`.

## 🔧 Core concepts

| Category | Postgres | MySQL (typical) |
| --- | --- | --- |
| Integers | `SMALLINT`/`INT`/`BIGINT` | same names |
| Serial | `GENERATED … AS IDENTITY` / `BIGSERIAL` | `AUTO_INCREMENT` |
| Decimal | `NUMERIC(p,s)` | `DECIMAL(p,s)` |
| Float | `REAL`/`DOUBLE PRECISION` | `FLOAT`/`DOUBLE` |
| String | `TEXT`, `VARCHAR(n)` | `VARCHAR(n)`, `TEXT` |
| Time | `TIMESTAMPTZ`, `DATE` | `DATETIME`, `TIMESTAMP` |
| Bool | `BOOLEAN` | `TINYINT(1)` / `BOOLEAN` |
| JSON | `JSONB` | `JSON` |
| UUID | `UUID` | `BINARY(16)` / `CHAR(36)` |

## 💡 Examples

```sql
-- Postgres
CREATE TABLE payments (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  amount       NUMERIC(12, 2) NOT NULL,
  currency     CHAR(3) NOT NULL,
  paid_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  meta         JSONB NOT NULL DEFAULT '{}'::jsonb,
  external_id  UUID UNIQUE
);

-- MySQL
CREATE TABLE payments (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  amount       DECIMAL(12, 2) NOT NULL,
  currency     CHAR(3) NOT NULL,
  paid_at      DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  meta         JSON NOT NULL,
  external_id  CHAR(36) UNIQUE
);
```

## ⚠️ Pitfalls

- Floating point for money causes rounding bugs — use `NUMERIC`/`DECIMAL`.
- MySQL `TIMESTAMP` converts to session time zone; `DATETIME` does not — be explicit.
- Oversized `VARCHAR` still has limits/row size issues in MySQL indexes.
- Storing enums as free `TEXT` without constraints invites junk values.
- Changing types on large tables can rewrite storage and lock (plan migrations).

## 🔗 Related

- [create_alter_drop.md](./create_alter_drop.md)
- [constraints.md](./constraints.md)
- [functions_builtin.md](./functions_builtin.md)
- [schemas.md](./schemas.md)
- [nulls.md](./nulls.md)
- [indexes.md](./indexes.md)
