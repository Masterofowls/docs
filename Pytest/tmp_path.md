# tmp_path

_Pytest · Reference cheat sheet_

---

## 📋 Overview

`tmp_path` and `tmp_path_factory` give per-test (or session) temporary directories as `pathlib.Path`. Prefer them over manual `tempfile` cleanup.

## 🔧 Core concepts

| Fixture | Scope |
| --- | --- |
| `tmp_path` | Unique dir per test function |
| `tmp_path_factory` | Create extra dirs; session-friendly |
| `tmpdir` | Legacy py.path — prefer `tmp_path` |
| basetemp | `--basetemp=` keeps dirs for debug |

pytest cleans default temp roots between runs unless basetemp is set.

## 💡 Examples

**Write files:**

```python
def test_config(tmp_path):
    cfg = tmp_path / "config.toml"
    cfg.write_text('[app]\nname = "demo"\n', encoding="utf-8")
    assert "demo" in cfg.read_text(encoding="utf-8")
```

**Nested layout:**

```python
def test_project(tmp_path):
    src = tmp_path / "src"
    src.mkdir()
    (src / "main.py").write_text("print(1)\n", encoding="utf-8")
    assert (tmp_path / "src" / "main.py").exists()
```

**Factory (session):**

```python
import pytest

@pytest.fixture(scope="session")
def dataset_dir(tmp_path_factory):
    root = tmp_path_factory.mktemp("data")
    (root / "sample.csv").write_text("a,b\n1,2\n", encoding="utf-8")
    return root
```

**Keep on failure:**

```bash
pytest --basetemp=./.pytest-tmp
```

## ⚠️ Pitfalls

- Storing secrets in tmp dirs on shared CI runners.
- Assuming `tmp_path` survives across tests — it does not.
- Using string paths with APIs that need `Path` or vice versa.
- Parallel xdist workers — each has isolated temps; don't hardcode shared paths.
- Preferring `tmpdir` in new code (deprecated style).

## 🔗 Related

- [Fixtures](fixtures.md)
- [capsys & caplog](capsys_caplog.md)
- [conftest](conftest.md)
- [Mocking](mocking.md)
- [CLI](cli.md)
- [xdist](xdist.md)
