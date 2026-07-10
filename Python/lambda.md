# Lambda

_Python · Reference cheat sheet_

---

## 📋 Overview

A `lambda` creates a small anonymous function from a single expression. Use for short callbacks (`sort` keys, `map`/`filter`) when a full `def` would be noise. Prefer named `def` for anything non-trivial or multi-statement.

## 🔧 Core concepts

| Form | Meaning |
| --- | --- |
| `lambda args: expr` | Returns `expr`; no statements |
| Parameters | Same rules as `def` (defaults, `*`, `**`) |
| Scope | Closure over enclosing names (LEGB) |
| Type | Ordinary function object |

Lambdas cannot contain `return`, assignments (except walrus in 3.8+ inside expr), or multiple statements. Annotations on lambdas are awkward — prefer `def`.

## 💡 Examples

**Sort and group keys:**

```python
rows = [("ada", 3), ("bob", 1), ("cy", 2)]
rows.sort(key=lambda pair: pair[1])
# [("bob", 1), ("cy", 2), ("ada", 3)]
```

**With map / filter (often better as comprehension):**

```python
nums = [1, 2, 3, 4]
doubled = list(map(lambda n: n * 2, nums))
evens = list(filter(lambda n: n % 2 == 0, nums))
# Prefer: [n * 2 for n in nums], [n for n in nums if n % 2 == 0]
```

**Callable default / partial-like:**

```python
ops = {
    "add": lambda a, b: a + b,
    "mul": lambda a, b: a * b,
}
print(ops["add"](2, 3))
```

**Capture loop variable correctly:**

```python
# Wrong: all lambdas see final i
bad = [lambda: i for i in range(3)]
# Right: default-arg bind
good = [lambda i=i: i for i in range(3)]
print([f() for f in good])  # [0, 1, 2]
```

## ⚠️ Pitfalls

- Do not stuff complex logic into lambdas — readability collapses.
- Late binding in closures: loop variables need default-arg capture.
- `lambda` has no good docstring / name in stack traces (`<lambda>`).
- Prefer comprehensions over `map`/`filter` + lambda in most Python code.
- Cannot assign annotations cleanly; use `def` for public APIs.

## 🔗 Related

- [Functions](functions.md)
- [Closures](closures.md)
- [Decorators](decorators.md)
- [Zip / enumerate / map / filter](zip_enumerate_map_filter.md)
- [Comprehensions](comprehensions.md)
- [Walrus](walrus.md)
