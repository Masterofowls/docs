# Watch Mode

_Jest · Reference cheat sheet_

---

## 📋 Overview

`jest --watch` / `--watchAll` re-runs tests on file changes. Interactive filters focus on failed tests, filenames, and related source files — ideal for TDD.

## 🔧 Core concepts

| Mode | Behavior |
| --- | --- |
| `--watch` | Git-aware changed files |
| `--watchAll` | All tests on any change |
| Interactive keys | Filter, update snapshots |
| `--onlyChanged` | Non-interactive changed |

Requires a git/hg repo for `--watch` heuristics; else use `--watchAll`.

## 💡 Examples

**Scripts:**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:watchAll": "jest --watchAll"
  }
}
```

**Interactive keys (typical):**

```text
a  run all tests
f  run only failed
o  only changed (watch)
p  filter by filename regex
t  filter by test name regex
u  update snapshots
q  quit
```

**CLI filters without UI:**

```bash
npx jest --watch --testPathPattern=Button
npx jest -t "submits form" --watchAll
```

**CI:** never use watch — use `--ci`.

## ⚠️ Pitfalls

- `--watch` outside git showing confusing empty sets — use `--watchAll`.
- Updating snapshots with `u` without reviewing.
- Watching huge monorepos without `roots` / projects — slow.
- Editors saving continuously causing thrash — debounce/save properly.
- Relying on watch caches after dependency upgrades — restart.

## 🔗 Related

- [Install](install.md)
- [Snapshots](snapshots.md)
- [Config](config.md)
- [Coverage](coverage.md)
- [Setup & teardown](setup_teardown.md)
- [Matchers](matchers.md)
