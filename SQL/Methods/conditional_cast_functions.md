# Conditional & Cast Functions

_SQL · Methods reference_

---

## 📋 Overview

Branching logic, NULL handling, and type conversion in SQL.

## 🔧 Methods

### Conditional & null

| Function | Description |
| --- | --- |
| `CASE WHEN … THEN … ELSE … END` | Conditional expression |
| `COALESCE(a, b, …)` | First non-NULL argument |
| `NULLIF(a, b)` | NULL if a equals b |
| `IF(cond, a, b)` (MySQL) | Simple conditional |
| `GREATEST(a,b,…)` / `LEAST` | Max/min of args |

### Cast & JSON

| Function | Description |
| --- | --- |
| `CAST(x AS type)` | Standard cast |
| `x::type` (PG) | Postgres cast shorthand |
| `JSON_EXTRACT` (MySQL) / `->` / `->>` (PG) | JSON path access |
| `JSON_BUILD_OBJECT` / `JSON_AGG` (PG) | Build JSON in SQL |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Built-in functions](../functions_builtin.md)
- [Nulls](../nulls.md)
