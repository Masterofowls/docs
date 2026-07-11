# Map & Set Methods

_JavaScript · Methods reference_

---

## 📋 Overview

ES6 collections — `Map`, `Set`, `WeakMap`, `WeakSet`.

## 🔧 Methods

### Map

| Method | Description |
| --- | --- |
| `set(key, value)` | Set value; returns map |
| `get(key)` | Value or undefined |
| `has(key)` / `delete(key)` / `clear()` | Membership / remove / clear |
| `size` | Entry count (property) |
| `keys()` / `values()` / `entries()` | Iterators |
| `forEach(fn)` | Iterate entries |

### Set

| Method | Description |
| --- | --- |
| `add(value)` | Add unique value |
| `has(value)` / `delete(value)` / `clear()` | Membership / remove |
| `size` | Element count |
| `keys()` / `values()` / `entries()` | Values (keys same as values) |
| `forEach(fn)` | Iterate values |
| `union` / `intersection` / `difference` / `symmetricDifference` | Set ops (ES2024) |
| `isSubsetOf` / `isSupersetOf` / `isDisjointFrom` | Set relations (ES2024) |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Objects](../objects.md)
