# Pages Router vs App Router

_Comparisons · Reference cheat sheet_

---

## 📋 Overview

Next.js **Pages Router** (`pages/`) is the original model. **App Router** (`app/`) is the modern default with Server Components, nested layouts, and richer caching controls. New projects should prefer App Router unless constrained.

## 🔧 Core concepts

| Dimension | Pages Router | App Router |
| --- | --- | --- |
| Directory | `pages/` | `app/` |
| Default components | Client-centric pages | Server Components |
| Data fetching | `getServerSideProps` / `getStaticProps` | async server components / `fetch` cache |
| API routes | `pages/api/*` | `app/**/route.ts` |
| Layouts | `_app` + manual | Nested `layout.tsx` |
| Metadata | `next/head` / `Head` | `metadata` / `generateMetadata` |

**When to use App Router:** new apps, RSC, nested layouts, modern Next features.

**When to use Pages Router:** large legacy codebases, libraries that assume Pages only, gradual migration.

## 💡 Examples

**Pages:**

```tsx
export async function getServerSideProps() {
  return { props: { t: Date.now() } };
}
export default function Page({ t }: { t: number }) {
  return <p>{t}</p>;
}
```

**App:**

```tsx
export default async function Page() {
  const t = Date.now();
  return <p>{t}</p>;
}
```

## ⚠️ Pitfalls

- Mixing both routers works but doubles mental models — document boundaries.
- Hooks require `'use client'` in App Router — easy to forget.
- Caching defaults in App Router surprise Pages veterans — learn `no-store` / revalidate.

## 🔗 Related

- [Next.js/app_router.md](../Next.js/app_router.md)
- [Next.js/pages_router.md](../Next.js/pages_router.md)
- [Next.js/server_components.md](../Next.js/server_components.md)
- [README.md](./README.md)
