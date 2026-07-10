# Regex

_Python · Reference cheat sheet_

---

## 📋 Overview

The `re` module provides regular expressions for search, match, split, and substitute. Prefer raw strings (`r"..."`). For complex grammars, consider parsers; for fixed substrings, prefer `str` methods.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `re.search` | First match anywhere |
| `re.match` | Match at start |
| `re.fullmatch` | Entire string |
| `re.findall` / `finditer` | All matches |
| `re.split` | Split by pattern |
| `re.sub` | Replace |
| `re.compile` | Reuse pattern |
| Flags | `IGNORECASE`, `MULTILINE`, `DOTALL`, `VERBOSE` |

Groups: `(...)` capturing, `(?:...)` non-capturing, `(?P<name>...)` named. Conditional patterns exist but stay rare.

## 💡 Examples

**Search and groups:**

```python
import re

text = "user=ada id=42"
m = re.search(r"user=(?P<user>\w+)\s+id=(?P<id>\d+)", text)
if m:
    print(m.group("user"), int(m.group("id")))
```

**Compile and findall:**

```python
import re

email = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")
print(email.findall("a@x.com b@y.org"))
```

**sub and backrefs:**

```python
import re

raw = "2024-07-10"
print(re.sub(r"(\d{4})-(\d{2})-(\d{2})", r"\2/\3/\1", raw))
```

**VERBOSE + flags:**

```python
import re

pattern = re.compile(
    r"""
    ^
    (?P<year>\d{4}) -
    (?P<month>\d{2}) -
    (?P<day>\d{2})
    $
    """,
    re.VERBOSE,
)
print(pattern.fullmatch("2024-07-10").groupdict())  # type: ignore[union-attr]
```

## ⚠️ Pitfalls

- Catastrophic backtracking on crafted input — avoid nested ambiguous quantifiers on untrusted data.
- `re.match` only checks the start — use `fullmatch` or `search` intentionally.
- Forgetting raw strings: `"\n"` vs `r"\n"` / `"\\d"` mistakes.
- `str.split` / `replace` is clearer for fixed delimiters.
- Bytes patterns require `bytes` input — don't mix str/bytes.

## 🔗 Related

- [Strings](strings.md)
- [F-strings](f-string.md)
- [JSON](json.md)
- [Examples: scrape HTML](Examples/scrape_html.md)
- [Files I/O](files_io.md)
- [Argparse](argparse.md)
