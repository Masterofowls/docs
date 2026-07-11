# Expiry & TTL

_Redis · Reference cheat sheet_

---

## 📋 Overview

Keys can expire automatically. TTL powers caches, sessions, and ephemeral locks. Expiry is per key (not per hash field).

## 🔧 Core concepts

| Command | Role |
| --- | --- |
| `EXPIRE key seconds` | Set TTL |
| `PEXPIRE` | TTL in ms |
| `TTL` / `PTTL` | Remaining time (`-1` no expire, `-2` missing) |
| `PERSIST` | Remove expiry |
| `SET … EX` | Set value + TTL atomically |
| `EXPIREAT` | Expire at unix time |

| Eviction (when maxmemory) | Examples |
| --- | --- |
| `volatile-lru` | Evict expiring keys LRU |
| `allkeys-lru` | Evict any key LRU |
| `noeviction` | Errors on write when full |

## 💡 Examples

**Session TTL:**

```bash
SET sess:abc123 '{"userId":42}' EX 1800
TTL sess:abc123
```

**Refresh TTL:**

```bash
EXPIRE sess:abc123 1800
```

**Lock with auto-expiry:**

```bash
SET lock:migrate 1 NX EX 60
```

## ⚠️ Pitfalls

- Expired keys may still appear briefly until lazy/active expiration removes them.
- Writing a key with `SET` without TTL removes any previous expiry unless using keep-ttl options.
- Relying on TTL for correctness without handling miss paths causes subtle bugs.

## 🔗 Related

- [strings.md](./strings.md)
- [persistence.md](./persistence.md)
- [getting_started.md](./getting_started.md)
- [cli_basics.md](./cli_basics.md)
