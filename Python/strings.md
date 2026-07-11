# Strings

_Python · Reference cheat sheet_

---

## 📋 Overview

`str` is an immutable sequence of Unicode code points. Build strings with f-strings, `join`, and methods like `split`/`strip`/`replace`. Prefer methods and the `str` API over manual index loops. For binary data use `bytes` / `bytearray`.

## 🔧 Core concepts

**Literals / access**

| Area | Notes |
| --- | --- |
| Literals | `'...'`, `"..."`, `'''...'''`, `"""..."""`, raw `r"..."`, f-strings |
| Immutability | Methods return **new** strings |
| Index / slice | `s[0]`, `s[-1]`, `s[1:4]`, `s[::-1]` |
| Encode | `s.encode("utf-8")`, `b.decode("utf-8")` |

**Search / test**

| Method | Notes |
| --- | --- |
| `in` / `find` / `rfind` | Substring; `find` → −1 if missing |
| `index` / `rindex` | Like find; raises `ValueError` |
| `startswith` / `endswith` | Prefix/suffix; tuple of options ok |
| `count(sub[, start[, end]])` | Non-overlapping count |
| `isalnum` / `isalpha` / `isdigit` / `isdecimal` / `isnumeric` | Character class tests |
| `islower` / `isupper` / `istitle` / `isspace` / `isidentifier` / `isprintable` | More predicates |

**Case / strip / pad / align**

| Method | Notes |
| --- | --- |
| `lower` / `upper` / `title` / `capitalize` / `swapcase` | Case transforms |
| `casefold()` | Aggressive caseless matching |
| `strip` / `lstrip` / `rstrip` | Trim chars (default whitespace) |
| `removeprefix` / `removesuffix` | Exact affix remove (3.9+) |
| `center` / `ljust` / `rjust` / `zfill` | Pad / zero-pad |

**Split / join / partition / replace**

| Method | Notes |
| --- | --- |
| `split(sep=None, maxsplit=-1)` | `None` collapses whitespace |
| `rsplit` / `splitlines(keepends=False)` | From right; by line breaks |
| `partition` / `rpartition` | → `(before, sep, after)` |
| `",".join(parts)` | Join iterable of **str** |
| `replace(old, new, count=-1)` | Replace occurrences |
| `translate(table)` / `maketrans` | Char mapping (fast multi-replace) |
| `format` / `format_map` / f-strings | Interpolation |

Multiline strings keep newlines; use `textwrap.dedent` for indented source blocks.

## 💡 Examples

**Clean and split:**

```python
raw = "  Ada, Bob, Cary  "
names = [p.strip() for p in raw.split(",")]
print(names)  # ['Ada', 'Bob', 'Cary']
print(", ".join(names))
```

**Checks and replace:**

```python
path = "Report.PDF"
print(path.lower().endswith(".pdf"))
print(path.removesuffix(".PDF") + ".pdf")  # 3.9+
```

**Slicing and membership:**

```python
s = "python"
print(s[1:4])      # yth
print("th" in s)   # True
print(s[::-1])     # nohtyp
```

**Bytes boundary:**

```python
text = "café"
data = text.encode("utf-8")
print(data)                 # b'caf\xc3\xa9'
print(data.decode("utf-8"))
```

## ⚠️ Pitfalls

- `str` is immutable—`s[0] = "X"` is illegal; build a new string.
- `+` in a loop is quadratic for large joins—use `"".join(parts)`.
- Default `split()` collapses whitespace; `split(" ")` does not.
- Comparing with `==` is case-sensitive; normalize with `casefold()` for caseless match.
- Mixing `str` and `bytes` raises `TypeError`—decode/encode explicitly.

## 🔗 Related

- [F-strings](f-string.md)
- [Types](types.md)
- [Loops](loops.md)
- [Docstrings](docstrings.md)
- [Dictionaries](dictionaries.md)
- [Examples: convert files](Examples/convert_files.md)
