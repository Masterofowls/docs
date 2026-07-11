# Sys

_Python · Reference cheat sheet_

---

## 📋 Overview

`sys` exposes interpreter and process plumbing: CLI args, module search path, exit codes, and standard streams. Use it for lightweight CLIs; prefer `argparse` when flags grow.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `sys.argv` | CLI args: `[script, ...]` |
| `sys.path` | Module import search list |
| `sys.exit(code)` | Exit process (`0` ok, non-zero error) |
| `sys.stdin` / `stdout` / `stderr` | Text streams |
| `sys.version` / `sys.version_info` | Runtime version |
| `sys.platform` | `win32`, `linux`, `darwin`, … |
| `sys.executable` | Path to this Python binary |
| `sys.getsizeof(obj)` | Approx. object size (bytes) |

## 💡 Examples

**argv:**

```python
import sys

# python tool.py a b
script, *args = sys.argv
print("script:", script)
print("args:", args)
if not args:
    sys.exit("usage: tool.py <files...>")
```

**path and version:**

```python
import sys
from pathlib import Path

print(sys.version_info[:3])
print(sys.executable)
# Add local package root for scripts (prefer installable packages):
root = Path(__file__).resolve().parent
if str(root) not in sys.path:
    sys.path.insert(0, str(root))
```

**stdin / stdout:**

```python
import sys

for line in sys.stdin:
    sys.stdout.write(line.upper())
# echo hello | python upper.py
```

**exit codes:**

```python
import sys

ok = True
sys.exit(0 if ok else 1)
# or: raise SystemExit(2)
```

## ⚠️ Pitfalls

- `sys.argv[0]` is the script path (or `-c` / `-m`), not always a useful name.
- Mutating `sys.path` is a last resort — prefer packages / `PYTHONPATH` / editable installs.
- `sys.exit("msg")` prints to stderr and exits with code `1`.
- Redirected stdout may be block-buffered — flush or use `print(..., flush=True)`.
- Don’t compare versions as strings; use `sys.version_info >= (3, 11)`.

## 🔗 Related

- [Argparse](argparse.md)
- [Os](os.md)
- [Subprocess](subprocess.md)
- [Print / input](print_input.md)
- [Import / export](import_export.md)
