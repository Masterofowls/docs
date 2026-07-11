# Lists & Sets

_Redis · Reference cheat sheet_

---

## 📋 Overview

Lists are ordered sequences (queues, timelines). Sets are unordered unique collections (tags, membership). Both are foundational for queues and relationships.

## 🔧 Core concepts

| List commands | Role |
| --- | --- |
| `LPUSH` / `RPUSH` | Push left/right |
| `LPOP` / `RPOP` | Pop left/right |
| `LRANGE` | Slice |
| `LLEN` | Length |
| `BLPOP` / `BRPOP` | Blocking pop |

| Set commands | Role |
| --- | --- |
| `SADD` / `SREM` | Add/remove members |
| `SISMEMBER` | Membership test |
| `SMEMBERS` | All members |
| `SINTER` / `SUNION` / `SDIFF` | Set algebra |
| `SCARD` | Count |

## 💡 Examples

**Simple queue:**

```bash
LPUSH jobs '{"id":1}'
BRPOP jobs 5
```

**Tags set:**

```bash
SADD post:9:tags redis cache
SISMEMBER post:9:tags redis
SINTER user:1:tags user:2:tags
```

**Recent items (list trim):**

```bash
LPUSH feed:42 itemA
LTRIM feed:42 0 99
```

## ⚠️ Pitfalls

- `SMEMBERS` / large `LRANGE` can block — use `SSCAN` / limit ranges.
- Lists allow duplicates; sets do not — pick the right structure.
- Blocking pops need careful timeouts in app servers to avoid stuck workers.

## 🔗 Related

- [sorted_sets.md](./sorted_sets.md)
- [hashes.md](./hashes.md)
- [pubsub.md](./pubsub.md)
- [strings.md](./strings.md)
