# Hashes

_Redis · Reference cheat sheet_

---

## 📋 Overview

Hashes map field → value under one key. Ideal for objects (user profiles, config bags) without serializing a whole JSON blob for every field update.

## 🔧 Core concepts

| Command | Role |
| --- | --- |
| `HSET key field value` | Set field |
| `HGET key field` | Get field |
| `HGETALL key` | All fields |
| `HMGET` | Multiple fields |
| `HDEL` | Delete fields |
| `HEXISTS` | Field exists? |
| `HINCRBY` | Increment integer field |
| `HKEYS` / `HVALS` | List fields/values |

| When hash vs string JSON | Prefer hash when |
| --- | --- |
| Partial updates | Frequent single-field writes |
| Memory | Many small fields (with caveats) |
| Atomic field incr | `HINCRBY` |

## 💡 Examples

**User object:**

```bash
HSET user:42 name Ada email ada@example.com
HGET user:42 email
HGETALL user:42
```

**Increment field:**

```bash
HINCRBY user:42 login_count 1
```

**Delete field:**

```bash
HDEL user:42 email
```

## ⚠️ Pitfalls

- `HGETALL` on huge hashes is expensive — prefer `HSCAN`.
- Nested structures aren't native — store JSON in a field or use separate keys.
- TTL is on the whole hash key, not per field.

## 🔗 Related

- [strings.md](./strings.md)
- [lists_sets.md](./lists_sets.md)
- [expiry_ttl.md](./expiry_ttl.md)
- [getting_started.md](./getting_started.md)
