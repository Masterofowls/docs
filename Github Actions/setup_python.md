# Setup Python

_GitHub Actions · Reference cheat sheet_

---

## 📋 Overview

`actions/setup-python` installs Python, exposes `python`/`pip`, and can cache pip dependencies. Use version files or matrices for multi-version testing. Prefer `pip install -r` with hashed requirements or lock tools (pip-tools, poetry, uv) for reproducibility.

## 🔧 Core concepts

| Input | Role |
| --- | --- |
| `python-version` | `3.12`, `3.12.x` |
| `python-version-file` | `.python-version` |
| `cache` | `pip` / `pipenv` / `poetry` |
| `cache-dependency-path` | Requirements/lock paths |
| `architecture` | `x64` / `arm64` |

Virtualenvs are optional on clean runners; still useful for clarity. Tox/nox/pytest fit naturally after setup.

## 💡 Examples

**pip + cache:**

```yaml
- uses: actions/checkout@v4
- uses: actions/setup-python@v5
  with:
    python-version: '3.12'
    cache: pip
    cache-dependency-path: requirements*.txt
- run: pip install -r requirements.txt
- run: pytest -q
```

**Matrix:**

```yaml
strategy:
  matrix:
    python: ['3.11', '3.12', '3.13']
steps:
  - uses: actions/setup-python@v5
    with:
      python-version: ${{ matrix.python }}
```

**Poetry sketch:**

```yaml
- uses: actions/setup-python@v5
  with:
    python-version-file: '.python-version'
    cache: poetry
- run: pipx install poetry
- run: poetry install --no-interaction
- run: poetry run pytest
```

## ⚠️ Pitfalls

- System Python on the image ≠ your setup-python version—always run setup first.
- Cache won’t help if dependency files aren’t hashed correctly.
- Compiled wheels differ by OS—matrix Linux/macOS/Windows when shipping binaries.
- `PYTHONPATH` / editable installs can hide packaging issues—test the sdist/wheel occasionally.
- Secrets for private indexes belong in env, not committed `pip.conf`.
- Match black/ruff/mypy versions to local tooling via pins.

## 🔗 Related

- [setup_node.md](./setup_node.md)
- [caching.md](./caching.md)
- [matrix.md](./matrix.md)
- [checkout.md](./checkout.md)
- [runners.md](./runners.md)
