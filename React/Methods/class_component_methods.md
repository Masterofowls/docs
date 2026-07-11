# Class Component Methods

_React · Methods reference_

---

## 📋 Overview

Legacy class component lifecycle and instance API (prefer hooks for new code).

## 🔧 Methods

### Lifecycle methods

| Method | Description |
| --- | --- |
| `constructor(props)` | Initialize state; bind handlers |
| `render()` | Return React elements (required) |
| `componentDidMount()` | After first paint |
| `componentDidUpdate(prevProps, prevState)` | After update |
| `componentWillUnmount()` | Cleanup before remove |
| `shouldComponentUpdate(nextProps, nextState)` | Return false to skip render |
| `getDerivedStateFromProps(props, state)` | Static — sync state from props |
| `getSnapshotBeforeUpdate(prevProps, prevState)` | Capture DOM before update |
| `componentDidCatch(error, info)` | Error boundary handler |

### Instance

| Property / method | Description |
| --- | --- |
| `this.state` / `this.setState(updater, callback?)` | State read/update |
| `this.props` | Read-only props |
| `this.forceUpdate()` | Force re-render |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Constructor](../constructor.md)
- [Error boundaries](../error_boundaries.md)
