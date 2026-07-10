# Scope and Namespaces

_Python · Reference cheat sheet_

---

## 📋 Overview

Name lookup follows the **LEGB** rule: Local → Enclosing → Global → Built-in. Assignment creates bindings in the current scope unless `global` or `nonlocal` is declared. Each module and function has its own namespace.

## 🔧 Core concepts

| Scope | Where |
| --- | --- |
| Local | Current function |
| Enclosing | Outer function(s) — closures |
| Global | Module level |
| Built-in | `builtins` module |
| `global x` | Bind / assign module name |
| `nonlocal x` | Rebind enclosing function name |
| Class body | Its own namespace; methods don't see it as enclosing for LEGB |

Comprehensions (3.x) have their own local scope for loop targets.

## 💡 Examples

**LEGB:**

```python
len = 3  # shadows built-in — avoid!

def outer() -> None:
    x = "enclosing"

    def inner() -> None:
        print(x)  # enclosing

    inner()

outer()
```

**global / nonlocal:**

```python
counter = 0

def bump_global() -> None:
    global counter
    counter += 1

def make_counter():
    n = 0

    def inc() -> int:
        nonlocal n
        n += 1
        return n

    return inc
```

**Class vs instance:**

```python
class Demo:
    kind = "demo"

    def label(self) -> str:
        # 'kind' is not local; looked up on class via self/type
        return self.kind

print(Demo().label())
```

**Inspect:**

```python
import builtins

def f(a: int = 1) -> None:
    b = 2
    print(locals())
    print("sum" in dir(builtins))

f()
```

## ⚠️ Pitfalls

- Assignment anywhere in a function makes the name local for the whole function — easy `UnboundLocalError`.
- Shadowing builtins (`list`, `id`, `type`) causes confusing bugs.
- `from module import *` pollutes namespaces — avoid.
- Class attributes vs instance attributes: mutable class attrs are shared.
- Closures late-bind — see [closures](closures.md).

## 🔗 Related

- [Closures](closures.md)
- [Functions](functions.md)
- [Classes](classes.md)
- [Import / export](import_export.md)
- [Walrus](walrus.md)
- [Lambda](lambda.md)
