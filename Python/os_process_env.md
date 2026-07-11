# OS Process & Env

_Python · Reference cheat sheet_

---

## 📋 Overview

Deeper `os` usage: process ids, walk trees, permissions bits, and portable env handling for CLIs and services.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `os.getpid` / `getppid` | Process identity |
| `os.walk(top)` | Recursive dir visit |
| `os.stat(path)` | Size, mtime, mode |
| `os.access(path, R_OK)` | Permission probe |
| `os.environb` | Bytes env (Unix) |
| `os.cpu_count()` | Parallelism hint |

Theory: env is inherited by child processes. Mutating `os.environ` affects the current process only unless you pass `env=` to `subprocess`.

## 💡 Examples

**Walk and filter:**

```python
import os

for root, dirs, files in os.walk("src"):
    dirs[:] = [d for d in dirs if d != "__pycache__"]
    for name in files:
        if name.endswith(".py"):
            print(os.path.join(root, name))
```

**Stat file:**

```python
import os
import time

st = os.stat("README.md")
print(st.st_size, time.ctime(st.st_mtime))
```

**Required env:**

```python
import os
import sys

def require(name: str) -> str:
    val = os.getenv(name)
    if not val:
        sys.exit(f"missing env {name}")
    return val

DATABASE_URL = require("DATABASE_URL")
```

## ⚠️ Pitfalls

- `os.access` has TOCTOU races — prefer try/except on open.
- `walk` mutates `dirs` in place to prune — a powerful but easy-to-miss trick.
- Never log full env dumps in production (secrets).

## 🔗 Related

- [OS](os.md)
- [Subprocess](subprocess.md)
- [Pathlib](pathlib.md)
- [Dotenv](dotenv.md)
