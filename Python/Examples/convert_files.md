# Convert files

_Python · Example / how-to_

---

## 📋 Overview

Convert between common text/data formats (CSV ↔ JSON, encoding changes, line endings) with the standard library. Keep conversions streaming when files are large; always specify encodings explicitly on Windows.

## 🔧 Core concepts

| Task | Tools |
| --- | --- |
| CSV ↔ JSON | `csv`, `json` |
| Encoding | `open(..., encoding=...)`, `pathlib.Path.read_text` |
| Paths | `pathlib.Path` |
| Binary vs text | Use text mode for CSV/JSON; binary for images/archives |
| Streaming | Iterate rows instead of `read()` whole file |

## 💡 Examples

**CSV to JSON:**

```python
import csv
import json
from pathlib import Path

def csv_to_json(src: Path, dest: Path) -> None:
    with src.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    dest.write_text(json.dumps(rows, indent=2, ensure_ascii=False), encoding="utf-8")

if __name__ == "__main__":
    csv_to_json(Path("users.csv"), Path("users.json"))
```

**JSON to CSV:**

```python
import csv
import json
from pathlib import Path

def json_to_csv(src: Path, dest: Path) -> None:
    rows = json.loads(src.read_text(encoding="utf-8"))
    if not rows:
        dest.write_text("", encoding="utf-8")
        return
    fieldnames = list(rows[0].keys())
    with dest.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

if __name__ == "__main__":
    json_to_csv(Path("users.json"), Path("users.csv"))
```

**Re-encode a text file (e.g. latin-1 → utf-8):**

```python
from pathlib import Path

def reencode(src: Path, dest: Path, from_enc: str = "latin-1", to_enc: str = "utf-8") -> None:
    text = src.read_text(encoding=from_enc)
    dest.write_text(text, encoding=to_enc)

if __name__ == "__main__":
    reencode(Path("legacy.txt"), Path("utf8.txt"))
```

## ⚠️ Pitfalls

- Omitting `encoding=` uses locale defaults—breaks cross-platform.
- CSV needs `newline=""` to avoid blank lines on Windows.
- Nested JSON objects do not map cleanly to flat CSV—flatten or keep JSON.
- Loading huge files with `json.loads` / `list(DictReader)` can exhaust memory.

## 🔗 Related

- [Manage files](manage_files.md)
- [Encrypt](encrypt.md)
- [List to dict](list_to_dict.md)
- [Merge lists](merge_lists.md)
- [../strings.md](../strings.md)
- [../dictionaries.md](../dictionaries.md)
