# Set Methods

_Python · Methods reference_

---

## 📋 Overview

All `set` and `frozenset` methods (`frozenset` lacks mutating methods).

## 🔧 Methods

### Mutating (set only)

| Method | Description |
| --- | --- |
| `add(elem)` | Add element |
| `remove(elem)` | Remove; KeyError if missing |
| `discard(elem)` | Remove if present |
| `pop()` | Remove and return arbitrary element |
| `clear()` | Remove all |
| `update(*others)` | Union in place |
| `intersection_update(*others)` | &= in place |
| `difference_update(*others)` | -= in place |
| `symmetric_difference_update(other)` | ^= in place |

### Non-mutating / both types

| Method | Description |
| --- | --- |
| `union(*others)` | New set with all elements |
| `intersection(*others)` | Elements in all sets |
| `difference(*others)` | In self but not others |
| `symmetric_difference(other)` | In exactly one set |
| `isdisjoint(other)` | No shared elements |
| `issubset(other)` / `issuperset(other)` | Subset / superset test |
| `copy()` | Shallow copy (set only) |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Sets](../sets.md)
