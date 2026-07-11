# Aggregate Functions

_SQL · Methods reference_

---

## 📋 Overview

Functions collapsing many rows to one value — used with GROUP BY or alone.

## 🔧 Methods

### Common aggregates

| Function | Description |
| --- | --- |
| `COUNT(*)` / `COUNT(col)` / `COUNT(DISTINCT col)` | Row or non-null counts |
| `SUM(expr)` | Numeric total |
| `AVG(expr)` | Mean — NULLs skipped |
| `MIN(expr)` / `MAX(expr)` | Minimum / maximum |
| `BOOL_AND` / `BOOL_OR` (PG) | Logical aggregate |
| `ARRAY_AGG(col)` (PG) | Collect to array |
| `STRING_AGG(col, sep)` (PG) | Join strings with separator |
| `GROUP_CONCAT(col)` (MySQL) | Concatenate grouped strings |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Aggregate](../aggregate.md)
- [Distinct & GROUP BY](../distinct_group_by.md)
