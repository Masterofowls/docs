# Globbing

_Bash · Reference cheat sheet_

---

## 📋 Overview

Globs (pathname expansion) match filenames with `*`, `?`, and `[]` before the command runs. Unlike regex, `*` never matches `/` across directories unless globstar is on. Quote patterns when you want literals; enable `nullglob` / `failglob` for safer scripts.

## 🔧 Core concepts

| Pattern | Matches |
| --- | --- |
| `*` | Any string except `/` |
| `?` | Single character |
| `[abc]` / `[a-z]` | Character class |
| `[!a]` / `[^a]` | Negated class |
| `**` | Recursive (needs `shopt -s globstar`) |
| `*(pat)` etc. | Extglob patterns (`shopt -s extglob`) |

| `shopt` | Effect |
| --- | --- |
| `nullglob` | Unmatched glob → empty |
| `failglob` | Unmatched glob → error |
| `dotglob` | Include `.hidden` |
| `nocaseglob` | Case-insensitive |
| `globstar` | Enable `**` |

## 💡 Examples

**Safe iteration:**

```bash
shopt -s nullglob
for f in *.log; do
  echo "$f"
done
```

**Extglob:**

```bash
shopt -s extglob
rm -- !(keep|also-keep).tmp
ls *.(jpg|png|gif)
```

**Globstar:**

```bash
shopt -s globstar nullglob
for f in **/*.py; do
  echo "$f"
done
```

**Disable expansion:**

```bash
echo "*.txt"           # literal
printf '%s\n' *.txt    # expanded list
```

## ⚠️ Pitfalls

- Default: unmatched `*.txt` stays as the literal string `*.txt`—dangerous in `rm`.
- Globs don’t sort the way you always expect across locales; sort explicitly if needed.
- `**` without `globstar` is just two `*` tokens in some contexts—enable the option.
- Brace expansion `{a,b}` is not globbing; it runs even if files don’t exist.
- Leading `.` files ignored unless `dotglob` or pattern starts with `.`.
- Never parse `ls`; use globs or `find`.

## 🔗 Related

- [quoting.md](./quoting.md)
- [loops.md](./loops.md)
- [arrays.md](./arrays.md)
- [scripts_best_practices.md](./scripts_best_practices.md)
- [string_ops.md](./string_ops.md)
