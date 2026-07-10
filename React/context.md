# Context

_React · Reference cheat sheet_

---

## 📋 Overview

Context passes data through the tree without prop drilling. Create a context, wrap a subtree in `Provider`, consume with `useContext` or (legacy) `Context.Consumer`. Combine with custom hooks for a clean API.

## 🔧 Core concepts

- **`createContext`** — typed default value.
- **Provider** — `value` prop is the broadcasted data.
- **Consumers** — re-render when `value` changes by `Object.is`.
- **Composition** — multiple contexts; split state vs dispatch.
- **Default** — only when no Provider ancestor exists.

## 💡 Examples

```tsx
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Auth = {
  user: { id: string; name: string } | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Auth["user"]>(null);
  const value = useMemo<Auth>(
    () => ({
      user,
      login: (name) => setUser({ id: "1", name }),
      logout: () => setUser(null),
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth requires AuthProvider");
  return ctx;
}
```

## ⚠️ Pitfalls

- Unstable `value` object → widespread re-renders.
- Prop drilling avoidance taken too far—pass props for local parent/child.
- Optional context without null checks.
- Putting server cache in context instead of a dedicated library when updates are frequent.

## 🔗 Related

- [useContext.md](./useContext.md) — hook API
- [useMemo.md](./useMemo.md) — stable values
- [custom_hooks.md](./custom_hooks.md) — `useAuth`
- [performance.md](./performance.md) — re-renders
- [children.md](./children.md) — composition
