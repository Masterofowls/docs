# Copy and Deepcopy

_Python · Reference cheat sheet_

---

## 📋 Overview

Assignment binds names to objects; it does not copy. Use slicing/`list()`/`copy.copy` for shallow copies and `copy.deepcopy` for nested structures. Know when shared references are intentional.

## 🔧 Core concepts

| Operation | Effect |
| --- | --- |
| `b = a` | Same object |
| `a.copy()` / `copy.copy(a)` | Shallow copy |
| `a[:]` (list) | Shallow copy |
| `copy.deepcopy(a)` | Recursive copy |
| Immutable | Often no need to copy (`str`, `tuple` of immutables) |

Shallow: new container, same nested objects. Deep: nested containers cloned (with cycle handling).

## 💡 Examples

**Alias vs shallow:**

```python
import copy

a = [[1], [2]]
alias = a
shallow = copy.copy(a)      # or a[:] / list(a)
alias[0].append(9)
print(a, shallow)           # both see [1, 9] in first row
```

**Deepcopy:**

```python
import copy

a = [[1], [2]]
deep = copy.deepcopy(a)
a[0].append(9)
print(a)     # [[1, 9], [2]]
print(deep)  # [[1], [2]]
```

**Dict / custom:**

```python
import copy

cfg = {"db": {"host": "localhost"}, "debug": True}
cfg2 = {**cfg}                 # shallow
cfg3 = copy.deepcopy(cfg)

class Node:
    def __init__(self, value: int) -> None:
        self.value = value
        self.child: Node | None = None

n = Node(1)
n.child = Node(2)
m = copy.deepcopy(n)
```

## ⚠️ Pitfalls

- `list * n` / `[[0]*3]*3` creates shared inner rows — classic bug.
- Deepcopy can be slow and fail on locks, sockets, modules, or some C objects.
- Dataclass `replace` is shallow for nested mutables.
- Copying is not serialization — for disk/network use JSON/pickle carefully.
- `__copy__` / `__deepcopy__` can customize behavior on your classes.

## 🔗 Related

- [Lists](lists.md)
- [Dictionaries](dictionaries.md)
- [Dataclasses](dataclasses.md)
- [Slicing](slicing.md)
- [Types](types.md)
- [Scope / namespaces](scope_namespaces.md)
