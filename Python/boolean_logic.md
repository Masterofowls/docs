# Boolean Logic

_Python · Reference cheat sheet_

---

## 📋 Overview

Boolean logic deals with `True` and `False`. You use it in `if` conditions, loops, and filters. Python’s operators are `and`, `or`, and `not` (words, not `&&` / `||`).

## 🔧 Core concepts

| Piece | Meaning |
| --- | --- |
| `bool` | Type with values `True` / `False` |
| Comparison | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| `and` | True only if both sides are true |
| `or` | True if at least one side is true |
| `not` | Flips truthiness |
| Chaining | `10 < x < 20` works in Python |

Comparisons return booleans. Many other values are *truthy* or *falsy* when used in conditions (see related note).

## 💡 Examples

**Comparisons:**

```python
age = 18
print(age >= 18)   # True
print(age == 21)   # False
print(age != 0)    # True
```

**and / or / not:**

```python
has_ticket = True
is_weekend = False

print(has_ticket and is_weekend)  # False
print(has_ticket or is_weekend)   # True
print(not is_weekend)             # True
```

**if with boolean expressions:**

```python
temp_c = 22
raining = False

if temp_c > 20 and not raining:
    print("Nice walk weather")
elif raining:
    print("Take an umbrella")
else:
    print("Maybe stay in")
```

**Short-circuit evaluation:**

```python
x = 0
# Right side is skipped because left is False
print(x != 0 and (10 / x > 1))  # False, no ZeroDivisionError

name = ""
label = name or "guest"
print(label)  # guest
```

## ⚠️ Pitfalls

- `and` / `or` return one of the *operands*, not always a strict `bool`.
- `==` vs `is`: use `==` for values; `is` for identity (`None` is the common exception).
- `1 < x > 0` is valid chaining — read carefully.
- Do not write `if flag == True:` — prefer `if flag:`.

## 🔗 Related

- [none_and_truthy.md](./none_and_truthy.md)
- [variables.md](./variables.md)
- [indentation.md](./indentation.md)
- [truthiness.md](./truthiness.md)
