# VACUUM & ANALYZE

_Postgres · Reference cheat sheet_

---

## 📋 Overview

MVCC leaves dead row versions. `VACUUM` reclaims space for reuse; `ANALYZE` updates planner statistics. Autovacuum handles most cases — watch bloat and freeze age.

## 🔧 Core concepts

| Command | Role |
| --- | --- |
| `VACUUM` | Cleanup dead tuples |
| `VACUUM (VERBOSE, ANALYZE)` | Cleanup + stats |
| `VACUUM FULL` | Rewrite table (exclusive lock) |
| `ANALYZE` | Refresh stats only |
| Autovacuum | Background workers |

| Monitor | View |
| --- | --- |
| Dead tuples | `pg_stat_user_tables` |
| Autovacuum activity | logs / `pg_stat_progress_vacuum` |
| Wraparound risk | `age(datfrozenxid)` |

## 💡 Examples

**Targeted maintenance:**

```sql
VACUUM (ANALYZE) orders;
```

**Check bloat signals:**

```sql
SELECT relname, n_live_tup, n_dead_tup, last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 20;
```

**Aggressive rewrite (maintenance window):**

```sql
VACUUM FULL orders; -- locks heavily; prefer wisely
```

## ⚠️ Pitfalls

- `VACUUM FULL` is not routine — it locks and needs disk headroom.
- Disabling autovacuum “for performance” causes wraparound emergencies.
- Long transactions delay vacuum — find idle-in-transaction sessions.

## 🔗 Related

- [explain_analyze.md](./explain_analyze.md)
- [indexes.md](./indexes.md)
- [connection_pooling.md](./connection_pooling.md)
- [getting_started.md](./getting_started.md)
