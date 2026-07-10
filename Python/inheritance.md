# Inheritance

_Python · Reference cheat sheet_

---

## 📋 Overview

Inheritance reuses and specializes behavior via subclasses. Python uses C3 MRO for multiple inheritance. Prefer shallow hierarchies, explicit `super()`, and protocols/ABCs for shared interfaces.

## 🔧 Core concepts

| Topic | Notes |
| --- | --- |
| Subclass | `class Child(Parent):` |
| Override | Redefine method in child |
| `super()` | Cooperative call to next MRO class |
| MRO | `Class.__mro__`, `Class.mro()` |
| `isinstance` / `issubclass` | Runtime type checks |
| Multiple inheritance | `class C(A, B):` — order matters |
| Mixin | Small reusable behavior class |

`super()` without args works inside methods (3.x); binds using the defining class and instance.

## 💡 Examples

**Single inheritance + super:**

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name = name

    def speak(self) -> str:
        return "..."

class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        super().__init__(name)
        self.breed = breed

    def speak(self) -> str:
        return "woof"
```

**Mixin:**

```python
class JsonMixin:
    def to_json(self) -> str:
        import json
        return json.dumps(self.__dict__)

class Point(JsonMixin):
    def __init__(self, x: int, y: int) -> None:
        self.x = x
        self.y = y

print(Point(1, 2).to_json())
```

**MRO peek:**

```python
class A:
    def ping(self) -> str:
        return "A"

class B(A):
    def ping(self) -> str:
        return "B>" + super().ping()

class C(A):
    def ping(self) -> str:
        return "C>" + super().ping()

class D(B, C):
    def ping(self) -> str:
        return "D>" + super().ping()

print(D().ping())       # D>B>C>A
print(D.__mro__)
```

## ⚠️ Pitfalls

- Diamond problems: always use `super()` consistently in cooperative hierarchies.
- Parent `__init__` not called → missing attributes; call `super().__init__`.
- Overusing inheritance for code reuse — prefer composition / mixins carefully.
- Changing base method signatures breaks Liskov expectations for callers.
- `isinstance` checks can fight duck typing; prefer protocols when flexible.

## 🔗 Related

- [Classes](classes.md)
- [ABC / protocols](abc_protocols.md)
- [Magic methods](magic_methods.md)
- [Dataclasses](dataclasses.md)
- [Exceptions](exceptions.md)
- [Typing hints](typing_hints.md)
