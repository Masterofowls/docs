# Permissions

_GitHub Actions · Reference cheat sheet_

---

## 📋 Overview

`permissions` limits what `GITHUB_TOKEN` can do. Default token permissions have tightened over time—set least privilege explicitly at workflow or job level. Extra access for packages, PRs, or Pages must be granted deliberately.

## 🔧 Core concepts

| Scope examples | Values |
| --- | --- |
| `contents` | `read` / `write` / `none` |
| `actions` | Manage artifacts/workflows metadata |
| `checks` | Status checks |
| `pull-requests` | Comment / label PRs |
| `id-token` | `write` for OIDC |
| `pages` | GitHub Pages deploy |
| `packages` | GHCR / packages |
| `security-events` | Code scanning uploads |

Workflow-level permissions apply to all jobs unless a job overrides. `permissions: {}` denies all (then grant per job).

## 💡 Examples

**Read-only CI:**

```yaml
permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
```

**PR bot job:**

```yaml
jobs:
  comment:
    permissions:
      contents: read
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              ...context.issue,
              body: 'Thanks for the PR!'
            })
```

**OIDC to cloud:**

```yaml
permissions:
  id-token: write
  contents: read
```

## ⚠️ Pitfalls

- Missing `pull-requests: write` causes cryptic API 403s when commenting.
- Elevating `contents: write` on untrusted PR workflows is dangerous.
- Org/repo settings can restrict maximum token permissions—workflow can’t exceed them.
- Fork PRs still have reduced secret access regardless of permissions block.
- `actions/checkout` with persist-credentials + write token can push—disable when unused.
- Document why each write scope exists in comments.

## 🔗 Related

- [secrets_env.md](./secrets_env.md)
- [workflow_syntax.md](./workflow_syntax.md)
- [checkout.md](./checkout.md)
- [github_pages.md](./github_pages.md)
- [environments.md](./environments.md)
