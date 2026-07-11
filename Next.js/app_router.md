# App Router

_Next.js · Reference cheat sheet_

---

## 📋 Overview

The App Router uses the `app/` directory for routes, layouts, loading UI, and nested segments. Folders define URL segments; special files define UI and behavior.

## 🔧 Core concepts

| File | Role |
| --- | --- |
| `page.tsx` | UI for a route (required for that URL) |
| `layout.tsx` | Shared UI wrapping children; persists across navigations |
| `loading.tsx` | Instant loading UI (Suspense boundary) |
| `error.tsx` | Error boundary for the segment |
| `not-found.tsx` | 404 UI |
| `route.ts` | Route Handler (API endpoint) |
| `template.tsx` | Like layout but remounts on navigation |
| `default.tsx` | Fallback for parallel routes |

| Convention | Meaning |
| --- | --- |
| `[id]` | Dynamic segment |
| `[...slug]` | Catch-all |
| `[[...slug]]` | Optional catch-all |
| `(group)` | Route group — no URL segment |
| `@slot` | Parallel route slot |

## 💡 Examples

**Nested layout:**

```
app/
  layout.tsx
  page.tsx          → /
  blog/
    layout.tsx
    page.tsx        → /blog
    [slug]/
      page.tsx      → /blog/:slug
```

**Dynamic page:**

```tsx
// app/blog/[slug]/page.tsx
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}
```

**Route group (no URL impact):**

```
app/(marketing)/about/page.tsx  → /about
app/(shop)/cart/page.tsx        → /cart
```

## ⚠️ Pitfalls

- `layout.tsx` does not remount on soft navigation — don't put one-shot client state there expecting reset.
- `params` and `searchParams` are async in recent Next.js — await them.
- A folder without `page.tsx` is not a reachable route by itself.

## 🔗 Related

- [pages_router.md](./pages_router.md)
- [server_components.md](./server_components.md)
- [route_handlers.md](./route_handlers.md)
- [link_navigation.md](./link_navigation.md)
- [getting_started.md](./getting_started.md)
