# Strings

_Redis · Reference cheat sheet_

---

## 📋 Overview

Strings are the simplest Redis values: text, integers (for counters), or binary blobs (up to 512 MB theoretically; keep small in practice).

## 🔧 Core concepts

| Command | Role |
| --- | --- |
| `SET key value` | Set string |
| `GET key` | Get string |
| `MSET` / `MGET` | Multi set/get |
| `SETNX` | Set if not exists |
| `INCR` / `DECR` | Integer increment |
| `APPEND` | Append to string |
| `GETRANGE` / `SETRANGE` | Substring ops |
| `SET key value EX seconds` | Set with TTL |

| Option | Meaning |
| --- | --- |
| `EX` / `PX` | Expire seconds / ms |
| `NX` / `XX` | Only if missing / only if exists |
| `GET` (SET GET) | Return old value (Redis 6.2+) |

## 💡 Examples

**Cache entry:**

```bash
SET user:42:profile '{"name":"Ada"}' EX 3600
GET user:42:profile
```

**Counter:**

```bash
INCR page:home:views
GET page:home:views
```

**Lock-style NX:**

```bash
SET lock:job1 1 NX EX 30
```

## ⚠️ Pitfalls

- `INCR` fails if the value is not an integer string.
- Huge strings block peers longer during ops — split or use other structures.
- `KEYS *` in production is dangerous — use `SCAN`.

## 🔗 Related

- [hashes.md](./hashes.md)
- [expiry_ttl.md](./expiry_ttl.md)
- [cli_basics.md](./cli_basics.md)
- [getting_started.md](./getting_started.md)
