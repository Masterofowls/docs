# Glossary

_Pytest · Reference cheat sheet_

---

## 📋 Overview

Alphabetical glossary of core Pytest terms for fixtures, assertions, markers, configuration, and test organization.

## 🔧 Core concepts

| Term | Definition |
| --- | --- |
| Approx | `pytest.approx` for comparing floating-point numbers with tolerance. |
| Assert rewriting | Pytest’s enhancement of `assert` statements with rich failure introspection. |
| Caplog | A fixture that captures logging output during a test. |
| Capsys | A fixture that captures writes to stdout and stderr. |
| Collection | The phase where Pytest discovers and builds the test suite tree. |
| Conftest | A `conftest.py` file that shares fixtures and hooks with a directory tree. |
| Coverage | Measurement of which code lines were executed by tests. |
| Fixture | A reusable setup/teardown provider injected into tests by name. |
| Hook | A plugin callback such as `pytest_runtest_setup` that extends Pytest. |
| Marker | A tag like `@pytest.mark.slow` used to select or skip tests. |
| Monkeypatch | A fixture for temporarily changing attributes, env vars, or dict items. |
| Node id | The unique path identifying a collected test, used in selection. |
| Parametrize | Running one test function multiple times with different argument sets. |
| Plugin | An extension package or module that adds fixtures, hooks, or CLI options. |
| Pytest.ini | A common configuration file for options, markers, and paths. |
| Raise | Using `pytest.raises` to assert that code throws an expected exception. |
| Request | The fixture that gives access to the current test context and node. |
| Scope | How long a fixture lives: `function`, `class`, `module`, `package`, or `session`. |
| Skip | Marking a test to not run, optionally with a reason. |
| Teardown | Cleanup code that runs after a test or fixture yields. |
| Tmp_path | A fixture providing a unique temporary `pathlib.Path` per test. |
| Traceback | The failure stack Pytest prints, often shortened for readability. |
| Usefixtures | A marker that applies fixtures to a test or class without parameters. |
| Xdist | The `pytest-xdist` plugin that runs tests in parallel workers. |
| Xfail | Expecting a test to fail; unexpected passes are reported specially. |

## 💡 Examples

**Fixture and assert:**

```python
import pytest

@pytest.fixture
def user():
    return {"name": "Ada"}

def test_user_name(user):
    assert user["name"] == "Ada"
```

**Parametrize and markers:**

```python
@pytest.mark.parametrize("n,expected", [(1, 2), (2, 4)])
def test_double(n, expected):
    assert n * 2 == expected

@pytest.mark.slow
def test_integration():
    ...
```

**CLI selection:**

```bash
pytest -k "user and not slow" -q
pytest -m "not slow" --maxfail=1
```

## ⚠️ Pitfalls

- Confusing **skip** (do not run) with **xfail** (run, expect failure).
- Mixing **fixture scope** (`function` vs `session`) and accidentally sharing mutable state.
- Treating **conftest.py** like a normal importable module — discovery is directory-based.
- Equating **parametrize** ids with test names — node ids include parameters.
- Assuming plain **assert** elsewhere behaves like Pytest’s rewritten asserts.

## 🔗 Related

- [fixtures](fixtures.md)
- [asserts](asserts.md)
- [parametrize](parametrize.md)
- [markers](markers.md)
- [conftest](conftest.md)
- [cli](cli.md)
