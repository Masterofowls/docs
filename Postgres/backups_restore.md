# Backups & Restore

_Postgres · Reference cheat sheet_

---

## 📋 Overview

Backups are only real if restores are rehearsed. Use logical dumps for portability and physical/base backups for large clusters and PITR with WAL archiving.

## 🔧 Core concepts

| Method | Tooling | Notes |
| --- | --- | --- |
| Logical | `pg_dump`, `pg_dumpall` | Flexible, slower for huge DBs |
| Logical restore | `psql`, `pg_restore` | Custom format supports parallel |
| Physical | `pg_basebackup` | Cluster-level |
| PITR | Base backup + WAL archive | Restore to timestamp |

| Format | Flag |
| --- | --- |
| Plain SQL | `pg_dump` default |
| Custom | `-Fc` for `pg_restore` |
| Directory | `-Fd` parallel friendly |

## 💡 Examples

**Dump one database:**

```bash
pg_dump -Fc -f app.dump "$DATABASE_URL"
```

**Restore custom format:**

```bash
pg_restore --clean --if-exists -d "$DATABASE_URL" app.dump
```

**SQL dump:**

```bash
pg_dump "$DATABASE_URL" > app.sql
psql "$DATABASE_URL" -f app.sql
```

## ⚠️ Pitfalls

- Untested backups fail when you need them — schedule restore drills.
- Dumping a live DB without awareness of long transactions can capture inconsistent app-level state (DB is consistent; apps may need quiesce).
- Restoring over production without a rename/canary is a career-limiting move.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [connect_psql.md](./connect_psql.md)
- [migrations_ops.md](./migrations_ops.md)
- [connection_pooling.md](./connection_pooling.md)
