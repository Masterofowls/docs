# Slicing

_Python · Reference cheat sheet_

---

## 📋 Overview

Slicing extracts subsequences with `seq[start:stop:step]`. Works on lists, tuples, strings, bytes, and custom sequences implementing `__getitem__`. Slices return a new object for built-in sequences (shallow copy of references).

## 🔧 Core concepts

| Form | Meaning |
| --- | --- |
| `s[i]` | Single index (negatives from end) |
| `s[a:b]` | From `a` inclusive to `b` exclusive |
| `s[a:b:c]` | Step `c` |
| `s[:]` | Shallow copy (list/tuple/str) |
| `s[::-1]` | Reversed copy |
| `slice(a, b, c)` | Slice object |
| Assign | `xs[a:b] = iterable` (lists) |

Omitted bounds default to ends. Out-of-range slice bounds are clipped; single-index OOB raises `IndexError`.

## 💡 Examples

**Basics:**

```python
xs = ["a", "b", "c", "d", "e"]
print(xs[1:4])     # ['b', 'c', 'd']
print(xs[:2])      # ['a', 'b']
print(xs[::2])     # ['a', 'c', 'e']
print(xs[::-1])    # ['e', 'd', 'c', 'b', 'a']
print(xs[-3:-1])   # ['c', 'd']
```

**Strings and bytes:**

```python
text = "Python"
print(text[1:4])       # "yth"
print(text[::-1])      # "nohtyP"
data = b"\x00\x01\x02\x03"
print(data[1:3])       # b'\x01\x02'
```

**List slice assign / delete:**

```python
nums = [0, 1, 2, 3, 4]
nums[1:3] = [8, 9, 10]   # [0, 8, 9, 10, 3, 4]
del nums[2:4]            # [0, 8, 3, 4]
nums[::2] = [7, 7]       # length must match for extended slice
```

**slice object:**

```python
window = slice(1, 4)
print("abcdef"[window])  # "bcd"
```

## ⚠️ Pitfalls

- `xs[:]` is shallow — nested mutables are shared.
- Slice assignment length rules differ for plain vs extended (`step != 1`) slices.
- `s[i:j]` never raises for bad bounds; `s[i]` does.
- Strings/tuples are immutable — cannot slice-assign.
- Copying huge sequences with `[:]` costs memory; prefer views/iterators when possible.

## 🔗 Related

- [Lists](lists.md)
- [Strings](strings.md)
- [Tuples](tuples.md)
- [Bytes / bytearray](bytes_bytearray.md)
- [Copy / deepcopy](copy_deepcopy.md)
- [Comprehensions](comprehensions.md)
