# Composite Actions

_GitHub Actions · Reference cheat sheet_

---

## 📋 Overview

Composite actions bundle multiple steps into a reusable `action.yml` with `runs.using: composite`. Unlike reusable workflows (job-level), composites plug in as a single step. Ideal for shared setup sequences within or across repos.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `action.yml` | Metadata + inputs/outputs |
| `runs.using: composite` | Step bundle |
| `runs.steps` | Same shape as workflow steps |
| `inputs` | Parameters from `with:` |
| `outputs` | Mapped from step outputs |
| Location | `org/repo/path@ref` or `./.github/actions/name` |

JavaScript and Docker actions are alternatives when you need richer logic or containers.

## 💡 Examples

**`.github/actions/setup-app/action.yml`:**

```yaml
name: Setup app
description: Checkout deps already assumed; install toolchains
inputs:
  node-version:
    required: true
    default: '22'
runs:
  using: composite
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: npm
    - run: npm ci
      shell: bash
```

**Use it:**

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/setup-app
    with:
      node-version: '22'
  - run: npm test
```

**Output pattern:**

```yaml
outputs:
  version:
    value: ${{ steps.meta.outputs.version }}
runs:
  using: composite
  steps:
    - id: meta
      shell: bash
      run: echo "version=1.2.3" >> "$GITHUB_OUTPUT"
```

## ⚠️ Pitfalls

- Every `run` step in a composite **must** set `shell:`.
- Composites can’t directly grant extra `permissions`—caller workflow controls token.
- Nested `uses` of other actions is fine; keep versions pinned.
- Don’t confuse with reusable workflows—composites don’t create jobs.
- Local path actions require checkout first.
- Outputs must be declared and wired explicitly.

## 🔗 Related

- [reusable_workflows.md](./reusable_workflows.md)
- [jobs_steps.md](./jobs_steps.md)
- [checkout.md](./checkout.md)
- [setup_node.md](./setup_node.md)
- [expressions.md](./expressions.md)
