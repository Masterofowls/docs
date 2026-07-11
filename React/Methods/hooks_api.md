# Hooks API

_React · Methods reference_

---

## 📋 Overview

All built-in React hooks (React 19) — rules: only call at top level in function components or custom hooks.

## 🔧 Methods

### State & refs

| Hook | Description |
| --- | --- |
| `useState(initial)` | Returns [state, setState] |
| `useReducer(reducer, init)` | State via reducer dispatch |
| `useRef(initial)` | Mutable ref object (.current) |
| `useImperativeHandle(ref, create, deps?)` | Customize ref exposed to parent |

### Effects & lifecycle

| Hook | Description |
| --- | --- |
| `useEffect(fn, deps?)` | After paint side effects; cleanup return |
| `useLayoutEffect(fn, deps?)` | After DOM mutations, before paint |
| `useInsertionEffect(fn, deps?)` | Before layout effects (CSS-in-JS libs) |

### Context & memoization

| Hook | Description |
| --- | --- |
| `useContext(Ctx)` | Read nearest context value |
| `useMemo(fn, deps)` | Memoize expensive computed value |
| `useCallback(fn, deps)` | Memoize function reference |

### Concurrent & IDs

| Hook | Description |
| --- | --- |
| `useTransition()` | [isPending, startTransition] — non-urgent updates |
| `useDeferredValue(value)` | Defer re-render of heavy UI |
| `useId()` | Stable unique IDs for a11y |
| `useSyncExternalStore(sub, getSnap, getServerSnap?)` | Subscribe external store |
| `useActionState(action, initialState)` | Form action state (19) |
| `useOptimistic(state, updateFn)` | Optimistic UI (19) |
| `useFormStatus()` | Pending state from parent form (19) |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Hooks](../hooks.md)
- [useState](../useState.md)
- [useEffect](../useEffect.md)
