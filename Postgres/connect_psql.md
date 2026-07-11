# Connect with psql

_Postgres · Reference cheat sheet_

---

## 📋 Overview

`psql` is the primary admin CLI: run SQL, inspect catalogs with meta-commands, and script automation with variables and `\copy`.

## 🔧 Core concepts

| Connection form | Example |
| --- | --- |
| URL | `postgres://user:pass@host:5432/db` |
| Flags | `psql -h host -U user -d db` |
| `.pgpass` | Password file for non-interactive auth |
| `PG*` env | `PGHOST`, `PGUSER`, `PGDATABASE` |

| Meta-command | Purpose |
| --- | --- |
| `\l` | List databases |
| `\c db` | Connect to db |
| `\dt` | List tables |
| `\d table` | Describe table |
| `\du` | List roles |
| `\x` | Expanded display toggle |
| `\timing` | Show query time |
| `\q` | Quit |

## 💡 Examples

**Connect and list tables:**

```bash
psql -h 127.0.0.1 -U app -d app
```

```
\dt
\d users
```

**Run file / one-shot:**

```bash
psql "$DATABASE_URL" -f migrate.sql
psql "$DATABASE_URL" -c "SELECT now();"
```

**CSV copy out:**

```
\copy (SELECT id, email FROM users) TO 'users.csv' CSV HEADER
```

## ⚠️ Pitfalls

- Passwords on the command line leak via process lists — prefer `.pgpass` or env URL carefully.
- `\d` shows one schema search_path view — check `\dn` / qualify schema names.
- Interactive transactions left open (`BEGIN` without `COMMIT`) block others.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [roles_privileges.md](./roles_privileges.md)
- [explain_analyze.md](./explain_analyze.md)
- [backups_restore.md](./backups_restore.md)
