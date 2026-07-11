# Tempfile

_Python · Reference cheat sheet_

---

## 📋 Overview

`tempfile` creates temporary files and directories that are unique and (usually) cleaned up automatically. Prefer context managers (`TemporaryDirectory`, `NamedTemporaryFile`) so cleanup happens even on errors.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `TemporaryDirectory()` | Temp dir; deleted on exit |
| `NamedTemporaryFile()` | Named temp file on disk |
| `TemporaryFile()` | Anon file (may lack usable name) |
| `mkstemp()` / `mkdtemp()` | Low-level create (manual cleanup) |
| `gettempdir()` | System temp directory |
| `suffix=` / `prefix=` / `dir=` | Naming / location |

On Windows, `NamedTemporaryFile(delete=True)` may block reopening by name while still open — use `delete=False` and unlink yourself when needed.

## 💡 Examples

**TemporaryDirectory:**

```python
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory(prefix="job-") as tmp:
    root = Path(tmp)
    (root / "out.txt").write_text("ok", encoding="utf-8")
    print(list(root.iterdir()))
# directory is gone here
```

**NamedTemporaryFile:**

```python
from tempfile import NamedTemporaryFile

with NamedTemporaryFile("w+", suffix=".csv", delete=True, encoding="utf-8") as f:
    f.write("a,b\n1,2\n")
    f.flush()
    print(f.name)
    f.seek(0)
    print(f.read())
```

**delete=False for external tools:**

```python
from pathlib import Path
from tempfile import NamedTemporaryFile

with NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f:
    path = Path(f.name)
    f.write("payload")

try:
    print(path.read_text(encoding="utf-8"))
finally:
    path.unlink(missing_ok=True)
```

**gettempdir:**

```python
import tempfile
from pathlib import Path

print(Path(tempfile.gettempdir()))
```

## ⚠️ Pitfalls

- Temp dirs vanish when the context exits — copy results out first.
- Windows: can’t always reopen a still-open `NamedTemporaryFile` by name.
- `mkstemp` returns an open fd you must close and a path you must delete.
- Secure defaults matter for secrets; avoid world-readable custom `dir=`.
- Don’t assume temp paths persist across reboots or process restarts.

## 🔗 Related

- [Pathlib](pathlib.md)
- [Files I/O](files_io.md)
- [Shutil](shutil.md)
- [Context managers](context_managers.md)
- [Os](os.md)
