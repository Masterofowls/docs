# CSV and Excel

_Python · Example / how-to_

---

## 📋 Overview

Read/write tabular data with the stdlib `csv` module. For Excel (`.xlsx`), use `openpyxl` or `pandas`. Prefer CSV for interchange; Excel when stakeholders need workbooks.

## 🔧 Core concepts

| Task | Tool |
| --- | --- |
| CSV read/write | `csv.DictReader` / `DictWriter` |
| Dialect | excel, excel-tab, custom |
| Encoding | `utf-8` / `utf-8-sig` (Excel) |
| xlsx | `openpyxl`, `pandas.read_excel` |
| Large files | Stream row-by-row; avoid loading all |

Always open CSV with `newline=""` (as docs recommend) and an explicit encoding.

## 💡 Examples

**CSV round-trip:**

```python
import csv
from pathlib import Path

path = Path("people.csv")
rows = [
    {"name": "Ada", "score": "10"},
    {"name": "Bob", "score": "7"},
]

with path.open("w", encoding="utf-8", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows(rows)

with path.open("r", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):
        print(row["name"], int(row["score"]))
```

**pandas quick path:**

```python
import pandas as pd

df = pd.read_csv("people.csv")
df["score"] = df["score"].astype(int)
df.to_excel("people.xlsx", index=False)
df2 = pd.read_excel("people.xlsx")
print(df2.head())
```

**openpyxl minimal:**

```python
from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws.title = "Scores"
ws.append(["name", "score"])
ws.append(["Ada", 10])
wb.save("scores.xlsx")
```

## ⚠️ Pitfalls

- Excel often expects `utf-8-sig` for CSV to show Unicode correctly.
- Forgetting `newline=""` on Windows can insert blank lines.
- Type coercion: CSV is all strings until you parse.
- Formulas / merged cells in xlsx need library-specific handling.
- Don't load multi-GB CSVs into a single list — stream or use pandas chunks.

## 🔗 Related

- [Manage files](manage_files.md)
- [Dataclass pipeline](dataclass_pipeline.md)
- [SQLite](sqlite.md)
- [../pathlib.md](../pathlib.md)
- [../files_io.md](../files_io.md)
- [../dataclasses.md](../dataclasses.md)
