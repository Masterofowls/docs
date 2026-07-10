# reflog

_Git · Reference cheat sheet_

---

## 📋 Overview

The reflog records when HEAD and branch tips moved locally (commit, checkout, reset, rebase). Use it to recover “lost” commits after reset/amend/rebase. Reflogs are local and expire (default ~90 days).

## 🔧 Core concepts

- **Entries** — `HEAD@{n}`, `main@{yesterday}`, timestamps.
- **Scope** — per-ref reflogs (`git reflog show main`) + `HEAD` reflog.
- **Recover** — find SHA → `checkout` / `branch` / `reset` to it.
- **Expire** — `gc` / `reflog expire` prune old entries.
- **Not pushed** — remotes don’t have your reflog.

## 💡 Examples

```bash
git reflog
git reflog show main
git reflog --date=iso

# Recover after hard reset
git reset --hard HEAD@{1}
# or
git branch recover-me abcdef1

# After failed rebase
git reflog | head
git reset --hard HEAD@{5}

# Relative time
git show main@{2.days.ago}

git reflog expire --expire=30.days --all
git gc --prune=now
```

## ⚠️ Pitfalls

- Expired / GC’d objects can’t be recovered — act sooner than later.
- Reflog doesn’t help on another machine — push recovery branches if needed.
- `@{u}` is upstream, not reflog — different syntax.
- Don’t confuse reflog index `HEAD@{1}` with commit parent `HEAD~1`.
- Sensitive SHAs in reflog remain until expiry — consider security on shared disks.

## 🔗 Related

- [reset.md](./reset.md)
- [amend.md](./amend.md)
- [rebase.md](./rebase.md)
- [log.md](./log.md)
- [stash.md](./stash.md)
- [branch.md](./branch.md)
