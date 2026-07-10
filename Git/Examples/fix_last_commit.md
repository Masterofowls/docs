# Fix Last Commit

_Git · Example / how-to_

---

## 📋 Overview

Amend the most recent commit to fix the message or add forgotten files — only when it is safe (not pushed, or you own the branch).

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `git commit --amend` | Rewrite HEAD commit |
| Staged changes | Fold into last commit |
| Message edit | `--amend -m` or editor |
| Safety | Avoid amending published history |

## 💡 Examples

**Fix message only:**

```bash
git commit --amend -m "fix: correct typo in changelog"
```

**Add forgotten files:**

```bash
git add path/to/missed_file.ts
git commit --amend --no-edit
```

**Check before amending:**

```bash
git status
git log -1 --format='%an %ae %s'
git status -sb   # look for "ahead" vs tracking remote
```

## ⚠️ Pitfalls

- Never amend commits already pushed to a shared branch unless the team agrees (needs force-push).
- `--no-edit` keeps the old message; use an editor/`-m` when the message should change.
- Hooks may rewrite files on amend — review `git status` after.

## 🔗 Related

- [Undo local changes](undo_local_changes.md)
- [Sync fork branch](sync_fork_branch.md)
