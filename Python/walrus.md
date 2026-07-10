# Walrus Operator

_Python · Reference cheat sheet_

---

## 📋 Overview

The walrus operator `:=` (PEP 572, 3.8+) assigns inside an expression. Use it to avoid double computation or awkward control-flow temporaries — sparingly, for clarity.

## 🔧 Core concepts

| Form | Meaning |
| --- | --- |
| `name := expr` | Assign and yield `expr` |
| In `if` / `while` | Bind then test |
| In comprehensions | Bind in filter/value |
| Scope | Same rules as normal assignment in that block |

Cannot replace plain statement assignment everywhere; illegal in some syntactic positions (e.g. unparenthesized in some tuple contexts historically — prefer parentheses when unsure).

## 💡 Examples

**if / while:**

```python
from pathlib import Path

path = Path("data.txt")
if (text := path.read_text(encoding="utf-8")).strip():
    print(text[:20])

while (line := input("cmd> ")) != "quit":
    print("got", line)
```

**Reuse match result:**

```python
import re

pattern = re.compile(r"(\d+)")
if m := pattern.search("id=42"):
    print(int(m.group(1)))
```

**Comprehension:**

```python
def costly(x: int) -> int:
    return x * x

nums = [1, 2, 3, 4]
# compute once per item
big = [y for x in nums if (y := costly(x)) > 5]
print(big)  # [9, 16]
```

**Chunked read:**

```python
from pathlib import Path

with Path("blob.bin").open("rb") as f:
    while chunk := f.read(4096):
        print(len(chunk))
```

## ⚠️ Pitfalls

- Overuse hurts readability — if the name is important, use a normal assignment.
- In comprehensions, the bound name's scope can surprise readers (leaks in some contexts historically; in 3.x comps have isolated scopes for `for` targets, but `:=` targets in the comprehension scope).
- Don't hide side effects inside walrus expressions.
- Not valid as a standalone replacement for all `=` uses.
- Combine carefully with `and`/`or` — parentheses help.

## 🔗 Related

- [Conditionals](conditionals.md)
- [Loops](loops.md)
- [Comprehensions](comprehensions.md)
- [Files I/O](files_io.md)
- [Regex](regex.md)
- [Operators](operators.md)
