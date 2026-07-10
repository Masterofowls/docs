# Schemas

_SQL · Reference cheat sheet_

---

## 📋 Overview

Schemas namespace database objects (tables, views, functions). Postgres uses first-class schemas (`public`, custom); MySQL often treats database = schema. Use schemas to separate domains, tenants (carefully), or extension objects.

## 🔧 Core concepts

- **Qualified names** — `schema.table` (Postgres); `` db.table `` (MySQL).
- **Search path** — Postgres `search_path` resolves unqualified names.
- **CREATE SCHEMA** — logical grouping; permissions per schema.
- **Ownership** — objects inherit owner; grants are schema + object level.
- **Extensions** — Postgres often installs into dedicated schemas.

## 💡 Examples

```sql
-- Postgres
CREATE SCHEMA app AUTHORIZATION app_user;
CREATE SCHEMA analytics;

CREATE TABLE app.users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE analytics.daily_active AS
SELECT CURRENT_DATE AS day, COUNT(*) AS n FROM app.users;

SET search_path TO app, public;
SELECT * FROM users;  -- resolves to app.users

GRANT USAGE ON SCHEMA app TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA app TO readonly;

-- MySQL: database as schema
CREATE DATABASE app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE app;
CREATE TABLE users (id BIGINT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL);
```

## ⚠️ Pitfalls

- Unqualified names + surprising `search_path` → wrong table (security risk with `SECURITY DEFINER`).
- Cross-schema FKs need privileges on both schemas.
- Dump/restore tools must include non-`public` schemas explicitly.
- MySQL “schema” wording ≠ Postgres schemas — don’t assume identical DDL.
- Overusing schemas for multi-tenant isolation is harder than row-level tenancy for many apps.

## 🔗 Related

- [create_alter_drop.md](./create_alter_drop.md)
- [views.md](./views.md)
- [stored_procedures.md](./stored_procedures.md)
- [permissions via constraints.md](./constraints.md)
- [normalization.md](./normalization.md)
- [data_types.md](./data_types.md)
