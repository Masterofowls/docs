# Array & Object Methods (Typed)

_TypeScript · Methods reference_

---

## 📋 Overview

Runtime methods same as JavaScript; TypeScript adds typed array helpers and readonly variants.

## 🔧 Methods

### Typed array helpers

| API | Description |
| --- | --- |
| `ReadonlyArray<T>` / `readonly T[]` | Immutable array type |
| `Readonly<T>` | Shallow readonly object |
| `Array<T>` / `T[]` | Mutable array syntax |
| `Tuple` types `[T, U]` | Fixed-length typed arrays |
| `as const` tuples | Literal readonly tuples |
| `.includes()` narrowing | With literal union and `as const` |
| `NoInfer<T>` | Block inference in generics (5.4+) |

### Same as JS (see JS Methods)

| Category | Link concept |
| --- | --- |
| Array prototype | map, filter, reduce, find, … |
| String prototype | slice, split, replace, … |
| Object static | keys, entries, assign, … |
| Promise static | all, race, allSettled, … |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Arrays (JS)](../../Javascript/Methods/array_methods.md)
