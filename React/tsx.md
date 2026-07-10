# TSX

_React · Reference cheat sheet_

---

## 📋 Overview

`.tsx` is TypeScript + JSX. Type props, events, and refs for safer components. Use `react` types (`ReactNode`, `CSSProperties`, form events).

## 🔧 Core concepts

- **Props types** — `type Props = { ... }` or `interface`.
- **FC** — prefer explicit props + return; `React.FC` is optional and adds `children` quirks in older typings.
- **Events** — `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent`.
- **Refs** — `useRef<HTMLDivElement>(null)`.
- **Generics** — `function List<T>({ items }: { items: T[] })`.

## 💡 Examples

```tsx
import { useRef, useState, type FormEvent } from "react";

type FormProps = {
  onSave: (name: string) => void;
};

export function NameForm({ onSave }: FormProps) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave(name);
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

```tsx
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

export function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>;
}
```

## ⚠️ Pitfalls

- Typing `children` only when needed — don’t force it on every component.
- `as any` on props hides real bugs.
- Ensure `"jsx": "react-jsx"` (or compatible) in `tsconfig`.

## 🔗 Related

- [jsx.md](./jsx.md) — JSX without types
- [props.md](./props.md) — prop shapes
- [component.md](./component.md) — components
- [import_export.md](./import_export.md) — `import type`
