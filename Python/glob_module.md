# Glob

_Python · Reference cheat sheet_

---

## 📋 Overview

The `glob` module expands Unix-style filename patterns into matching paths. Use `glob.glob` for a list, `glob.iglob` for a lazy iterator. For OO APIs, prefer `pathlib.Path.glob` / `.rglob`.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `glob.glob(pattern)` | List of matching path strings |
| `glob.iglob(pattern)` | Iterator (memory-friendly) |
| `*` | Any chars in one segment |
| `?` | Single char |
| `**` | Recursive dirs (`recursive=True`) |
| `[abc]` / `[0-9]` | Character class |
| `glob.escape(s)` | Escape literal `*?[` in names |
| `Path.glob` / `Path.rglob` | pathlib equivalents |

Patterns are relative to the current working directory unless absolute.

## 💡 Examples

**Basic glob:**

```python
import glob

py_files = glob.glob("src/*.py")
print(sorted(py_files))
```

**Recursive **:**

```python
import glob

for path in glob.iglob("**/*.md", recursive=True):
    print(path)
```

**Character classes and escape:**

```python
import glob

# match report1.csv … report9.csv
print(glob.glob("report[1-9].csv"))

needle = "file[1].txt"
print(glob.glob(glob.escape(needle)))  # literal brackets
```

**pathlib alternative:**

```python
from pathlib import Path

root = Path("src")
for p in sorted(root.rglob("*.py")):
    if p.is_file():
        print(p.relative_to(root))
```

## ⚠️ Pitfalls

- `**` only recurses when `recursive=True` (stdlib `glob`).
- Results are unordered — sort if you need stable output.
- Hidden files (`.` prefix) may be skipped depending on pattern/platform.
- Huge trees: prefer `iglob` / pathlib over building giant lists.
- Patterns follow cwd — anchor with absolute paths when scripts `chdir`.

## 🔗 Related

- [Pathlib](pathlib.md)
- [Files I/O](files_io.md)
- [Os](os.md)
- [Shutil](shutil.md)
- [Regex](regex.md)
