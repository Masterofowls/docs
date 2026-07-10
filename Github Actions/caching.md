# Caching

_GitHub Actions · Reference cheat sheet_

---

## 📋 Overview

Caching restores dependencies between runs with `actions/cache` or setup-action built-in caches (`setup-node`, `setup-python`). Good keys save minutes; bad keys cause stale builds. Caches are scoped per branch with restore fallbacks.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `key` | Exact cache identity |
| `restore-keys` | Prefix fallbacks |
| `path` | Directories to save |
| Hit / miss | Logged in step output |
| Branch scope | Default branch caches more shareable |
| Size limits | Eviction when over quota |

Prefer official setup actions’ `cache: true` / `cache-dependency-path` when available—they encode good defaults.

## 💡 Examples

**Node via setup-node:**

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm
    cache-dependency-path: package-lock.json
- run: npm ci
```

**Explicit actions/cache:**

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.cache/pip
    key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
    restore-keys: |
      ${{ runner.os }}-pip-
```

**Go modules sketch:**

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.cache/go-build
      ~/go/pkg/mod
    key: ${{ runner.os }}-go-${{ hashFiles('**/go.sum') }}
```

## ⚠️ Pitfalls

- Don’t cache build outputs that must be clean—cache package managers, not `dist`, unless intentional.
- Overly broad `restore-keys` can restore wrong versions and cause subtle bugs.
- Post-job save fails if the job was canceled early—understand when saves run.
- OS must be part of the key when paths differ across runners.
- Secrets in cached paths can persist—exclude credential dirs.
- Cache is not a secure artifact store or substitute for lockfiles.

## 🔗 Related

- [setup_node.md](./setup_node.md)
- [setup_python.md](./setup_python.md)
- [artifacts.md](./artifacts.md)
- [jobs_steps.md](./jobs_steps.md)
- [runners.md](./runners.md)
