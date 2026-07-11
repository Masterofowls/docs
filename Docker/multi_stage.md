# Multi-stage Builds

_Docker · Reference cheat sheet_

---

## 📋 Overview

Multi-stage Dockerfiles use multiple `FROM` stages so build tools stay out of the final runtime image. Smaller, safer production images.

## 🔧 Core concepts

| Pattern | Role |
| --- | --- |
| `AS name` | Name a stage |
| `COPY --from=stage` | Copy artifacts only |
| Builder stage | Compile, `npm ci`, tests optional |
| Runtime stage | Minimal base + binary/dist |

| Benefit | Why |
| --- | --- |
| Smaller image | No compilers/toolchains |
| Fewer CVEs | Less software surface |
| Clear separation | Build vs run |

## 💡 Examples

**Go binary:**

```dockerfile
FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /out/app

FROM gcr.io/distroless/static
COPY --from=build /out/app /app
USER nonroot
ENTRYPOINT ["/app"]
```

**Node (deps → build → run):**

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json .
CMD ["node", "dist/server.js"]
```

## ⚠️ Pitfalls

- Copying entire `node_modules` from a build stage may include devDependencies — use production installs in the final stage.
- Forgetting `.dockerignore` still bloats build context even with multi-stage.
- Debugging is harder — keep a `debug` stage target when needed (`docker build --target`).

## 🔗 Related

- [dockerfile.md](./dockerfile.md)
- [images_tags.md](./images_tags.md)
- [env_secrets.md](./env_secrets.md)
- [getting_started.md](./getting_started.md)
