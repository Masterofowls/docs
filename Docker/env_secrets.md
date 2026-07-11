# Env & Secrets

_Docker · Reference cheat sheet_

---

## 📋 Overview

Pass configuration with environment variables and inject secrets without baking them into image layers. Prefer runtime secrets over `Dockerfile ENV` for credentials.

## 🔧 Core concepts

| Mechanism | Use |
| --- | --- |
| `ENV` | Non-secret defaults in image |
| `ARG` | Build-time only (still visible in history if misused) |
| `-e` / `environment` | Runtime env |
| `env_file` | File of KEY=VAL |
| BuildKit `--secret` | Secret mounts during build |
| Orchestrator secrets | Swarm/K8s/Compose secrets |

## 💡 Examples

**Runtime env:**

```bash
docker run --rm -e DATABASE_URL="$DATABASE_URL" myapp:1.0.0
```

**Compose env_file:**

```yaml
services:
  api:
    env_file:
      - .env
    environment:
      NODE_ENV: production
```

**BuildKit npm token (sketch):**

```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=secret,id=npm,target=/root/.npmrc npm ci
```

```bash
docker build --secret id=npm,src=$HOME/.npmrc -t myapp .
```

## ⚠️ Pitfalls

- `ENV SECRET=...` in a Dockerfile is recoverable from image history.
- Committing `.env` with production credentials is a common breach path.
- `docker history` and layer caching can retain leaked build args.

## 🔗 Related

- [dockerfile.md](./dockerfile.md)
- [compose.md](./compose.md)
- [multi_stage.md](./multi_stage.md)
- [getting_started.md](./getting_started.md)
