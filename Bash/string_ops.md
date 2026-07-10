# String Operations

_Bash · Reference cheat sheet_

---

## 📋 Overview

Bash can slice and transform strings with parameter expansion—no external `sed` required for common cases. Patterns use glob rules (or regex with `=~`). Prefer expansions for portability within bash; use `printf` for formatting.

## 🔧 Core concepts

| Expansion | Result |
| --- | --- |
| `${#s}` | Length |
| `${s:offset}` | Slice from offset |
| `${s:offset:len}` | Slice with length |
| `${s#pat}` / `${s##pat}` | Remove shortest/longest prefix |
| `${s%pat}` / `${s%%pat}` | Remove shortest/longest suffix |
| `${s/pat/rep}` | Replace first match |
| `${s//pat/rep}` | Replace all |
| `${s/#pat/rep}` | Replace prefix |
| `${s/%pat/rep}` | Replace suffix |
| `${s,,}` / `${s^^}` | Lower / upper (bash 4+) |
| `${s:0:1}` | First character |

Negative offsets count from end: `${s: -3}` (space required after `:`).

## 💡 Examples

**Paths and extensions:**

```bash
path="/var/log/app.tar.gz"
echo "${path##*/}"      # app.tar.gz
echo "${path%/*}"       # /var/log
echo "${path%%.*}"      # /var/log/app
echo "${path%.*}"       # /var/log/app.tar
```

**Replace and case:**

```bash
s="Hello World"
echo "${s// /_}"        # Hello_World
echo "${s,,}"           # hello world
echo "${s^^}"           # HELLO WORLD
```

**Default padding with printf:**

```bash
printf '%04d\n' 42      # 0042
printf '%s\n' "${name:-anonymous}"
```

**Trim whitespace (extglob):**

```bash
shopt -s extglob
x="  hi  "
x="${x##+([[:space:]])}"
x="${x%%+([[:space:]])}"
```

## ⚠️ Pitfalls

- Patterns are globs, not regex (`*` vs `.*`).
- `${s: -1}` needs the space; `${s:-1}` is a default-value expansion.
- Unicode: length/offsets are in characters for bash 4+ locales, but be careful with combining marks.
- Heavy parsing: use `awk`/`sed`/`python` for complex text.
- Quoting: `"${s}"` still required when expanding results into commands.
- Associative replace with `/` in pattern: escape or choose another approach.

## 🔗 Related

- [variables.md](./variables.md)
- [quoting.md](./quoting.md)
- [arrays.md](./arrays.md)
- [conditionals.md](./conditionals.md)
- [globbing.md](./globbing.md)
