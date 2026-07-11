# Roles & Privileges

_Postgres · Reference cheat sheet_

---

## 📋 Overview

Postgres uses roles for authentication and authorization. Prefer least privilege: separate owner, migrator, and runtime app roles.

## 🔧 Core concepts

| Concept | Meaning |
| --- | --- |
| LOGIN role | Can connect (user) |
| NOLOGIN role | Group / ownership bucket |
| GRANT / REVOKE | Privilege changes |
| `SEARCH_PATH` | Schema resolution order |
| Row Level Security | Per-row policies (advanced) |

| Privilege | Typical on tables |
| --- | --- |
| `SELECT` | Read |
| `INSERT` / `UPDATE` / `DELETE` | Write |
| `TRUNCATE` | Fast empty |
| `REFERENCES` | FK creation |
| `USAGE` on schema | See objects in schema |

## 💡 Examples

**Create app role:**

```sql
CREATE ROLE app_login LOGIN PASSWORD 'change-me';
CREATE ROLE app_owner NOLOGIN;
GRANT app_owner TO migrator; -- migrator assumes ownership duties
```

**Grants:**

```sql
GRANT USAGE ON SCHEMA public TO app_login;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_login;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_login;
```

**Inspect:**

```
\du
```

```sql
SELECT * FROM information_schema.role_table_grants WHERE grantee = 'app_login';
```

## ⚠️ Pitfalls

- Objects created by superuser may not grant to app roles unless `ALTER DEFAULT PRIVILEGES` is set.
- Public schema open grants are a common over-exposure.
- Rotating passwords in URLs requires updating all poolers/clients.

## 🔗 Related

- [connect_psql.md](./connect_psql.md)
- [migrations_ops.md](./migrations_ops.md)
- [connection_pooling.md](./connection_pooling.md)
- [getting_started.md](./getting_started.md)
