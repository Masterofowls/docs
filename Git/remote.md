# remote

_Git · Reference cheat sheet_

---

## 📋 Overview

Remotes are named URLs for other repositories (`origin`, `upstream`). Manage fetch/push URLs, prune stale refs, and track branches. Most day-to-day sync uses `fetch` / `pull` / `push` against remotes.

## 🔧 Core concepts

- **Add / rename / remove** — `remote add`, `rename`, `remove`.
- **URL** — `remote set-url`, separate pushurl if needed.
- **Verbose** — `remote -v` lists fetch/push URLs.
- **Prune** — delete local remote-tracking branches removed upstream.
- **Upstream** — fork workflow: `origin` = your fork, `upstream` = canonical.

## 💡 Examples

```bash
git remote -v
git remote add origin git@github.com:you/app.git
git remote add upstream git@github.com:org/app.git

git remote rename origin old-origin
git remote remove old-origin

git remote set-url origin git@github.com:you/app.git
git remote set-url --push origin https://github.com/you/app.git

git fetch upstream
git remote prune origin
git fetch --prune

# Show details
git remote show origin

# Tracking
git branch -vv
git push -u origin HEAD
```

## ⚠️ Pitfalls

- Multiple remotes with similar names cause pushes to the wrong place — check `-v`.
- Changing URL doesn’t rewrite existing remote-tracking history.
- Credential helpers differ for HTTPS vs SSH — fix auth at the remote URL layer.
- `prune` deletes remote-tracking refs, not local branches — still delete locals yourself.
- Mirror / bare remotes have different push semantics.

## 🔗 Related

- [clone.md](./clone.md)
- [fetch.md](./fetch.md)
- [push.md](./push.md)
- [pull.md](./pull.md)
- [branch.md](./branch.md)
- [gh_cli.md](./gh_cli.md)
