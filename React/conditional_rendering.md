# Conditional rendering

_React · Reference cheat sheet_

---

## 📋 Overview

Render UI selectively with JS expressions inside JSX: ternary, `&&`, early returns, or extracting components. Prefer readable conditions; avoid patterns that accidentally render `0` or `NaN`.

## 🔧 Core concepts

- **Early return** — `if (!data) return <Loading />`.
- **Ternary** — `cond ? <A /> : <B />`.
- **`&&`** — `cond && <A />` (watch falsy numbers).
- **Switch / maps** — for multi-branch UIs.
- **Null** — `return null` renders nothing.

## 💡 Examples

```tsx
export function Inbox({ items, loading, error }: Props) {
  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">{error.message}</p>;
  if (items.length === 0) return <p>No messages</p>;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

```tsx
function Badge({ count }: { count: number }) {
  // Bad: count && <span>{count}</span> renders "0"
  return count > 0 ? <span>{count}</span> : null;
}
```

```tsx
{user ? <Avatar user={user} /> : <LoginLink />}
{isAdmin && <AdminPanel />}
```

## ⚠️ Pitfalls

- `count && <Badge />` when `count === 0` shows `0`.
- Nested ternaries that hurt readability—extract components.
- Hooks after conditional returns—break rules of hooks.
- Toggling with CSS-only when the subtree should unmount for state reset (or vice versa).

## 🔗 Related

- [jsx.md](./jsx.md) — expressions
- [keys_lists.md](./keys_lists.md) — empty lists
- [hooks.md](./hooks.md) — hook order
- [suspense.md](./suspense.md) — loading UI
- [component.md](./component.md) — extract branches
