# Process Substitution

_Bash · Reference cheat sheet_

---

## 📋 Overview

Process substitution (`<(…)` and `>(…)`) exposes a command’s output or input as a temporary filename (usually `/dev/fd/N`). It lets commands that expect files work with streams—and avoids pipeline subshell issues when reading into the current shell.

## 🔧 Core concepts

| Form | Meaning |
| --- | --- |
| `<(cmd)` | Read from `cmd`’s stdout as a file |
| `>(cmd)` | Write to a file that pipes into `cmd`’s stdin |
| Diff two streams | `diff <(cmd1) <(cmd2)` |
| vs pipe | Pipe connects stdin; process sub gives a path |

Requires bash/zsh/ksh support and `/dev/fd` (or named temps). Not POSIX `sh`.

## 💡 Examples

**Compare outputs:**

```bash
diff -u <(sort a.txt) <(sort b.txt)
comm <(ls dir1) <(ls dir2)
```

**Read in current shell:**

```bash
while IFS= read -r line; do
  echo "$line"
done < <(curl -fsS "$url")
```

**Multiple inputs:**

```bash
paste <(cut -f1 data.tsv) <(cut -f2 data.tsv)
```

**Tee-like with >():**

```bash
echo hello > >(tee saved.txt)
# or
cmd | tee >(sha256sum >&2) > out.bin
```

**mapfile:**

```bash
mapfile -t lines < <(grep -v '^#' config)
```

## ⚠️ Pitfalls

- Not available in POSIX `sh` or some restricted environments.
- The path is ephemeral; don’t store it for later use after the command ends.
- `<(cmd)` runs asynchronously; ensure consumers read fully.
- Combining with `sudo` may break `/dev/fd` visibility—run the whole pipeline elevated carefully.
- Prefer process substitution over `cmd >tmp && use tmp` for cleanliness, but temp files still win for huge reusable data.
- Quoting: `"<(cmd)"` becomes a literal—don’t quote the substitution form.

## 🔗 Related

- [pipes_redirection.md](./pipes_redirection.md)
- [subshells.md](./subshells.md)
- [loops.md](./loops.md)
- [debugging.md](./debugging.md)
- [scripts_best_practices.md](./scripts_best_practices.md)
