# Composition Patterns

_React · Reference cheat sheet_

---

## 📋 Overview

Prefer composition (`children`, slots, compound components) over deep prop drilling or inheritance. Keep presentational pieces reusable; lift state only as far as needed.

## 🔧 Core concepts

| Pattern | Idea |
| --- | --- |
| `children` | Caller supplies interior |
| Explicit slots | `title` / `actions` props |
| Compound | Shared implicit context |
| Container / presentational | Data vs UI split |

## 💡 Examples

**Slots via children:**

```tsx
function Panel({ title, children, actions }: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section>
      <header>
        <h2>{title}</h2>
        {actions}
      </header>
      {children}
    </section>
  );
}
```

**Compound tabs (sketch):**

```tsx
const TabsCtx = React.createContext(null);

function Tabs({ children }) { /* provide value + setValue */ }
function TabList({ children }) { return <div role="tablist">{children}</div>; }
function Tab({ id, children }) { /* button role=tab */ }
function TabPanel({ id, children }) { /* conditional render */ }
```

## ⚠️ Pitfalls

- Don't invent a mini-framework — start with `children`.
- Compound components need stable context value identity.

## 🔗 Related

- [Children](children.md)
- [Context](context.md)
- [Tabs compound example](Examples/tabs_compound.md)
