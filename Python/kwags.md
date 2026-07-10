# *args and **kwargs

_Python · Reference cheat sheet_

---

## 📋 Overview

`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dict. Use them for wrappers, decorators, forward-compatible APIs, and when calling through to another function. Prefer explicit parameters when the API is stable and small.

## 🔧 Core concepts

| Syntax | Role |
| --- | --- |
| `*args` | Extra positional → `tuple` |
| `**kwargs` | Extra keywords → `dict` |
| `*` in def | Keyword-only parameters after `*` |
| `/` in def | Positional-only before `/` (3.8+) |
| Call unpack | `f(*list)`, `f(**dict)` |
| Order in def | params, `*args`, keyword-only, `**kwargs` |

Names `args`/`kwargs` are convention only; `*rest` / `**options` are fine.

## 💡 Examples

**Collect and forward:**

```python
def logged(fn):
    def wrapper(*args, **kwargs):
        print(f"call {fn.__name__}")
        return fn(*args, **kwargs)
    return wrapper

@logged
def add(a: int, b: int) -> int:
    return a + b

add(1, 2)
```

**Mix with explicit params:**

```python
def connect(host: str, port: int = 5432, /, *, timeout: float = 5.0, **opts):
    print(host, port, timeout, opts)

connect("localhost", 5432, timeout=2.0, ssl=True)
```

**Unpacking into calls:**

```python
def greet(name: str, excited: bool = False) -> str:
    return f"Hi {name}{'!' if excited else '.'}"

args = ("Ada",)
kwargs = {"excited": True}
print(greet(*args, **kwargs))
```

**Merge kwargs safely:**

```python
def create_user(name: str, **kwargs):
    defaults = {"active": True, "role": "user"}
    data = {**defaults, **kwargs, "name": name}
    return data
```

## ⚠️ Pitfalls

- Overusing `**kwargs` hides required fields and breaks autocomplete/type checkers—annotate with `TypedDict` or explicit params when possible.
- Duplicate keywords: `f(1, a=1, **{"a": 2})` raises `TypeError`.
- Mutating the received `kwargs` dict can surprise callers if you store it; copy when retaining.
- `*args` typing is limited; prefer `*args: int` (homogeneous) or redesign.
- Forgetting to forward `*args, **kwargs` in wrappers drops arguments silently until call time.

## 🔗 Related

- [Types](types.md)
- [Dictionaries](dictionaries.md)
- [Docstrings](docstrings.md)
- [Import / export](import_export.md)
- [Loops](loops.md)
