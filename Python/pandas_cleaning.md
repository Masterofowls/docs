# Pandas Cleaning

_Python · Reference cheat sheet_

---

## 📋 Overview

Typical cleanup: missing values, dtypes, duplicates, string normalize, and outliers before groupby/merge.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `isna` / `fillna` / `dropna` | Missing data |
| `astype` / `to_numeric` | Types |
| `drop_duplicates` | Dedupe |
| `str.strip` / `str.lower` | Text normalize |
| `replace` / `map` | Value maps |
| `clip` | Bound outliers |

## 💡 Examples

```python
import pandas as pd

df = pd.read_csv("raw.csv")
df["email"] = df["email"].astype("string").str.strip().str.lower()
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")
df = df.dropna(subset=["email"])
df["amount"] = df["amount"].fillna(0)
df = df.drop_duplicates(subset=["email"], keep="last")
df["amount"] = df["amount"].clip(lower=0)
```

**Parse dates:**

```python
df["created"] = pd.to_datetime(df["created"], utc=True, errors="coerce")
```

## ⚠️ Pitfalls

- `errors="coerce"` turns bad values into NaN — inspect counts after.
- Dropping rows too early can hide data-quality bugs — report null rates.
- Categoricals save memory but need care when adding new levels.

## 🔗 Related

- [Pandas](pandas.md)
- [Pandas indexing](pandas_indexing.md)
- [Csv](csv.md)
