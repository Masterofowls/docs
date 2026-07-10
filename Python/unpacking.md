# Unpacking

_Python · Reference cheat sheet_

---

## 📋 Overview

Unpacking assigns elements of iterables (and keys/values of mappings with `**`) into names or containers. Covers tuple unpacking, starred targets, function call unpacking, and dict merges. Related to but broader than [*args/**kwargs](kwags.md).

## 🔧 Core concepts

| Form | Role |
| --- | --- |
| `a, b = pair` | Sequence unpack |
| `a, *rest, z = xs` | Starred target |
| `*args` in call | Unpack iterable as positionals |
| `**kwargs` in call | Unpack mapping as keywords |
| `{**a, **b}` | Dict merge (right wins) |
| `[*a, *b]` | List concat via unpack |
| Nested | ` (a, (b, c)) = ...` |

Length must match unless a starred target absorbs extras. `strict=True` on `zip` helps parallel unpack.

## 💡 Examples

**Basics and star:**

```python
first, second = (10, 20)
head, *mid, tail = [1, 2, 3, 4, 5]
# head=1, mid=[2,3,4], tail=5
```

**Swap and nested:**

```python
a, b = 1, 2
a, b = b, a

row = (1, (2, 3))
i, (j, k) = row
```

**Call site unpacking:**

```python
def greeter(name: str, city: str, *titles: str) -> str:
    extra = " ".join(titles)
    return f"{name} @ {city} {extra}".strip()

args = ("Ada", "London")
opts = {"titles": ("Dr",)}  # won't work as ** for *titles
print(greeter(*args, "Dr"))

vals = [1, 2, 3]
print(max(*vals))
```

**Dict / list merges:**

```python
defaults = {"host": "localhost", "port": 8000}
user = {"port": 9000}
cfg = {**defaults, **user}      # port=9000

a, b = [1, 2], [3, 4]
merged = [*a, *b]               # [1, 2, 3, 4]
```

**For-loop unpack:**

```python
pairs = [("a", 1), ("b", 2)]
for key, value in pairs:
    print(key, value)
```

## ⚠️ Pitfalls

- Too many / too few values raises `ValueError`.
- `**` keys must be strings for function calls.
- Later `**` wins on key clashes — order matters.
- Starred expression in assignment: only one `*` target allowed.
- Unpacking generators consumes them.

## 🔗 Related

- [*args and **kwargs](kwags.md)
- [Tuples](tuples.md)
- [Lists](lists.md)
- [Dictionaries](dictionaries.md)
- [Functions](functions.md)
- [Loops](loops.md)
