# conftest

_Pytest · Reference cheat sheet_

---

## 📋 Overview

`conftest.py` holds shared fixtures, hooks, and plugins discovered by directory proximity. Nested conftests apply to their subtree; no import needed in tests.

## 🔧 Core concepts

| Feature | Role |
| --- | --- |
| Local fixtures | Visible to sibling/child tests |
| Hooks | `pytest_configure`, `pytest_collection_modifyitems` |
| `pytest_plugins` | Load plugin modules |
| Directory scope | Closest conftest wins for overrides |

Do not put `conftest.py` in importable app packages if it confuses packaging.

## 💡 Examples

**Shared fixture:**

```python
# tests/conftest.py
import pytest

@pytest.fixture
def client(app):
    return app.test_client()
```

**Hook — skip by mark in CI:**

```python
# tests/conftest.py
import os
import pytest

def pytest_collection_modifyitems(config, items):
    if os.getenv("CI"):
        return
    skip_ci = pytest.mark.skip(reason="CI only")
    for item in items:
        if "ci_only" in item.keywords:
            item.add_marker(skip_ci)
```

**Nested override:**

```text
tests/
  conftest.py          # db fixture (sqlite)
  api/
    conftest.py        # db fixture (postgres) overrides for api/
    test_users.py
```

**Register plugin:**

```python
pytest_plugins = ["tests.plugins.db"]
```

## ⚠️ Pitfalls

- Circular imports between conftest and application code.
- Putting secrets in conftest committed to git.
- Too many session fixtures in root conftest slowing collection.
- Expecting conftest fixtures across unrelated directories.
- Naming conflicts when two conftests define the same fixture name.

## 🔗 Related

- [Fixtures](fixtures.md)
- [Plugins](plugins.md)
- [Configuration](configuration.md)
- [Markers](markers.md)
- [tmp_path](tmp_path.md)
- [Django pytest](django_pytest.md)
