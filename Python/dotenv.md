# Dotenv

_Python · Reference cheat sheet_

---

## 📋 Overview

`python-dotenv` loads a `.env` file into `os.environ` so local secrets stay out of source. Install: `pip install python-dotenv`. Call `load_dotenv()` early (app entrypoint), then read with `os.getenv`.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `load_dotenv()` | Load `.env` from cwd / parents into `os.environ` |
| `load_dotenv(path)` | Explicit file path |
| `override=False` | Default: don’t clobber existing env |
| `find_dotenv()` | Locate nearest `.env` |
| `os.getenv("KEY")` | Read after load |
| `os.environ["KEY"]` | Read/set in process |

Typical `.env` lines: `KEY=value` (no quotes needed for simple values). Never commit real secrets — keep `.env` in `.gitignore`.

## 💡 Examples

**Basic load:**

```python
import os
from dotenv import load_dotenv

load_dotenv()  # reads .env
db_url = os.getenv("DATABASE_URL")
debug = os.getenv("DEBUG", "0") == "1"
print(bool(db_url), debug)
```

**Explicit path:**

```python
from pathlib import Path
from dotenv import load_dotenv
import os

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)
print(os.environ.get("API_KEY", ""))
```

**Override existing vars:**

```python
from dotenv import load_dotenv
import os

os.environ["APP_ENV"] = "prod"
load_dotenv(override=True)  # .env wins
print(os.getenv("APP_ENV"))
```

**Fail fast if required:**

```python
import os
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("SECRET_TOKEN")
if not token:
    raise SystemExit("SECRET_TOKEN is required")
```

## ⚠️ Pitfalls

- `load_dotenv` does not raise if `.env` is missing — check return value or required keys.
- Default `override=False`: shell/CI env wins over `.env`.
- Values are strings; parse bools carefully (`"false"` is truthy in Python).
- Don’t commit `.env`; ship `.env.example` with dummy keys.
- Calling `load_dotenv` late (after code already read env) is a common bug.

## 🔗 Related

- [Os](os.md)
- [Venv](venv.md)
- [Pip](pip.md)
- [Argparse](argparse.md)
