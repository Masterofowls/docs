# Dict Methods

_Python · Methods reference_

---

## 📋 Overview

All `dict` instance methods (Python 3.7+ ordered, 3.9+ merge operators).

## 🔧 Methods

### Instance methods

| Method | Mutates? | Description |
| --- | --- | --- |
| `clear()` | yes | Remove all items |
| `copy()` | no | Shallow copy |
| `get(key[, default])` | no | Value or default without KeyError |
| `pop(key[, default])` | yes | Remove key and return value |
| `popitem()` | yes | Remove and return last inserted (LIFO) pair |
| `setdefault(key[, default])` | yes | Get or insert default |
| `update([other])` | yes | Merge mappings / kwargs |
| `keys()` | no | View of keys |
| `values()` | no | View of values |
| `items()` | no | View of (key, value) pairs |
| `fromkeys(iterable[, value])` | — | Class method: new dict with keys |

### Operators (3.9+)

| Operator | Description |
| --- | --- |
| `d1 | d2` | New dict merge — right wins (3.9+) |
| `d1 |= d2` | In-place merge (3.9+) |
| `d[key]` | Get; KeyError if missing |
| `key in d` | Membership on keys |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Dictionaries](../dictionaries.md)
