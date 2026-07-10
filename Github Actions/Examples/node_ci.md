# Node CI

_Github Actions · Example / how-to_

---

## 📋 Overview

Run install, lint, typecheck, and tests for a Node project on pull requests with caching and a fixed Node version.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `actions/checkout` | Fetch repo |
| `actions/setup-node` | Node + cache |
| Job steps | Lint → test |
| `pull_request` trigger | Gate merges |

## 💡 Examples

**.github/workflows/node_ci.yml:**

```yaml
name: Node CI

on:
  pull_request:
  push:
    branches: [main]

concurrency:
  group: node-ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: site
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm
          cache-dependency-path: site/package-lock.json

      - name: Install
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Typecheck
        run: npm run typecheck

      - name: Test
        run: npm test --if-present
```

## ⚠️ Pitfalls

- `npm install` in CI drifts locks — prefer `npm ci`.
- Wrong `cache-dependency-path` disables caching silently.
- Fail fast: put cheap lint/typecheck before heavy e2e.

## 🔗 Related

- [Path filters](path_filters.md)
