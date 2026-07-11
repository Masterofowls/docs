# Pandas

_Python · Reference cheat sheet_

---

## 📋 Overview

Pandas is the go-to tabular data library. Install with `pip install pandas`. Core types: `Series` (1D labeled) and `DataFrame` (2D table). Typical flow: `read_csv` → filter/transform → `groupby` / `merge` → `to_csv`.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `pd.Series(data)` | 1D labeled array |
| `pd.DataFrame(data)` | Table (columns + index) |
| `pd.read_csv(path)` | Load CSV |
| `df[mask]` / `.loc` / `.iloc` | Filter / select |
| `df.groupby(col)` | Split-apply-combine |
| `pd.merge(left, right, on=...)` | Join tables |
| `df.to_csv(path, index=False)` | Export |
| `df.head()` / `.info()` / `.describe()` | Inspect |
| `df.assign` | Add columns functionally |
| `df.sort_values` | Order rows |
| `df.pivot_table` | Reshape aggregates |
| `pd.concat` | Stack frames |

**Theory:** A DataFrame is a labeled column store — vectorized ops beat Python loops. Indexing aligns on labels during arithmetic. Missing data is `NaN`/`NaT`/`<NA>`; most reductions skip NaNs by default (`skipna=True`). Prefer explicit `.loc` writes over chained `[][]`.

## 💡 Examples

**Read and filter:**

```python
import pandas as pd

df = pd.read_csv("sales.csv")
active = df[df["status"] == "active"]
big = df.loc[df["amount"] > 100, ["name", "amount"]]
print(df.head(), active.shape)
```

**Groupby:**

```python
import pandas as pd

df = pd.read_csv("orders.csv")
summary = (
    df.groupby("region", as_index=False)["amount"]
    .sum()
    .sort_values("amount", ascending=False)
)
print(summary)
```

**Merge:**

```python
import pandas as pd

orders = pd.read_csv("orders.csv")
customers = pd.read_csv("customers.csv")
joined = pd.merge(orders, customers, on="customer_id", how="left")
print(joined.head())
```

**Write CSV:**

```python
import pandas as pd

df = pd.DataFrame({"a": [1, 2], "b": ["x", "y"]})
df.to_csv("out.csv", index=False, encoding="utf-8")
```

**Assign + sort:**

```python
import pandas as pd

df = pd.DataFrame({"n": [3, 1, 2], "x": [10, 20, 30]})
df = (
    df.assign(double=lambda d: d["x"] * 2)
    .sort_values("n")
    .reset_index(drop=True)
)
print(df)
```

**Pivot table:**

```python
import pandas as pd

sales = pd.DataFrame({
    "region": ["E", "E", "W", "W"],
    "product": ["a", "b", "a", "b"],
    "amount": [10, 4, 8, 6],
})
print(sales.pivot_table(index="region", columns="product", values="amount", aggfunc="sum"))
```

**Value counts:**

```python
print(df["status"].value_counts(dropna=False))
print(df["status"].value_counts(normalize=True))
```

## ⚠️ Pitfalls

- Install first: `pip install pandas` (not in the stdlib).
- Chained indexing (`df[...][...] =`) can fail silently — prefer `.loc`.
- `groupby` default may leave the key as index; use `as_index=False` when you want a flat frame.
- Merges duplicate key columns as `_x` / `_y` if names collide — set `suffixes`.
- Large CSVs: pass `usecols`, `dtype`, or chunk with `chunksize=`.

## 🔗 Related

- [Csv](csv.md)
- [Files I/O](files_io.md)
- [Pandas indexing](pandas_indexing.md)
- [Pandas cleaning](pandas_cleaning.md)
- [Pandas ETL](Examples/pandas_etl.md)
- [Pip](pip.md)
- [Venv](venv.md)
