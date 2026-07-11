# Pub/Sub

_Redis · Reference cheat sheet_

---

## 📋 Overview

Pub/Sub broadcasts messages to subscribers on channels. Fire-and-forget: if no subscriber is listening, messages are not queued (unlike Streams/lists).

## 🔧 Core concepts

| Command | Role |
| --- | --- |
| `PUBLISH channel message` | Send message |
| `SUBSCRIBE channel…` | Subscribe (enters sub mode) |
| `PSUBSCRIBE pattern` | Pattern subscribe |
| `UNSUBSCRIBE` | Leave channels |
| `PUBSUB CHANNELS` | List active channels |

| vs alternatives | When |
| --- | --- |
| Pub/Sub | Live fan-out, presence |
| Lists | Work queues with persistence in memory |
| Streams | Consumer groups, replay |

## 💡 Examples

**Publisher:**

```bash
PUBLISH news:alerts "deploy started"
```

**Subscriber (blocks):**

```bash
SUBSCRIBE news:alerts
```

**Pattern:**

```bash
PSUBSCRIBE news:*
```

## ⚠️ Pitfalls

- Subscribers must be connected at publish time — no backlog.
- A connection in subscribe mode cannot run normal commands until unsubscribed.
- For reliable messaging, prefer Streams or an external broker.

## 🔗 Related

- [lists_sets.md](./lists_sets.md)
- [getting_started.md](./getting_started.md)
- [cli_basics.md](./cli_basics.md)
- [persistence.md](./persistence.md)
