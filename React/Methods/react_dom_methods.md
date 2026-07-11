# React DOM Methods

_React · Methods reference_

---

## 📋 Overview

`react-dom/client` and `react-dom` APIs for mounting and portals.

## 🔧 Methods

### Client root (React 18+)

| API | Description |
| --- | --- |
| `createRoot(domNode)` | Create concurrent root |
| `root.render(element)` | Render into root |
| `root.unmount()` | Unmount tree |
| `hydrateRoot(domNode, element)` | Hydrate SSR markup |

### DOM helpers

| API | Description |
| --- | --- |
| `createPortal(children, domNode)` | Render subtree elsewhere in DOM |
| `flushSync(fn)` | Force synchronous render inside fn |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Root](../root.md)
- [Portals](../portals.md)
