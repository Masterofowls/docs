# Component

_React · Reference cheat sheet_

---

## 📋 Overview

A component is a reusable UI unit. Prefer **function components** that return JSX. Class components are legacy for new code.

## 🔧 Core concepts

- **Function component** — `(props) => JSX`; name starts with a capital letter.
- **Pure by default** — same props → same UI; side effects go in hooks.
- **Composition** — build UIs by nesting components, not inheritance.
- **Class (legacy)** — `extends React.Component` with `render()`; use only for old codebases.

## 💡 Examples

```tsx
type ButtonProps = {
  label: string;
  onPress: () => void;
};

export function Button({ label, onPress }: ButtonProps) {
  return (
    <button type="button" onClick={onPress}>
      {label}
    </button>
  );
}
```

```jsx
// Legacy class form — prefer functions + hooks
import { Component } from "react";

class Counter extends Component {
  state = { n: 0 };
  render() {
    return (
      <button onClick={() => this.setState({ n: this.state.n + 1 })}>
        {this.state.n}
      </button>
    );
  }
}
```

## ⚠️ Pitfalls

- Lowercase names are treated as DOM tags (`div`), not components.
- Don’t create components inside other components during render (remounts every time).
- Keep components focused; extract when JSX or logic grows.

## 🔗 Related

- [props.md](./props.md) — inputs
- [hooks.md](./hooks.md) — state & effects
- [children.md](./children.md) — composition
- [constructor.md](./constructor.md) — class legacy
