# Loops

_Python · Reference cheat sheet_

---

## 📋 Overview

Python iterates with `for` over any iterable and `while` for condition-driven loops. Prefer `for` + comprehensions over index arithmetic. Control flow: `break`, `continue`, `else` on loops (runs if no `break`), and `enumerate` / `zip` for paired iteration.

## 🔧 Core concepts

| Construct | Use |
| --- | --- |
| `for x in iterable` | Iterate values |
| `for i, x in enumerate(xs)` | Index + value |
| `for a, b in zip(xs, ys)` | Parallel iterables |
| `while cond` | Condition loop |
| `break` / `continue` | Exit / next iteration |
| `for`/`while` `else` | Runs if loop did not `break` |
| Comprehensions | `[...]`, `{...}`, `(... for ...)` generators |

`range(stop)`, `range(start, stop[, step])` for integer sequences.

## 💡 Examples

**Enumerate, zip, unpacking:**

```python
names = ["Ada", "Bob"]
scores = [10, 7]

for i, name in enumerate(names, start=1):
    print(i, name)

for name, score in zip(names, scores, strict=True):  # 3.10+
    print(f"{name}: {score}")
```

**Loop else (search):**

```python
needle = 4
for n in [1, 2, 3]:
    if n == needle:
        print("found")
        break
else:
    print("not found")
```

**Comprehensions and generators:**

```python
squares = [n * n for n in range(5) if n % 2 == 0]
gen = (n * n for n in range(1_000_000))  # lazy
total = sum(gen)
```

**While with sentinel:**

```python
from collections.abc import Iterator

def read_chunks() -> Iterator[str]:
    yield "a"
    yield "b"

it = iter(read_chunks())
while True:
    try:
        chunk = next(it)
    except StopIteration:
        break
    print(chunk)
```

## ⚠️ Pitfalls

- Do not mutate a list you are iterating; iterate a copy or build a new list.
- `for i in range(len(xs))` is usually worse than `for x in xs` / `enumerate`.
- Infinite `while True` needs a clear exit; prefer iterators when possible.
- `zip` truncates to the shortest iterable unless `strict=True`.
- Creating huge lists with comprehensions can exhaust memory—use generators.

## 🔗 Related

- [Dictionaries](dictionaries.md)
- [Types](types.md)
- [Strings](strings.md)
- [*args and **kwargs](kwags.md)
- [Async / await](async.md)
- [Examples: merge lists](Examples/merge_lists.md)
