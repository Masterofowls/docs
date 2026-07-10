# Constraints

_SQL · Reference cheat sheet_

---

## 📋 Overview

Constraints enforce data integrity: `PRIMARY KEY`, `UNIQUE`, `NOT NULL`, `CHECK`, `FOREIGN KEY`, and defaults. Prefer declarative constraints over application-only checks so every client is covered.

## 🔧 Core concepts

| Constraint | Guarantees |
| --- | --- |
| `PRIMARY KEY` | Unique + NOT NULL (one per table) |
| `UNIQUE` | No duplicate non-NULL sets (NULL handling differs) |
| `NOT NULL` | Column always present |
| `CHECK` | Row-level predicate |
| `FOREIGN KEY` | References parent key |
| `DEFAULT` | Value when omitted on insert |

- **Named constraints** — easier to drop/alter in migrations.
- **Deferral** — Postgres can `DEFERRABLE` FKs to end of transaction.

## 💡 Examples

```sql
CREATE TABLE products (
  id         BIGSERIAL PRIMARY KEY,
  sku        TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  status     TEXT NOT NULL DEFAULT 'draft',
  CONSTRAINT products_sku_unique UNIQUE (sku),
  CONSTRAINT products_status_chk CHECK (status IN ('draft', 'live', 'archived'))
);

ALTER TABLE products
  ADD CONSTRAINT products_price_positive CHECK (price_cents > 0);

ALTER TABLE products DROP CONSTRAINT products_status_chk;

-- Composite unique
CREATE TABLE memberships (
  user_id BIGINT NOT NULL,
  org_id  BIGINT NOT NULL,
  PRIMARY KEY (user_id, org_id)
);
```

## ⚠️ Pitfalls

- MySQL `CHECK` was ignored before 8.0.16 — verify engine/version.
- Multiple NULLs often allowed in `UNIQUE` (Postgres); MySQL/InnoDB unique NULL behavior differs by version.
- Disabling constraints for bulk load must be re-validated afterward.
- Application validation ≠ database constraint — race conditions need DB enforcement.
- Overly strict `CHECK` can block legitimate historical data migrations.

## 🔗 Related

- [foreign_keys.md](./foreign_keys.md)
- [create_alter_drop.md](./create_alter_drop.md)
- [nulls.md](./nulls.md)
- [indexes.md](./indexes.md)
- [data_types.md](./data_types.md)
- [normalization.md](./normalization.md)
