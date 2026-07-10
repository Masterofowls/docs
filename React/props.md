# Props

_React · Reference cheat sheet_

---

## 📋 Overview

Props are the inputs to a component — read-only data and callbacks from the parent. Type them with TypeScript; validate shapes at boundaries when needed.

## 🔧 Core concepts

- **Immutable** — never mutate `props`; lift state or use local state instead.
- **Destructuring** — `function Button({ label, onClick })`.
- **Defaults** — default parameters or `defaultProps` (prefer parameters).
- **Spread** — `<Button {...rest} />` for passthrough DOM props.
- **Children** — special prop for nested content (see children.md).

## 💡 Examples

```tsx
type AvatarProps = {
  name: string;
  size?: number;
  onClick?: () => void;
};

export function Avatar({ name, size = 40, onClick }: AvatarProps) {
  return (
    <button type="button" onClick={onClick} style={{ width: size, height: size }}>
      {name.slice(0, 1)}
    </button>
  );
}
```

```jsx
function UserCard({ user, ...rest }) {
  return (
    <article {...rest}>
      <Avatar name={user.name} />
      <p>{user.email}</p>
    </article>
  );
}
```

## ⚠️ Pitfalls

- Mutating props or nested objects from props.
- Passing new inline objects/functions when child memoization depends on referential equality — measure before optimizing.
- Prop drilling deep trees — use composition or context.

## 🔗 Related

- [component.md](./component.md) — receiving props
- [children.md](./children.md) — children prop
- [events.md](./events.md) — callback props
- [tsx.md](./tsx.md) — typing props
