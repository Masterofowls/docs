# Form Methods

_Django · Methods reference_

---

## 📋 Overview

Django `Form` and `ModelForm` instance/class methods.

## 🔧 Methods

### Form instance

| Method | Description |
| --- | --- |
| `is_valid()` | Run validation; populates cleaned_data |
| `full_clean()` | Lower-level validation pipeline |
| `add_error(field, error)` | Attach non-field or field error |
| `has_error(field, code=…)` | Check errors present |
| `save(commit=True)` | ModelForm — save instance |
| `as_p()` / `as_table()` / `as_ul()` | HTML rendering helpers |

### Field widgets

| API | Description |
| --- | --- |
| `clean_<fieldname>()` | Per-field validator hook |
| `clean()` | Cross-field validation |
| `Field.to_python(value)` | Convert to Python type |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Forms](../forms.md)
