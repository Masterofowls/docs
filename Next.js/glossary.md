# Glossary

_Next.js · Reference cheat sheet_

---

## 📋 Overview

Alphabetical glossary of Next.js terms spanning App Router, rendering, caching, and deployment.

## 🔧 Core concepts

| Term | Definition |
| --- | --- |
| App Router | Routing system based on the `app/` directory and special files. |
| CSR | Client-side rendering in the browser after JS loads. |
| Dynamic segment | Folder like `[id]` that captures a URL parameter. |
| Edge runtime | Lightweight runtime for Middleware and some Route Handlers. |
| Hydration | Attaching client React to server-rendered HTML. |
| ISR | Incremental Static Regeneration — update static pages after deploy. |
| Layout | Persistent UI wrapper (`layout.tsx`) shared by child routes. |
| Middleware | Edge code that runs before a request is completed. |
| Partial Prerendering | Hybrid static shell + dynamic holes (version-dependent). |
| Prefetch | Loading a route in the background via `Link`. |
| Route Handler | `route.ts` exporting HTTP methods as an API endpoint. |
| Route group | `(name)` folder that organizes routes without affecting the URL. |
| RSC | React Server Component rendered on the server by default. |
| Soft navigation | Client transition without full document reload. |
| SSG | Static Site Generation at build time. |
| SSR | Server-Side Rendering on each request. |
| Streaming | Sending UI in chunks via Suspense / `loading.tsx`. |
| Turbopack | Rust-based bundler used in modern `next dev`. |

## 💡 Examples

**Dynamic segment mental model:**

```
app/shop/[slug]/page.tsx  →  /shop/shoes
```

**RSC vs client:**

```tsx
// Server (default)
export default async function Page() { /* fetch, await */ }

// Client
"use client";
export function Widget() { /* useState, onClick */ }
```

## ⚠️ Pitfalls

- Glossaries drift — verify behavior against your installed Next.js major version.
- “Static” vs “dynamic” depends on APIs used (`cookies`, `headers`, `no-store`), not folder names alone.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [app_router.md](./app_router.md)
- [caching.md](./caching.md)
- [server_components.md](./server_components.md)
- [README.md](./README.md)
