# Redis vs Postgres

_Comparisons · Reference cheat sheet_

---

## 📋 Overview

**Postgres** is a durable relational system of record. **Redis** is an in-memory data structure server optimized for speed, caching, ephemeral state, and specialized structures. Often used together, not as mutual substitutes.

## 🔧 Core concepts

| Dimension | Redis | Postgres |
| --- | --- | --- |
| Primary store? | Usually no (cache/session) | Yes (SoR) |
| Durability | Optional RDB/AOF | WAL + strong durability defaults |
| Query model | Keys + data structures | SQL + relational model |
| Latency | Sub-ms in-memory | Low ms; disk-backed |
| Relations / joins | DIY | First-class |
| Memory cost | Entire working set in RAM | Buffer cache + disk |

**When to use Redis:** cache, rate limits, sessions, leaderboards, pub/sub, queues (or Streams).

**When to use Postgres:** authoritative business data, complex queries, transactions, constraints.

## 💡 Examples

**Redis cache aside:**

```bash
GET user:42
# miss → load from Postgres → SET user:42 … EX 300
```

**Postgres source of truth:**

```sql
SELECT id, email FROM users WHERE id = 42;
```

## ⚠️ Pitfalls

- Using Redis as the only database without HA/persistence for critical data.
- Caching without invalidation strategy serves stale Postgres data forever.
- Storing huge blobs in Redis blows RAM — keep hot, small keys.

## 🔗 Related

- [Redis/getting_started.md](../Redis/getting_started.md)
- [Postgres/getting_started.md](../Postgres/getting_started.md)
- [Redis/expiry_ttl.md](../Redis/expiry_ttl.md)
- [README.md](./README.md)
