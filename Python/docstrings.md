# Docstrings

_Python · Reference cheat sheet_

---

## 📋 Overview

Docstrings are string literals as the first statement in a module, class, function, or method. Tools (`help()`, Sphinx, IDEs) read them via `__doc__`. Prefer clear one-liners for simple APIs; use structured styles (Google, NumPy, reST) for public libraries.

## 🔧 Core concepts

| Rule | Detail |
| --- | --- |
| Placement | First statement inside the body |
| Style | Triple quotes `"""..."""` (PEP 257) |
| One-liner | Imperative mood: `"""Return the user's display name."""` |
| Multi-line | Summary line, blank line, then details |
| Attributes | Document on the class or via Attributes section |
| Type hints | Prefer annotations; docstring describes behavior, not types |

Common sections: `Args`, `Returns`, `Raises`, `Yields`, `Examples`, `Note`.

## 💡 Examples

**Google style:**

```python
def divide(a: float, b: float) -> float:
    """Divide ``a`` by ``b``.

    Args:
        a: Numerator.
        b: Denominator; must be non-zero.

    Returns:
        The quotient ``a / b``.

    Raises:
        ZeroDivisionError: If ``b`` is 0.
    """
    return a / b
```

**Module and class:**

```python
"""User authentication helpers.

This module wraps password hashing and session tokens.
"""

class Session:
    """In-memory session store for a single process."""

    def get(self, key: str) -> str | None:
        """Return the value for ``key``, or ``None`` if missing."""
        ...
```

**Access at runtime:**

```python
def greet(name: str) -> str:
    """Return a greeting for ``name``."""
    return f"Hello, {name}"

print(greet.__doc__)
help(greet)
```

## ⚠️ Pitfalls

- Comments (`#`) are not docstrings and are not exposed via `help()`.
- Putting code between the signature and the docstring breaks `__doc__`.
- Do not duplicate type information already in annotations.
- Keep examples in docstrings executable when using doctest; stale examples mislead.
- Private helpers can use short one-liners; over-documenting noise hurts readability.

## 🔗 Related

- [Types](types.md)
- [F-strings](f-string.md)
- [Import / export](import_export.md)
- [*args and **kwargs](kwags.md)
- [Strings](strings.md)
