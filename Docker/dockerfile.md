# Dockerfile

_Docker · Reference cheat sheet_

---

## 📋 Overview

A Dockerfile is a sequence of instructions that build an image layer by layer. Order matters for cache efficiency.

## 🔧 Core concepts

| Instruction | Role |
| --- | --- |
| `FROM` | Base image |
| `WORKDIR` | Set working directory |
| `COPY` / `ADD` | Add files (`COPY` preferred) |
| `RUN` | Execute build commands |
| `ENV` / `ARG` | Runtime env / build args |
| `EXPOSE` | Document port (does not publish) |
| `USER` | Switch user |
| `CMD` / `ENTRYPOINT` | Default process |

| Cache tip | Practice |
| --- | --- |
| Copy lockfiles first | Reuse `npm ci` / `pip` layers |
| Fewer layers | Combine related `RUN`s when it helps |
| `.dockerignore` | Exclude `node_modules`, `.git`, secrets |

## 💡 Examples

**Node app sketch:**

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
EXPOSE 9000
CMD ["node", "server.js"]
```

**Build args:**

```dockerfile
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
```

**`.dockerignore`:**

```
node_modules
.git
.env
Dockerfile*
```

## ⚠️ Pitfalls

- `ADD` auto-extracts archives and can fetch URLs — surprising; prefer `COPY`.
- Secrets in `RUN` lines leak into image history — use BuildKit secret mounts.
- `CMD` vs `ENTRYPOINT` confusion: know exec-form JSON arrays vs shell form.

## 🔗 Related

- [multi_stage.md](./multi_stage.md)
- [images_tags.md](./images_tags.md)
- [env_secrets.md](./env_secrets.md)
- [getting_started.md](./getting_started.md)
