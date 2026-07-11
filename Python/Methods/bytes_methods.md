# Bytes & Bytearray Methods

_Python · Methods reference_

---

## 📋 Overview

`bytes` is immutable; `bytearray` is mutable with extra in-place methods.

## 🔧 Methods

### Shared (bytes & bytearray)

| Method | Description |
| --- | --- |
| `decode(encoding=…, errors=…)` | str from bytes |
| `hex([sep])` | Hex string |
| `fromhex(string)` | Class: bytes from hex (classmethod) |
| `count(sub[, start[, end]])` | Count sub-sequence |
| `find` / `rfind` / `index` / `rindex` | Sub-sequence search |
| `startswith` / `endswith` | Prefix/suffix on bytes |
| `split(sep=None)` / `rsplit` / `partition` | Split bytes |
| `strip` / `lstrip` / `rstrip` | Trim bytes |
| `replace(old, new[, count])` | Replace sub-sequence |
| `join(iterable)` | Join byte sequences |
| `maketrans` / `translate` | Byte translation table |

### bytearray only

| Method | Description |
| --- | --- |
| `append(i)` / `extend(iterable)` | Add bytes at end |
| `insert(i, b)` / `remove(value)` / `pop([i])` | Mutate sequence |
| `clear()` / `reverse()` | Clear or reverse in place |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Bytes & bytearray](../bytes_bytearray.md)
