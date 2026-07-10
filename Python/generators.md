# Generators

_Python · Reference cheat sheet_

---

## 📋 Overview

Generators produce values lazily with `yield`. They pause and resume, saving memory for large or infinite streams. Generator functions return generator iterators; generator expressions use `(...)`.

## 🔧 Core concepts

| Concept | Detail |
| --- | --- |
| `yield` | Produce a value; suspend frame |
| `yield from` | Delegate to a sub-iterator |
| `return` | Sets `StopIteration.value` |
| `.send` / `.throw` | Advanced coroutine-style control |
| Gen exp | `(x for x in it)` |
| Exhaustion | One-shot; recreate to reuse |

Generators implement the iterator protocol (`__iter__`, `__next__`).

## 💡 Examples

**Basic generator:**

```python
from collections.abc import Iterator

def countdown(n: int) -> Iterator[int]:
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)))  # [3, 2, 1]
```

**yield from and piping:**

```python
def chain_iters(*iters: Iterator[int]) -> Iterator[int]:
    for it in iters:
        yield from it

print(list(chain_iters(iter([1, 2]), iter([3]))))
```

**Infinite stream (take n):**

```python
from collections.abc import Iterator
from itertools import islice

def naturals() -> Iterator[int]:
    n = 0
    while True:
        yield n
        n += 1

print(list(islice(naturals(), 5)))  # [0, 1, 2, 3, 4]
```

**Generator expression:**

```python
paths = ("a.txt", "b.txt", "c.txt")
sizes = (len(p) for p in paths)
print(sum(sizes))
# sizes is exhausted — sum(sizes) again is 0
```

## ⚠️ Pitfalls

- Generators are single-use; convert to `list` if you need multiple passes.
- Mixing heavy side effects with `yield` makes control flow hard to follow.
- Forgetting to iterate means the body never runs (lazy).
- `return` inside a generator does not return to the caller as a normal value.
- Prefer async generators (`async def` + `yield`) for async streams — see [async](async.md).

## 🔗 Related

- [Iterators](iterators.md)
- [Comprehensions](comprehensions.md)
- [Itertools](itertools.md)
- [Loops](loops.md)
- [Async / await](async.md)
- [Context managers](context_managers.md)
