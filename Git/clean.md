# clean

_Git · Reference cheat sheet_

---

## 📋 Overview

`git clean` deletes untracked files and directories from the working tree. Dry-run first (`-n`). It does not remove ignored files unless `-x` / `-X` is used. Irreversible for files not stored in Git.

## 🔧 Core concepts

- **Untracked** — files not in the index (and not ignored, by default).
- **`-n` / `--dry-run`** — show what would be removed.
- **`-f`** — required unless `clean.requireForce` is false.
- **`-d`** — also remove untracked directories.
- **`-x` / `-X`** — include ignored / only ignored (build artifacts).

## 💡 Examples

```bash
git clean -n -d          # preview
git clean -f -d          # delete untracked files + dirs

# Also remove ignored (e.g. dist/, .env.local if ignored)
git clean -n -xd
git clean -f -xd

# Only ignored
git clean -f -X -d

# Interactive
git clean -i -d

# Path limited
git clean -f -d -- apps/web/tmp
```

## ⚠️ Pitfalls

- No recycle bin — untracked work is gone unless backed up elsewhere.
- `-x` can delete local secrets and IDE files that were gitignored on purpose.
- Don’t clean during a conflicted merge without understanding untracked conflict helpers.
- Nested other repos / submodules need care — clean won’t remove submodule gitlinks.
- Prefer targeted pathspecs over repo-wide `-xd` in large monorepos.

## 🔗 Related

- [status.md](./status.md)
- [gitignore.md](./gitignore.md)
- [stash.md](./stash.md)
- [reset.md](./reset.md)
- [stage.md](./stage.md)
- [worktree.md](./worktree.md)
