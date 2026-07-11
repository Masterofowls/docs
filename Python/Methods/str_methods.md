# String Methods

_Python · Methods reference_

---

## 📋 Overview

All standard `str` instance methods (Python 3). Strings are immutable — methods return new strings.

## 🔧 Methods

### Search & test

| Method | Returns | Description |
| --- | --- | --- |
| `find(sub[, start[, end]])` | int | First index or -1 |
| `rfind(sub[, start[, end]])` | int | Last index or -1 |
| `index(sub[, start[, end]])` | int | Like find but ValueError if missing |
| `rindex(sub[, start[, end]])` | int | Like rfind but ValueError if missing |
| `count(sub[, start[, end]])` | int | Non-overlapping occurrences |
| `startswith(prefix[, start[, end]])` | bool | Prefix test (tuple of prefixes OK) |
| `endswith(suffix[, start[, end]])` | bool | Suffix test |
| `isalpha()` / `isdigit()` / … | bool | Character class tests |
| `isalnum()` / `isascii()` / `isdecimal()` | bool | More classification |
| `isidentifier()` / `islower()` / `isupper()` | bool | Identifier / case checks |
| `isnumeric()` / `isprintable()` / `isspace()` | bool | Numeric / printable / whitespace |
| `istitle()` | bool | Title-case words |

### Transform & format

| Method | Description |
| --- | --- |
| `lower()` / `upper()` / `casefold()` | Case conversion (casefold for Unicode) |
| `capitalize()` / `title()` / `swapcase()` | Capitalization variants |
| `strip([chars])` / `lstrip` / `rstrip` | Trim whitespace or chars |
| `removeprefix(p)` / `removesuffix(s)` | Remove prefix/suffix if present (3.9+) |
| `replace(old, new[, count])` | Substring replace |
| `translate(table)` | Character mapping via str.maketrans |
| `maketrans(x, y[, z])` | Static: build translation table |
| `format(*args, **kwargs)` | Format string with placeholders |
| `format_map(mapping)` | Format using mapping only |
| `encode(encoding=…, errors=…)` | Bytes encoding (utf-8 default) |
| `split(sep=None, maxsplit=-1)` | Split into list |
| `rsplit(sep=None, maxsplit=-1)` | Split from right |
| `splitlines([keepends])` | Split on line boundaries |
| `join(iterable)` | Join strings with self as separator |
| `partition(sep)` / `rpartition(sep)` | Split into (head, sep, tail) |
| `center(width[, fillchar])` | Center pad |
| `ljust(width[, fillchar])` / `rjust` | Left/right pad |
| `zfill(width)` | Zero-fill numeric strings |
| `expandtabs([tabsize])` | Tabs to spaces |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Strings](../strings.md)
- [Regex](../regex.md)
- [F-string](../f-string.md)
