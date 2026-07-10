# Dictionaries

_Python · Reference cheat sheet_

---

## 📋 Overview

A `dict` maps hashable keys to values. Insertion order is preserved (3.7+). Use for lookups, configs, JSON-like data, and counting. Prefer `dict` / `collections.Counter` / `defaultdict` over ad-hoc nested structures when possible.

## 🔧 Core concepts

| Operation | Example |
| --- | --- |
| Create | `{"a": 1}`, `dict(a=1)`, `dict([("a", 1)])` |
| Get | `d["a"]`, `d.get("a", default)` |
| Set | `d["a"] = 1`, `d.setdefault("a", 0)` |
| Delete | `del d["a"]`, `d.pop("a", None)` |
| Merge | `{**a, **b}`, `a | b` (3.9+), `a.update(b)` |
| Views | `d.keys()`, `d.values()`, `d.items()` |
| Comprehension | `{k: v for k, v in pairs}` |

Keys must be hashable (`str`, `int`, `tuple` of hashables—not `list`/`dict`).

## 💡 Examples

**Safe access and merge:**

```python
user = {"id": 1, "name": "Ada"}
role = {"role": "admin"}

print(user.get("email", "n/a"))
merged = user | role  # {"id": 1, "name": "Ada", "role": "admin"}
```

**Counting and grouping:**

```python
from collections import Counter, defaultdict

words = ["a", "b", "a", "c", "b", "a"]
print(Counter(words))  # Counter({'a': 3, 'b': 2, 'c': 1})

by_len: dict[int, list[str]] = defaultdict(list)
for w in words:
    by_len[len(w)].append(w)
```

**Dict comprehension / invert:**

```python
scores = {"alice": 10, "bob": 7}
passed = {k: v for k, v in scores.items() if v >= 8}
# invert (values must be unique/hashable)
inv = {v: k for k, v in scores.items()}
```

**Pattern matching (3.10+):**

```python
payload = {"type": "user", "id": 42}

match payload:
    case {"type": "user", "id": int(uid)}:
        print("user", uid)
    case _:
        print("unknown")
```

## ⚠️ Pitfalls

- `d[key]` raises `KeyError` if missing—use `.get` or `in`.
- Mutating a dict while iterating its views is unsafe; iterate over `list(d)` or copy.
- Nested dicts share references—`copy()` is shallow; use `copy.deepcopy` when needed.
- Using unhashable types as keys raises `TypeError`.
- `dict` equality ignores order; do not rely on order for identity checks.

## 🔗 Related

- [Types](types.md)
- [Loops](loops.md)
- [*args and **kwargs](kwags.md)
- [Strings](strings.md)
- [Examples: list to dict](Examples/list_to_dict.md)
- [Examples: merge lists](Examples/merge_lists.md)
