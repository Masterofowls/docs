# Pip

_Python · Reference cheat sheet_

---

## 📋 Overview

`pip` installs packages from PyPI (and other indexes) into the current environment. Use `python -m pip` for reliability. Pin versions for apps; keep libraries flexible within SemVer ranges.

## 🔧 Core concepts

| Command | Role |
| --- | --- |
| `pip install pkg` | Install latest |
| `pip install pkg==1.2.3` | Pin version |
| `pip install -r requirements.txt` | From file |
| `pip install -e .` | Editable project |
| `pip uninstall pkg` | Remove |
| `pip list` / `show` | Inspect |
| `pip freeze` | Export pins |
| `pip index versions pkg` | List versions (newer pip) |

Constraints files (`constraints.txt`) pin transitive deps without listing them as direct requirements.

## 💡 Examples

**Everyday installs:**

```bash
python -m pip install -U pip setuptools wheel
python -m pip install 'requests>=2.31'
python -m pip install -r requirements.txt
```

**Editable local package:**

```bash
python -m pip install -e .
python -m pip install -e ".[dev]"
```

**requirements vs freeze:**

```bash
# hand-maintained direct deps
echo "flask>=3.0" > requirements.txt

# full lock-ish dump of current env
python -m pip freeze > requirements.lock.txt
```

**Extra index / trusted host (careful):**

```bash
python -m pip install pkg --index-url https://pypi.org/simple
```

## ⚠️ Pitfalls

- Never `curl | sh` unknown installers; prefer `python -m pip`.
- `pip freeze` includes transitive pins — great for apps, noisy for libraries.
- Mixing `--user` installs with venvs causes confusion.
- Compiling wheels may need build tools (Rust/C compilers) for some packages.
- Private indexes: protect tokens; don't commit credentials.

## 🔗 Related

- [Venv](venv.md)
- [Packaging](packaging.md)
- [Import / export](import_export.md)
- [Testing with pytest](testing_pytest.md)
- [Examples: http requests](Examples/http_requests.md)
- [Logging](logging.md)
