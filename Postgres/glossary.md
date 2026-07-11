# Glossary

_Postgres · Reference cheat sheet_

---

## 📋 Overview

Alphabetical glossary of PostgreSQL operations and administration terms.

## 🔧 Core concepts

| Term | Definition |
| --- | --- |
| Autovacuum | Background process that vacuums and analyzes tables. |
| Bloat | Excess space from dead tuples / index waste. |
| Checkpoint | Flush dirty buffers and advance WAL recovery point. |
| Concurrent index | Index build that avoids long write locks. |
| Extension | Packaged set of DB objects installed per database. |
| Hot standby | Replica open for read-only queries. |
| MVCC | Multi-version concurrency control for readers/writers. |
| PITR | Point-in-time recovery using base backup + WAL. |
| Pooler | Middleware multiplexing client connections. |
| Role | Auth identity that can own objects and hold privileges. |
| TOAST | Out-of-line storage for large field values. |
| Vacuum | Cleanup of dead row versions for reuse. |
| WAL | Write-ahead log guaranteeing durability and replication. |
| Wraparound | Transaction ID exhaustion risk mitigated by freezing. |

## 💡 Examples

**Activity snapshot:**

```sql
SELECT pid, usename, state, query_start, left(query, 80)
FROM pg_stat_activity
WHERE state <> 'idle';
```

**Extension list:**

```
\dx
```

## ⚠️ Pitfalls

- Glossaries compress nuance — always confirm behavior for your major version (14/15/16/17).
- Managed Postgres may rename or restrict low-level ops (superuser, FS access).

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [vacuum_analyze.md](./vacuum_analyze.md)
- [backups_restore.md](./backups_restore.md)
- [README.md](./README.md)
