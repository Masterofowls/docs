# Pytest Example

_Python · Example / how-to_

---

## 📋 Overview

A minimal pytest layout: functions under test, fixtures, parametrize, and `tmp_path`. Run with `python -m pytest -q`.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `test_*.py` | Discovery |
| Fixtures | Reusable setup |
| `parametrize` | Many inputs |
| `tmp_path` | Isolated filesystem |
| `capsys` | Capture stdout |
| `raises` | Expected errors |

Keep tests independent; name them after behavior, not implementation.

## 💡 Examples

**mylib.py:**

```python
from pathlib import Path

def normalize(name: str) -> str:
    cleaned = name.strip().lower()
    if not cleaned:
        raise ValueError("empty name")
    return cleaned

def save_greeting(path: Path, name: str) -> None:
    path.write_text(f"Hello, {normalize(name)}!\n", encoding="utf-8")
```

**test_mylib.py:**

```python
import pytest
from pathlib import Path

from mylib import normalize, save_greeting

@pytest.mark.parametrize(
    "raw,expected",
    [(" Ada ", "ada"), ("BOB", "bob")],
)
def test_normalize(raw: str, expected: str) -> None:
    assert normalize(raw) == expected

def test_normalize_empty() -> None:
    with pytest.raises(ValueError, match="empty"):
        normalize("   ")

def test_save_greeting(tmp_path: Path) -> None:
    out = tmp_path / "hi.txt"
    save_greeting(out, " Ada ")
    assert out.read_text(encoding="utf-8") == "Hello, ada!\n"
```

**CLI test with capsys:**

```python
from cli_tool_stub import main  # your main(argv) -> int

def test_cli(capsys) -> None:
    assert main(["Ada"]) == 0
    assert "Hello, Ada!" in capsys.readouterr().out
```

**Run:**

```bash
python -m pip install pytest
python -m pytest -q
python -m pytest -k normalize -vv
```

## ⚠️ Pitfalls

- Import path issues — use `src` layout or install editable (`pip install -e .`).
- Tests depending on wall-clock time without freezing.
- Writing into the repo instead of `tmp_path`.
- Over-mocking until tests assert nothing real.
- Ignoring warnings that signal API misuse.

## 🔗 Related

- [CLI tool](cli_tool.md)
- [Dataclass pipeline](dataclass_pipeline.md)
- [../testing_pytest.md](../testing_pytest.md)
- [../exceptions.md](../exceptions.md)
- [../pathlib.md](../pathlib.md)
- [../functions.md](../functions.md)
