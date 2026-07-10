# bisect

_Git · Reference cheat sheet_

---

## 📋 Overview

`git bisect` binary-searches history to find the commit that introduced a bug. Mark commits `good` / `bad` (or `old` / `new`); automate with `bisect run` and a script that exits 0 (good) or non-zero (bad).

## 🔧 Core concepts

- **Start** — `bisect start`, then mark known bad and good endpoints.
- **Midpoints** — Git checks out a mid commit; you test and mark.
- **Terms** — `good`/`bad` or `old`/`new` (regression vs behavior change).
- **Skip** — untestable commits (`bisect skip`).
- **Run** — `git bisect run ./test.sh` automates the loop.

## 💡 Examples

```bash
git bisect start
git bisect bad HEAD
git bisect good v1.2.0

# manually test, then:
git bisect good   # or: git bisect bad

git bisect reset  # return to original branch

# Automated
git bisect start HEAD v1.2.0
git bisect run npm test
# script exit: 0 = good, 1-127 (not 125) = bad, 125 = skip

git bisect skip
git bisect log
git bisect replay bisect-log.txt
```

## ⚠️ Pitfalls

- Need a reliable test — flaky tests send bisect the wrong way.
- Shallow clones may lack enough history — deepen first.
- Skipped ranges can leave an ambiguous first-bad commit.
- Detached HEAD during bisect — don’t start new feature work mid-bisect.
- Build failures unrelated to the bug should `skip` or fix the script’s exit codes.

## 🔗 Related

- [log.md](./log.md)
- [blame.md](./blame.md)
- [checkout via branch.md](./branch.md)
- [reflog.md](./reflog.md)
- [tag.md](./tag.md)
- [diff.md](./diff.md)
