# Venv

_Python · Reference cheat sheet_

---

## 📋 Overview

`venv` creates isolated Python environments so project dependencies do not clash with system packages. Always use a virtualenv per project; activate it before installing with pip.

## 🔧 Core concepts

| Task | Command |
| --- | --- |
| Create | `python -m venv .venv` |
| Activate (Windows) | `.venv\Scripts\activate` |
| Activate (Unix) | `source .venv/bin/activate` |
| Deactivate | `deactivate` |
| Install | `python -m pip install -r requirements.txt` |
| Record | `python -m pip freeze > requirements.txt` |
| Remove | Delete the `.venv` folder |

Prefer `python -m pip` so you install into the active interpreter. `.venv` is the common directory name (gitignored).

## 💡 Examples

**Create and use (PowerShell):**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install requests pytest
```

**Create and use (bash):**

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install -r requirements.txt
```

**Check which Python:**

```bash
python -c "import sys; print(sys.executable)"
where python   # Windows
which python   # Unix
```

**requirements pinning:**

```text
# requirements.txt
requests==2.32.3
pytest>=8.0,<9
```

## ⚠️ Pitfalls

- Installing with a global `pip` while thinking the venv is active — verify `sys.executable`.
- Committing `.venv` to git bloats the repo — ignore it.
- Mixing conda and venv accidentally — pick one workflow.
- Nested venvs and path confusion after IDE interpreter switches.
- On Windows, execution policy may block `Activate.ps1` — adjust policy or use `cmd` activate.

## 🔗 Related

- [Pip](pip.md)
- [Packaging](packaging.md)
- [Import / export](import_export.md)
- [Testing with pytest](testing_pytest.md)
- [Examples: cli tool](Examples/cli_tool.md)
- [Argparse](argparse.md)
