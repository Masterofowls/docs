# Operators

_Python · Reference cheat sheet_

---

## 📋 Overview

Python operators cover arithmetic, comparison, boolean logic, bitwise ops, membership, identity, and assignment variants. Precedence matters; use parentheses for clarity. Many operators map to magic methods.

## 🔧 Core concepts

| Group | Operators |
| --- | --- |
| Arithmetic | `+ - * / // % **` |
| Comparison | `== != < <= > >=` |
| Boolean | `and or not` (short-circuit) |
| Identity | `is`, `is not` |
| Membership | `in`, `not in` |
| Bitwise | `& \| ^ ~ << >>` |
| Assign | `=`, `+=`, `:=` (walrus) |
| Merge (3.9+) | `d1 \| d2` for dicts |
| Matrix | `@` (e.g. NumPy) |

`/` always float division; `//` floor division. `and`/`or` return operands, not strict bools.

## 💡 Examples

**Arithmetic and div:**

```python
print(7 / 2)    # 3.5
print(7 // 2)   # 3
print(7 % 2)    # 1
print(2 ** 10)  # 1024
print(-7 // 2)  # -4 (floors toward -inf)
```

**Boolean and chaining:**

```python
x = 5
print(1 < x < 10)          # True — chained comparisons
print("" or "default")     # "default"
print("hi" and "there")    # "there"
```

**Identity vs equality:**

```python
a = [1, 2]
b = [1, 2]
print(a == b)   # True — equal values
print(a is b)   # False — different objects
print(a is not None)
```

**Dict merge and augmented assign:**

```python
left = {"a": 1}
right = {"b": 2}
merged = left | right          # {"a": 1, "b": 2}
left |= {"a": 9}               # left -> {"a": 9}

n = 3
n *= 2                         # 6
```

## ⚠️ Pitfalls

- `is` is not for value equality (except `None`, `True`, `False`, enums).
- Mutable `+=` may mutate in place (`list`) or rebind (`tuple`).
- `and`/`or` return last evaluated operand — type may not be `bool`.
- Bitwise `&` / `|` on ints ≠ boolean `and` / `or`.
- Mixed `==` across types is usually `False` (no coercion like JS).

## 🔗 Related

- [Magic methods](magic_methods.md)
- [Truthiness](truthiness.md)
- [Walrus](walrus.md)
- [Conditionals](conditionals.md)
- [Slicing](slicing.md)
- [Unpacking](unpacking.md)
