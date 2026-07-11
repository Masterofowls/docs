# Networks

_Docker · Reference cheat sheet_

---

## 📋 Overview

Docker networks connect containers. Compose creates a default network so services resolve each other by service name as DNS.

## 🔧 Core concepts

| Driver | Use |
| --- | --- |
| `bridge` | Default single-host network |
| `host` | Share host network stack (Linux) |
| `none` | No networking |
| `overlay` | Swarm multi-host |

| Concept | Detail |
| --- | --- |
| Service DNS | `http://api:9000` from another service |
| Publish ports | Expose to host via `-p` |
| Internal network | No external connectivity |

## 💡 Examples

**Inspect defaults:**

```bash
docker network ls
docker network inspect bridge
```

**User-defined bridge:**

```bash
docker network create appnet
docker run -d --name db --network appnet postgres:16-alpine
docker run -d --name api --network appnet -p 9000:9000 myapi
```

**Compose networks:**

```yaml
services:
  api:
    networks: [frontend, backend]
  db:
    networks: [backend]
networks:
  frontend:
  backend:
    internal: true
```

## ⚠️ Pitfalls

- Using host `localhost` to reach another container fails — use DNS name.
- Publishing every port widens attack surface — only publish what you need.
- `host` network mode breaks container isolation assumptions.

## 🔗 Related

- [compose.md](./compose.md)
- [getting_started.md](./getting_started.md)
- [healthchecks.md](./healthchecks.md)
- [volumes.md](./volumes.md)
