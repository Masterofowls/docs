# Glossary

_Python · Reference cheat sheet_

---

## 📋 Overview

Alphabetical glossary of core Python terms covering types, syntax, OOP, packaging, and runtime concepts you meet daily.

## 🔧 Core concepts

| Term | Definition |
| --- | --- |
| Annotation | Optional type hint attached to a variable, parameter, or return value. |
| Argument | A value passed into a function when it is called. |
| Bytecode | Intermediate instructions CPython compiles source into before the interpreter runs it. |
| Class | A blueprint that defines attributes and methods for creating objects. |
| Closure | A nested function that remembers variables from its enclosing scope. |
| Comprehension | Compact syntax that builds a list, set, or dict from an iterable expression. |
| Context manager | An object usable with `with` that sets up and tears down a resource. |
| Coroutine | An `async def` function that can pause and resume with `await`. |
| Decorator | A callable that wraps another function or class to modify behavior. |
| Descriptor | An object defining `__get__`/`__set__`/`__delete__` that customizes attribute access. |
| Dict | A mutable mapping of unique hashable keys to values. |
| Dunder | A “double underscore” special method or attribute such as `__init__`. |
| Exception | An error object raised to interrupt normal control flow. |
| Generator | A function using `yield` that produces values lazily as an iterator. |
| GIL | Global Interpreter Lock that allows only one CPython bytecode thread at a time. |
| Immutable | A value that cannot change after creation, such as `str`, `tuple`, or `frozenset`. |
| Import | The mechanism that loads a module or package into the current namespace. |
| Iterator | An object with `__next__` that yields items until `StopIteration`. |
| Lambda | A small anonymous function expressed as `lambda args: expression`. |
| List | An ordered, mutable sequence of elements. |
| Method | A function defined on a class and bound to an instance when accessed. |
| Module | A single `.py` file that can be imported as a namespace. |
| Mutable | An object whose contents can change in place, such as `list` or `dict`. |
| Namespace | A mapping from names to objects, such as locals, globals, or a module dict. |
| Package | A directory of modules, typically with `__init__.py`, importable as a unit. |
| Parameter | A named slot in a function definition that receives an argument. |
| Property | A managed attribute exposed via getter/setter methods using `@property`. |
| Set | An unordered collection of unique hashable elements. |
| Slice | A range of indices written as `start:stop:step` used to extract subsequences. |
| Statement | A complete instruction that performs an action, such as assignment or `return`. |
| Tuple | An ordered, immutable sequence often used for fixed groupings. |
| Virtual environment | An isolated Python install directory for project-specific packages. |
| Walrus operator | The `:=` operator that assigns a value inside an expression. |

## 💡 Examples

**Comprehension and slice:**

```python
nums = [1, 2, 3, 4, 5]
evens = [n for n in nums if n % 2 == 0]
print(nums[1:4])  # [2, 3, 4]
```

**Decorator and context manager:**

```python
from functools import wraps
from pathlib import Path

def once(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs)
    return wrapper

with Path("notes.txt").open() as f:
    text = f.read()
```

**Walrus operator:**

```python
while (line := input(">> ")) != "quit":
    print(line.upper())
```

## ⚠️ Pitfalls

- Confusing **parameter** (definition) with **argument** (call-site value).
- Mixing **list** (mutable) with **tuple** (immutable) when APIs expect one or the other.
- Treating **iterator** and **iterable** as the same — an iterable can be re-looped; many iterators cannot.
- Assuming **annotation** enforces types at runtime — they are hints unless a checker or validator runs.
- Equating **module** and **package** — a package is a collection of modules.

## 🔗 Related

- [lists](lists.md)
- [dictionaries](dictionaries.md)
- [decorators](decorators.md)
- [generators](generators.md)
- [exceptions](exceptions.md)
- [venv](venv.md)
