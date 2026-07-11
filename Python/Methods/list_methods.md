# List Methods

_Python · Methods reference_

---

## 📋 Overview

All common `list` instance methods plus builtins that operate on lists.

## 🔧 Methods

### Instance methods

| Method | Mutates? | Description |
| --- | --- | --- |
| `append(x)` | yes | Add item at end — O(1) amortized |
| `extend(iterable)` | yes | Add all items from iterable |
| `insert(i, x)` | yes | Insert before index i — O(n) |
| `remove(x)` | yes | Remove first equal item; ValueError if missing |
| `pop([i])` | yes | Remove and return item at i (default last) |
| `clear()` | yes | Remove all items |
| `index(x[, start[, stop]])` | no | First index of x; ValueError if missing |
| `count(x)` | no | Count occurrences of x |
| `sort(*, key=None, reverse=False)` | yes | In-place sort; returns None |
| `reverse()` | yes | In-place reverse; returns None |
| `copy()` | no | Shallow copy (same as `xs[:]` / `list(xs)`) |

### Builtins / operators

| API | Description |
| --- | --- |
| `len(xs)` | Number of items |
| `x in xs` | Membership test — O(n) |
| `sorted(xs, key=…)` | New sorted list |
| `reversed(xs)` | Reverse iterator |
| `min` / `max` / `sum` | Aggregates over elements |
| `enumerate(xs)` | Index-value pairs |
| `zip(*seqs)` | Parallel tuples |
| `del xs[i]` / slice assign | Delete or replace ranges |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Lists](../lists.md)
- [Comprehensions](../comprehensions.md)
- [Magic methods](../magic_methods.md)
