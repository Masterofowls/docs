# Artifacts

_GitHub Actions · Reference cheat sheet_

---

## 📋 Overview

Artifacts persist files between jobs or after a workflow finishes (logs, builds, test reports). Upload with `actions/upload-artifact`, download with `actions/download-artifact`. Retention is limited; use releases or external storage for long-term binaries.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `upload-artifact` | Store paths from a job |
| `download-artifact` | Restore into another job/run |
| `retention-days` | Override default retention |
| `name` | Artifact identifier |
| `path` | File/glob to store |
| `if-no-files-found` | `warn` / `error` / `ignore` |

Artifacts are per-workflow-run. Jobs that need build outputs from another job must download explicitly—workspace is not shared.

## 💡 Examples

**Build → test jobs:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7

  verify:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist
      - run: ls -R dist
```

**Multiple paths:**

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: reports
    path: |
      coverage/
      test-results/
```

## ⚠️ Pitfalls

- Artifact v3/v4 APIs differ—match upload/download major versions.
- Uploading huge `node_modules` wastes storage—upload only build outputs.
- Name collisions across matrix cells—include `${{ matrix.* }}` in the name.
- Expired artifacts disappear—don’t rely on them as a package registry.
- Sensitive files in artifacts are downloadable by users with permission—filter carefully.
- Compression and path layout differ; always `ls` after download in CI once.

## 🔗 Related

- [jobs_steps.md](./jobs_steps.md)
- [caching.md](./caching.md)
- [matrix.md](./matrix.md)
- [github_pages.md](./github_pages.md)
- [docker.md](./docker.md)
