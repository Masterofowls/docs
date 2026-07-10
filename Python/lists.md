# Lists

_Python · Reference cheat sheet_

---

## 📋 Overview

A `list` is an ordered, mutable sequence. Use for collections that grow, shrink, or change in place. Prefer list methods and comprehensions over manual index loops. Heterogeneous types are allowed; typed code usually keeps one element type.

## 🔧 Core concepts

| Operation | Example |
| --- | --- |
| Create | `[1, 2]`, `list(iterable)`, `[]` |
| Index / slice | `xs[0]`, `xs[-1]`, `xs[1:3]` |
| Append / extend | `xs.append(x)`, `xs.extend(ys)`, `xs += ys` |
| Insert / remove | `xs.insert(i, x)`, `xs.pop()`, `xs.remove(x)` |
| Search | `x in xs`, `xs.index(x)`, `xs.count(x)` |
| Sort | `xs.sort(key=..., reverse=...)`, `sorted(xs)` |
| Copy | `xs.copy()`, `xs[:]`, `list(xs)` (shallow) |

Lists are dynamic arrays; append/pop at the end is amortized O(1). Insert/delete at the front is O(n).

## 💡 Examples

**Build and mutate:**

```python
nums: list[int] = [3, 1, 4]
nums.append(1)
nums.extend([5, 9])
nums.insert(0, 0)
last = nums.pop()          # 9
nums.remove(1)             # removes first 1
print(nums)                # [0, 3, 4, 1, 5]
```

**Sort with key:**

```python
people = [{"name": "bob", "age": 30}, {"name": "ada", "age": 25}]
people.sort(key=lambda p: p["age"])
names = sorted(people, key=lambda p: p["name"])
```

**Comprehension and unpacking:**

```python
squares = [n * n for n in range(6) if n % 2 == 0]
a, *mid, z = [10, 20, 30, 40]
# a=10, mid=[20, 30], z=40
```

**Stack / queue patterns:**

```python
stack: list[str] = []
stack.append("a")
stack.pop()                # LIFO

from collections import deque
q: deque[str] = deque()
q.append("a")
q.popleft()                # FIFO — prefer deque over list.pop(0)
```

## ⚠️ Pitfalls

- `xs + ys` creates a new list; `xs.extend(ys)` mutates in place.
- `xs *= n` and `[[] ] * n` share references for mutable elements.
- `list.sort` returns `None` — use `sorted` when you need a new list.
- Shallow copy does not deep-copy nested lists — see [copy / deepcopy](copy_deepcopy.md).
- Prefer `deque` for frequent left pops; lists are poor queues.

## 🔗 Related

- [Tuples](tuples.md)
- [Sets](sets.md)
- [Slicing](slicing.md)
- [Comprehensions](comprehensions.md)
- [Unpacking](unpacking.md)
- [Examples: merge lists](Examples/merge_lists.md)
