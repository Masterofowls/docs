# Markers

_Pytest · Reference cheat sheet_

---

## 📋 Overview

Markers tag tests for selection, skipping, expected failure, and custom metadata. Register custom marks in config to avoid warnings.

## 🔧 Core concepts

| Built-in | Effect |
| --- | --- |
| `skip` / `skipif` | Do not run |
| `xfail` | Expected fail |
| `parametrize` | Multiple cases |
| `usefixtures` | Attach fixtures |
| `filterwarnings` | Warning filters |

Custom: `@pytest.mark.slow`, `@pytest.mark.integration`, etc.

## 💡 Examples

**Skip / xfail:**

```python
import sys
import pytest

@pytest.mark.skip(reason="not ready")
def test_wip():
    ...

@pytest.mark.skipif(sys.platform == "win32", reason="posix only")
def test_fcntl():
    ...

@pytest.mark.xfail(reason="bug #123", strict=True)
def test_known_bug():
    assert False
```

**Custom marks + selection:**

```python
@pytest.mark.slow
def test_big_import():
    ...

# pytest -m "not slow"
# pytest -m "integration and not slow"
```

**Register in pyproject.toml:**

```toml
[tool.pytest.ini_options]
markers = [
  "slow: long-running tests",
  "integration: needs services",
]
```

**Class-level:**

```python
pytestmark = pytest.mark.integration

class TestAPI:
    def test_health(self):
        ...
```

## ⚠️ Pitfalls

- Unregistered marks → `PytestUnknownMarkWarning`.
- `xfail` without `strict=True` hiding unexpectedly passing tests.
- Overlapping mark expressions that select nothing silently.
- Using skip for environment issues better handled by fixtures.
- Marking entire modules accidentally via `pytestmark`.

## 🔗 Related

- [CLI](cli.md)
- [Parametrize](parametrize.md)
- [Configuration](configuration.md)
- [Fixtures](fixtures.md)
- [Asserts](asserts.md)
- [Django pytest](django_pytest.md)
