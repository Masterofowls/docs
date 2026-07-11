# Docker Compose

_Docker · Reference cheat sheet_

---

## 📋 Overview

Compose defines multi-service stacks in YAML: web, db, redis, networks, and volumes with one `docker compose up`.

## 🔧 Core concepts

| Key | Role |
| --- | --- |
| `services` | Containers to run |
| `images` / `build` | Prebuilt vs local Dockerfile |
| `ports` | `host:container` publish |
| `environment` / `env_file` | Config |
| `volumes` | Persist or share data |
| `networks` | Service DNS names |
| `depends_on` | Start order (not readiness) |

| Command | Purpose |
| --- | --- |
| `docker compose up -d` | Start detached |
| `docker compose down` | Stop + remove |
| `docker compose logs -f` | Follow logs |
| `docker compose ps` | Status |

## 💡 Examples

**Minimal stack:**

```yaml
services:
  web:
    build: .
    ports:
      - "9000:9000"
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

**Rebuild one service:**

```bash
docker compose up -d --build web
```

## ⚠️ Pitfalls

- `depends_on` does not wait for DB ready — use healthchecks + `condition: service_healthy`.
- Host `localhost` inside a container is the container itself — use service names (`db`).
- Old `docker-compose` (hyphen) CLI differs from `docker compose` plugin — prefer the plugin.

## 🔗 Related

- [networks.md](./networks.md)
- [volumes.md](./volumes.md)
- [healthchecks.md](./healthchecks.md)
- [env_secrets.md](./env_secrets.md)
