# Sets

_Python · Reference cheat sheet_

---

## 📋 Overview

A `set` is an unordered collection of unique hashable elements. Use for membership tests, deduplication, and set algebra (union, intersection, difference). `frozenset` is the immutable, hashable variant.

## 🔧 Core concepts

| Operation | Example |
| --- | --- |
| Create | `{1, 2}`, `set(iterable)`, `set()` (not `{}`) |
| Add / remove | `s.add(x)`, `s.discard(x)`, `s.remove(x)`, `s.pop()` |
| Membership | `x in s` — average O(1) |
| Union | `a \| b`, `a.union(b)` |
| Intersection | `a & b`, `a.intersection(b)` |
| Difference | `a - b`, `a.difference(b)` |
| Symmetric diff | `a ^ b` |
| Subset | `a <= b`, `a < b` (proper) |

Elements must be hashable. Insertion order is preserved for iteration in 3.7+ CPython, but do not treat sets as ordered sequences.

## 💡 Examples

**Deduplicate and membership:**

```python
tags = ["py", "web", "py", "api"]
unique = set(tags)                 # {"py", "web", "api"}
print("web" in unique)             # True
```

**Set algebra:**

```python
required = {"auth", "db", "cache"}
installed = {"auth", "db", "logs"}

missing = required - installed     # {"cache"}
extra = installed - required       # {"logs"}
both = required & installed        # {"auth", "db"}
```

**Comprehension and frozenset:**

```python
evens = {n for n in range(10) if n % 2 == 0}
key = frozenset({"a", "b"})
groups: dict[frozenset[str], int] = {key: 1}
```

**Update in place:**

```python
s = {1, 2}
s |= {2, 3}      # {1, 2, 3}
s &= {2, 3, 4}   # {2, 3}
```

## ⚠️ Pitfalls

- `{}` creates an empty **dict**, not a set — use `set()`.
- Unhashable elements (`list`, `dict`, `set`) raise `TypeError`.
- `remove` raises `KeyError` if missing; `discard` does not.
- Set equality ignores order; do not rely on iteration order for logic.
- Prefer `frozenset` when you need a set as a dict key or nested in another set.

## 🔗 Related

- [Lists](lists.md)
- [Dictionaries](dictionaries.md)
- [Comprehensions](comprehensions.md)
- [Types](types.md)
- [Collections module](collections_module.md)
- [Truthiness](truthiness.md)
