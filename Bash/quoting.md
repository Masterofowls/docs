# Quoting

_Bash · Reference cheat sheet_

---

## 📋 Overview

Quoting controls word-splitting, globbing, and expansion. Double quotes allow `$`, `` ` ``, and `\` escapes; single quotes are literal; `$''` enables ANSI-C escapes. Correct quoting prevents most bash bugs.

## 🔧 Core concepts

| Form | Behavior |
| --- | --- |
| `"..."` | Expand `$var`, `$(...)`, `` `...` ``; keep spaces |
| `'...'` | Fully literal (no expansions) |
| `$'...'` | ANSI-C: `\n`, `\t`, `\xHH`, `\uXXXX` |
| `$"..."` | Locale translation (gettext) |
| `\` | Escape next character outside quotes |
| `$'...'` vs `"..."` | Prefer `$'\n'` for real newlines in strings |

Word-splitting uses `IFS` (default space/tab/newline) on unquoted expansions. Globbing (`*`, `?`, `[]`) also applies only when unquoted.

## 💡 Examples

**Preserve spaces:**

```bash
file="my document.txt"
rm -- "$file"          # good
# rm -- $file          # bad: two words
```

**Literal vs expanded:**

```bash
echo 'Home is $HOME'   # Home is $HOME
echo "Home is $HOME"   # Home is /home/you
```

**ANSI-C quotes:**

```bash
printf '%s\n' $'line1\nline2'
path=$'C:\\Users\\name'   # backslashes as written
```

**Nested / mixed:**

```bash
sql="SELECT * FROM users WHERE name='${name//\'/\'\'}'"
msg="He said \"hello\""
```

**Here-docs:**

```bash
cat <<'EOF'
No expansion: $HOME stays literal
EOF

cat <<EOF
Expanded: $HOME
EOF
```

## ⚠️ Pitfalls

- `"$@"` keeps args separate; `"$*"` joins with first IFS char.
- Empty `"$var"` is one empty argument; unquoted `$var` vanishes.
- Globs inside quotes are literal: `"*.txt"` is not a pattern.
- Backticks nest poorly; prefer `$(...)`.
- JSON/YAML in scripts: prefer single quotes or heredocs to avoid escape hell.
- `echo` + escapes is non-portable; use `printf`.

## 🔗 Related

- [variables.md](./variables.md)
- [globbing.md](./globbing.md)
- [string_ops.md](./string_ops.md)
- [arrays.md](./arrays.md)
- [scripts_best_practices.md](./scripts_best_practices.md)
