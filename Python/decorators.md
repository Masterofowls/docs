# Decorators

_Python · Reference cheat sheet_

---

## 📋 Overview

A decorator is a callable that wraps another callable to add behavior (logging, timing, caching, auth). Syntax `@decorator` above `def`/`class` is sugar for `f = decorator(f)`. Preserve metadata with `functools.wraps`.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `@dec` | `f = dec(f)` |
| `@dec(args)` | `f = dec(args)(f)` — factory |
| `functools.wraps` | Copy `__name__`, `__doc__`, annotations |
| `functools.lru_cache` | Memoization |
| `functools.cache` | Unbounded cache (3.9+) |
| Class decorators | Transform / register classes |
| Stacked | Applied bottom-up |

Decorators work on methods too; be careful with `self` and descriptors.

## 💡 Examples

**Simple wrapper:**

```python
import functools
import time
from collections.abc import Callable
from typing import TypeVar

F = TypeVar("F", bound=Callable[..., object])

def timed(fn: F) -> F:
    @functools.wraps(fn)
    def wrapper(*args: object, **kwargs: object) -> object:
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(f"{fn.__name__}: {time.perf_counter() - start:.4f}s")
    return wrapper  # type: ignore[return-value]

@timed
def work(n: int) -> int:
    return sum(range(n))
```

**Decorator with arguments:**

```python
def repeat(times: int):
    def deco(fn: Callable[..., object]) -> Callable[..., object]:
        @functools.wraps(fn)
        def wrapper(*args: object, **kwargs: object) -> object:
            result = None
            for _ in range(times):
                result = fn(*args, **kwargs)
            return result
        return wrapper
    return deco

@repeat(3)
def ping() -> str:
    print("ping")
    return "ok"
```

**Built-ins:**

```python
from functools import cache, lru_cache

@cache
def fib(n: int) -> int:
    return n if n < 2 else fib(n - 1) + fib(n - 2)

@lru_cache(maxsize=128)
def load(key: str) -> str:
    return key.upper()
```

## ⚠️ Pitfalls

- Forgetting `@wraps` breaks introspection, tests, and OpenAPI tools.
- Order of stacked decorators matters (`@a` then `@b` → `a(b(f))`).
- Caching mutable/unhashable args fails with `lru_cache`.
- Decorating instance methods: wrapper still receives `self` as first arg.
- Class decorators replace the class object — return the class (or a new one).

## 🔗 Related

- [Functions](functions.md)
- [Closures](closures.md)
- [Classes](classes.md)
- [Properties / descriptors](properties_descriptors.md)
- [Typing hints](typing_hints.md)
- [Logging](logging.md)
