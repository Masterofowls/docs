# CLI

_Pytest · Reference cheat sheet_

---

## 📋 Overview

The pytest CLI selects tests, controls verbosity, stops on failure, and passes plugin options. Learn a small set of flags for daily use and CI.

## 🔧 Core concepts

| Flag | Purpose |
| --- | --- |
| `-q` / `-v` | Quiet / verbose |
| `-x` | Stop on first failure |
| `--lf` / `--ff` | Last failed / failed first |
| `-k EXPR` | Name expression |
| `-m EXPR` | Mark expression |
| `-s` | No capture (show print) |
| `--pdb` | Drop into debugger |
| `--maxfail=N` | Stop after N failures |
| `-n` | xdist workers |

Node id: `path/test_file.py::TestClass::test_name`.

## 💡 Examples

**Selection:**

```bash
pytest tests/test_api.py
pytest tests/test_api.py::test_health
pytest -k "user and not slow"
pytest -m "not integration"
```

**Debugging:**

```bash
pytest -x --pdb
pytest --lf
pytest -vv -s
pytest --trace   # break at start of each test
```

**Output & reports:**

```bash
pytest -ra
pytest --tb=short
pytest --junitxml=report.xml
```

**Useful combos:**

```bash
pytest -q --cov=myapp --cov-report=term-missing
pytest -n auto -m "not slow"
pytest --durations=10
```

**Collect only:**

```bash
pytest --collect-only -q
```

## ⚠️ Pitfalls

- `-s` flooding CI logs.
- Overusing `-k` strings that silently match nothing useful.
- Forgetting quotes around mark expressions in shells.
- Running from the wrong cwd so `testpaths` miss files.
- Passing pytest args after `--` incorrectly in some wrappers.

## 🔗 Related

- [Configuration](configuration.md)
- [Markers](markers.md)
- [Coverage](coverage.md)
- [xdist](xdist.md)
- [Install](install.md)
- [Asserts](asserts.md)
