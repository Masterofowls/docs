# Tag

_React · Reference cheat sheet_

---

## 📋 Overview

In JSX, **tags** are either host elements (`div`, `span`, `input`) or custom components (`<Button />`). Capitalization decides which.

## 🔧 Core concepts

- **Host tags** — lowercase → DOM/SVG elements.
- **Component tags** — Uppercase → your function/class components.
- **Dynamic tags** — assign to a capitalized variable: `const Tag = as; return <Tag />`.
- **Fragments** — `<>...</>` or `<Fragment>` with optional `key`.

## 💡 Examples

```tsx
type BoxProps = {
  as?: "div" | "section" | "article";
  children: React.ReactNode;
};

export function Box({ as: Tag = "div", children }: BoxProps) {
  return <Tag className="box">{children}</Tag>;
}
```

```jsx
const ok = true;
return ok ? <span>Yes</span> : <span>No</span>;
```

## ⚠️ Pitfalls

- `<button>` vs `<Button>` — wrong case mounts the wrong thing.
- Variable component must be capitalized: `const Comp = map[type]` then `<Comp />`.
- Unknown HTML attributes may land on the DOM; filter props for wrappers.

## 🔗 Related

- [jsx.md](./jsx.md) — JSX syntax
- [component.md](./component.md) — custom tags
- [tsx.md](./tsx.md) — typed elements
- [children.md](./children.md) — tag children
