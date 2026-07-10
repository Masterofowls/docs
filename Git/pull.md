# Pull

*_Git · Reference cheat sheet_*

---

## 📖 Overview

`git pull` fetches from a remote and integrates into the current branch. Default integration is merge; configure or pass `--rebase` for a linear history. Prefer an explicit fetch + review when the update is risky.

## 🧩 Core concepts

- **Fetch + integrate** — updates remote-tracking refs, then merge or rebase.
- **Upstream** — pull uses the branch’s configured remote/merge ref.
- **`--rebase`** — replay local commits on top of the updated tip.
- **`--ff-only`** — refuse non-fast-forward updates (safe default for shared mains).
- **Autostash** — `--autostash` stashes dirty worktree around rebase/merge.
- **Conflict handling** — same as merge/rebase; finish with commit or `rebase --continue`.

## 💡 Examples

```bash
# Pull current upstream (merge)
git pull

# Pull with rebase
git pull --rebase
git pull --rebase origin main

# Fast-forward only
git pull --ff-only

# Explicit remote/branch
git pull origin main

# Autostash local changes
git pull --rebase --autostash

# Safer workflow: fetch, inspect, then integrate
git fetch origin
git log --oneline HEAD..origin/main
git merge --ff-only origin/main
# or: git rebase origin/main
```

Set rebase-by-default for pulls (optional):

```bash
git config pull.rebase true
git config pull.ff only
```

## ⚠️ Pitfalls

- Blind `git pull` on a dirty tree can create messy conflict states — stash or commit first.
- Mixing merge pulls and rebase pulls on the same branch confuses history.
- Pulling with divergent histories creates merge commits unless you rebase/ff-only.
- After a rebased pull of commits already pushed, you may need a force-with-lease push.

## 🔗 Related

- [Fetch](./fetch.md)
- [Merge](./merge.md)
- [Rebase](./rebase.md)
- [Push](./push.md)
- [Branch](./branch.md)
