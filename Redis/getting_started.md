# Getting Started with Redis

_Redis · Reference cheat sheet_

---

## 📋 Overview

Redis is an in-memory data structure server used for caching, sessions, queues, rate limits, and pub/sub. Data structures are first-class (strings, hashes, lists, sets, sorted sets).

## 🔧 Core concepts

| Idea | Meaning |
| --- | --- |
| Key | String name for a value |
| TTL | Optional expiry on keys |
| Single-threaded command execution | Commands are atomic per command |
| Persistence | Optional RDB/AOF durability |
| DB index | Logical keyspaces `0–15` (default config) |

| Command | Purpose |
| --- | --- |
| `redis-cli` | Interactive client |
| `PING` | Health check → `PONG` |
| `INFO` | Server stats |
| `SELECT n` | Switch DB index |

## 💡 Examples

**Run Redis (Docker):**

```bash
docker run --rm -p 6379:6379 redis:7-alpine
```

**First commands:**

```bash
redis-cli
> PING
PONG
> SET greeting "hello"
OK
> GET greeting
"hello"
```

**From Node sketch:**

```js
import { createClient } from "redis";
const client = createClient({ url: "redis://127.0.0.1:6379" });
await client.connect();
await client.set("greeting", "hello");
```

## ⚠️ Pitfalls

- Memory is finite — without eviction policy + TTLs, Redis can OOM.
- Treating Redis as the only source of truth without persistence/HA is risky.
- Key naming collisions across features — use prefixes (`app:session:`).

## 🔗 Related

- [strings.md](./strings.md)
- [expiry_ttl.md](./expiry_ttl.md)
- [cli_basics.md](./cli_basics.md)
- [Comparisons/redis_vs_postgres.md](../Comparisons/redis_vs_postgres.md)
