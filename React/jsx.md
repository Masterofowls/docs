# JSX

_React · Reference cheat sheet_

---

## 📋 Overview

JSX is syntax sugar for `React.createElement` / the JSX transform. It looks like HTML in JavaScript but follows JavaScript rules for expressions and attributes.

## 🔧 Core concepts

- **Expressions** — `{value}` inside tags; any JS expression is allowed.
- **Attributes** — camelCase (`className`, `htmlFor`, `onClick`); strings in quotes or `{expr}`.
- **One parent** — return a single root, fragment `<>...</>`, or array.
- **Self-closing** — `<img />`, `<Component />` when no children.
- **Booleans** — `disabled={isOff}`; omit or pass `true` for presence flags.

## 💡 Examples

```jsx
const name = "Ada";
const el = (
  <>
    <h1 className="title">Hello, {name}</h1>
    <img src="/avatar.png" alt="" />
    {items.length > 0 ? (
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    ) : (
      <p>Empty</p>
    )}
  </>
);
```

```tsx
type IconProps = { size?: number };

function Icon({ size = 16 }: IconProps) {
  return <svg width={size} height={size} aria-hidden />;
}
```

## ⚠️ Pitfalls

- `class` → `className`; `for` → `htmlFor`.
- `style` takes an object: `style={{ marginTop: 8 }}`, not a CSS string (unless using libraries).
- Comments: `{/* comment */}`, not `<!-- -->`.
- `if` statements aren’t expressions — use ternaries or extract variables.

## 🔗 Related

- [tsx.md](./tsx.md) — typed JSX
- [tag.md](./tag.md) — elements & tags
- [children.md](./children.md) — nested content
- [component.md](./component.md) — custom tags
