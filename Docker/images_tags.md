# Images & Tags

_Docker · Reference cheat sheet_

---

## 📋 Overview

Images are addressed as `name:tag` (and digests). Tags are mutable labels — pin carefully for production reproducibility.

## 🔧 Core concepts

| Reference | Example |
| --- | --- |
| Official short name | `nginx:alpine` |
| Namespaced | `grafana/grafana:11` |
| Digest pin | `nginx@sha256:…` |
| Local tag | `myapp:dev` |

| Command | Purpose |
| --- | --- |
| `docker images` / `docker image ls` | List |
| `docker tag` | Add another name |
| `docker push` / `pull` | Registry sync |
| `docker rmi` | Remove image |
| `docker image prune` | Clean dangling |

| Tag hygiene | Prefer |
| --- | --- |
| Prod | Digests or immutable tags (`1.2.3`) |
| Base images | Distroless / alpine / slim thoughtfully |
| Avoid | Floating `latest` in prod deploys |

## 💡 Examples

**Tag and push:**

```bash
docker build -t ghcr.io/acme/api:1.4.0 .
docker push ghcr.io/acme/api:1.4.0
```

**Retag:**

```bash
docker tag myapp:dev myapp:1.4.0
```

**Remove dangling:**

```bash
docker image prune -f
```

## ⚠️ Pitfalls

- `latest` moves — yesterday’s deploy may not equal today’s pull.
- Deleting a tag on the registry does not delete all digests immediately.
- Huge images slow pulls — multi-stage builds and `.dockerignore` help.

## 🔗 Related

- [dockerfile.md](./dockerfile.md)
- [multi_stage.md](./multi_stage.md)
- [getting_started.md](./getting_started.md)
- [compose.md](./compose.md)
