# Enums

_Python · Reference cheat sheet_

---

## 📋 Overview

`enum.Enum` defines a set of named symbolic values. Use enums instead of magic strings/ints for status codes, modes, and options. Python 3.11+ adds `StrEnum`, improved `Flag`, and more.

## 🔧 Core concepts

| Type | Use |
| --- | --- |
| `Enum` | Classic named values |
| `IntEnum` | Comparable to `int` |
| `StrEnum` | `str` mixin (3.11+) |
| `Flag` / `IntFlag` | Bitwise combinations |
| `auto()` | Auto-assign values |
| `enum.unique` | Decorator: forbid duplicate values |

Members are singletons: `Color.RED is Color.RED`. Access by name (`Color["RED"]`) or value (`Color(1)`).

## 💡 Examples

**Basic Enum:**

```python
from enum import Enum, auto

class Status(Enum):
    PENDING = auto()
    RUNNING = auto()
    DONE = auto()

s = Status.RUNNING
print(s.name, s.value)
print(Status["DONE"])
```

**StrEnum (3.11+):**

```python
from enum import StrEnum

class Role(StrEnum):
    ADMIN = "admin"
    USER = "user"

def greet(role: Role) -> str:
    return f"hello {role}"  # role is a str

assert Role.ADMIN == "admin"
```

**Flags:**

```python
from enum import Flag, auto

class Perm(Flag):
    READ = auto()
    WRITE = auto()
    EXEC = auto()

rw = Perm.READ | Perm.WRITE
print(Perm.READ in rw)
print(bool(rw & Perm.EXEC))
```

**Match (3.10+):**

```python
match Status.DONE:
    case Status.PENDING | Status.RUNNING:
        print("busy")
    case Status.DONE:
        print("finished")
    case _:
        print("unknown")
```

## ⚠️ Pitfalls

- Comparing `Enum` to raw ints fails unless you use `IntEnum`.
- Functional API `Enum("Color", "RED GREEN")` is less readable for large enums.
- Pickling / JSON: serialize `.value` or `.name` explicitly.
- Do not mutate `.value` on members.
- `auto()` values depend on declaration order — stable only if you don't reorder carelessly.

## 🔗 Related

- [Classes](classes.md)
- [Dataclasses](dataclasses.md)
- [Conditionals](conditionals.md)
- [Typing hints](typing_hints.md)
- [JSON](json.md)
- [Exceptions](exceptions.md)
