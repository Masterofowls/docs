# Undo Local Changes

_Git · Example / how-to_

---

## 📋 Overview

Discard or unstage local work safely: restore files, unstage the index, or reset unpushed commits without rewriting remote history.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `restore` | Discard working tree / unstage |
| `reset --soft` | Move HEAD, keep changes staged |
| `reset --mixed` | Move HEAD, keep changes unstaged |
| `clean` | Remove untracked files |

## 💡 Examples

**Unstage a file (keep edits):**

```bash
git restore --staged path/to/file.ts
```

**Discard unstaged edits to a file:**

```bash
git restore path/to/file.ts
```

**Undo last local commit, keep changes staged:**

```bash
git reset --soft HEAD~1
```

**Undo last local commit, keep changes unstaged:**

```bash
git reset HEAD~1
```

**Remove untracked files (dry run first):**

```bash
git clean -nd
git clean -fd
```

## ⚠️ Pitfalls

- `git restore` / `clean -fd` permanently deletes uncommitted work — dry-run first.
- `reset --hard` is destructive; avoid unless you truly want a clean tree.
- Do not reset commits that exist on the remote shared branch.

## 🔗 Related

- [Fix last commit](fix_last_commit.md)
- [Sync fork branch](sync_fork_branch.md)
