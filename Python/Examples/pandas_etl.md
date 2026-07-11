# Pandas ETL

_Python · Example / how-to_

---

## 📋 Overview

Small ETL: read CSVs, clean, join, aggregate, write a summary.

## 🔧 Core concepts

| Stage | Action |
| --- | --- |
| Extract | `read_csv` |
| Transform | clean + merge + groupby |
| Load | `to_csv` |

## 💡 Examples

```python
import pandas as pd

orders = pd.read_csv("orders.csv")
customers = pd.read_csv("customers.csv")

orders["amount"] = pd.to_numeric(orders["amount"], errors="coerce").fillna(0)
orders["created"] = pd.to_datetime(orders["created"], errors="coerce")

joined = pd.merge(orders, customers, on="customer_id", how="left")
summary = (
    joined.groupby(["region"], as_index=False)
    .agg(revenue=("amount", "sum"), orders=("amount", "count"))
    .sort_values("revenue", ascending=False)
)
summary.to_csv("region_summary.csv", index=False)
print(summary.head())
```

## ⚠️ Pitfalls

- Validate join key uniqueness on the dimension table.
- Timezones: normalize to UTC before daily buckets.

## 🔗 Related

- [Pandas](../pandas.md)
- [Pandas cleaning](../pandas_cleaning.md)
- [Pandas indexing](../pandas_indexing.md)
