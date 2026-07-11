# Getting Started with Next.js

_Next.js · Reference cheat sheet_

---

## 📋 Overview

Next.js is a React framework for full-stack web apps. It adds routing, rendering modes, image optimization, and deployment conventions on top of React.

## 🔧 Core concepts

| Idea | Meaning |
| --- | --- |
| App Router | File-based routing under `app/` (default in new apps) |
| Pages Router | Legacy file-based routing under `pages/` |
| RSC | React Server Components — default in App Router |
| SSR / SSG | Server-render on request vs pre-render at build |
| Turbopack | Fast bundler used by `next dev` (newer versions) |

**Create a project:**

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

| Script | Purpose |
| --- | --- |
| `next dev` | Local development server |
| `next build` | Production build |
| `next start` | Serve production build |
| `next lint` | Run ESLint |

## 💡 Examples

**Minimal `app/page.tsx`:**

```tsx
export default function Home() {
  return <h1>Hello Next.js</h1>;
}
```

**`package.json` scripts:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

**Check version:**

```bash
npx next --version
```

## ⚠️ Pitfalls

- Mixing App Router (`app/`) and Pages Router (`pages/`) without a clear plan causes confusion.
- Client hooks (`useState`, `useEffect`) need `'use client'` in App Router.
- Forgetting `next build` before `next start` serves a stale or missing build.

## 🔗 Related

- [app_router.md](./app_router.md)
- [pages_router.md](./pages_router.md)
- [server_components.md](./server_components.md)
- [deployment.md](./deployment.md)
- [glossary.md](./glossary.md)
