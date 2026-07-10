# Pages

_React · Reference cheat sheet_

---

## 📋 Overview

Pages are route-level screens: they compose features, fetch data, and sit inside layouts. In SPAs they map to router routes; in Next.js / Remix they are file-based routes.

## 🔧 Core concepts

- **Thin pages** — orchestrate; push UI into feature components.
- **Data** — loaders, React Query, or `useEffect` + fetch (prefer dedicated data libs).
- **Params** — `useParams`, `useSearchParams` from the router.
- **Code splitting** — `lazy(() => import("./Page"))` + `Suspense`.

## 💡 Examples

```tsx
import { useParams } from "react-router-dom";
import { TodoList } from "../features/todos/TodoList";

export function TodoPage() {
  const { listId } = useParams<{ listId: string }>();
  if (!listId) return <p>Missing list</p>;
  return (
    <section>
      <h1>List {listId}</h1>
      <TodoList listId={listId} />
    </section>
  );
}
```

```tsx
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const TodoPage = lazy(() =>
  import("./pages/TodoPage").then((m) => ({ default: m.TodoPage })),
);

export function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <Routes>
        <Route path="/lists/:listId" element={<TodoPage />} />
      </Routes>
    </Suspense>
  );
}
```

## ⚠️ Pitfalls

- Fat pages with all business logic — hard to test and reuse.
- Fetching the same data in every page without a cache layer.
- Forgetting loading and error UI for async pages.

## 🔗 Related

- [layout.md](./layout.md) — page shells
- [file_structure.md](./file_structure.md) — where pages live
- [hooks.md](./hooks.md) — data hooks
- [main.md](./main.md) — app entry
