# Field Lookups

_Django · Methods reference_

---

## 📋 Overview

ORM lookup expressions via `field__lookup=value`.

## 🔧 Methods

### Common lookups

| Lookup | Description |
| --- | --- |
| `exact` / `iexact` | Case-sensitive / insensitive equality |
| `contains` / `icontains` | Substring match |
| `in` | Value in iterable |
| `gt` / `gte` / `lt` / `lte` | Comparisons |
| `startswith` / `istartswith` / `endswith` / `iendswith` | Prefix/suffix |
| `range` | Between tuple endpoints |
| `isnull` | True/False for NULL |
| `regex` / `iregex` | Database regex |
| `date` / `year` / `month` / `day` | Date part extraction |
| `year__gte` etc. | Chained transforms |
| `F()` expressions | Compare/update using column values |
| `Q()` objects | OR / complex boolean filter logic |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [QuerySet](../queryset.md)
