# Glossary

_React · Reference cheat sheet_

---

## 📋 Overview

Alphabetical glossary of core React terms for components, hooks, rendering, and common UI patterns.

## 🔧 Core concepts

| Term | Definition |
| --- | --- |
| Children | Nested content passed between a component’s opening and closing tags. |
| Component | A function or class that returns UI described with JSX/elements. |
| Concurrent | React’s ability to interrupt, prioritize, and resume rendering work. |
| Context | A way to pass data through the tree without prop drilling. |
| Controlled input | A form element whose value is driven by React state. |
| Custom hook | A function named `use*` that reuses stateful logic across components. |
| Effect | Side-work scheduled with `useEffect` after paint (or layout effects). |
| Element | A plain object describing what to render, usually created via JSX. |
| Error boundary | A class component that catches render errors in its subtree. |
| Fiber | React’s internal unit of work representing a component instance. |
| Fragment | A wrapper (`<>...</>` or `<Fragment>`) that groups children without a DOM node. |
| Hook | A special function that lets function components use state and React features. |
| Hydration | Attaching event handlers to server-rendered HTML on the client. |
| JSX | Syntax extension that looks like HTML and compiles to `React.createElement` calls. |
| Key | A stable identity string helping React match list items across updates. |
| Memo | `React.memo` or `useMemo` techniques that skip redundant work. |
| Portal | Rendering children into a DOM node outside the parent hierarchy. |
| Props | Inputs passed from parent to child; treated as read-only by the child. |
| Reconciliation | Diffing previous and next trees to decide minimal DOM updates. |
| Ref | A mutable container (`useRef`/`createRef`) that persists across renders. |
| Render | Calling a component to produce elements for a given props/state. |
| State | Data owned by a component that triggers re-render when updated. |
| Strict Mode | A development wrapper that highlights unsafe patterns and double-invokes some APIs. |
| Suspense | A boundary that shows fallback UI while lazy or async children load. |
| Transition | A lower-priority state update marked with `startTransition`/`useTransition`. |
| Uncontrolled input | A form element that keeps its value in the DOM, often read via a ref. |
| Virtual DOM | The in-memory element tree React diffs before touching the real DOM. |

## 💡 Examples

**State and effect:**

```tsx
function Counter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    document.title = `Count ${n}`;
  }, [n]);
  return <button onClick={() => setN((x) => x + 1)}>{n}</button>;
}
```

**Context and children:**

```tsx
const Theme = createContext("light");
function App({ children }: { children: React.ReactNode }) {
  return <Theme.Provider value="dark">{children}</Theme.Provider>;
}
```

**Keys in lists:**

```tsx
{items.map((item) => (
  <li key={item.id}>{item.label}</li>
))}
```

## ⚠️ Pitfalls

- Confusing **props** (from parent) with **state** (owned locally).
- Mixing **controlled** and **uncontrolled** inputs on the same field.
- Using array **index** as **key** when list order or identity can change.
- Treating **memo** as free performance — it only helps when props are stable.
- Equating **useEffect** with “run on mount only” — dependency arrays control that.

## 🔗 Related

- [hooks](hooks.md)
- [useState](useState.md)
- [useEffect](useEffect.md)
- [props](props.md)
- [context](context.md)
- [jsx](jsx.md)
