# Model & Manager Methods

_Django · Methods reference_

---

## 📋 Overview

Model instance methods and default/custom managers.

## 🔧 Methods

### Model instance

| Method | Description |
| --- | --- |
| `save(force_insert?, force_update?, …)` | Persist to DB |
| `delete()` | Remove row; returns (count, details) |
| `refresh_from_db(fields=…)` | Reload from database |
| `full_clean(exclude=…)` | Run validators + field checks |
| `get_FOO_display()` | Human label for choices field FOO |
| `get_absolute_url()` | Canonical URL (if defined) |

### Manager / QuerySet entry

| API | Description |
| --- | --- |
| `Model.objects` | Default manager |
| `Model.objects.all()` | Starting queryset |
| Custom `Manager` / `QuerySet.as_manager()` | Custom chain methods |
| `Meta: default_manager_name` | Which manager is `_default_manager` |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Models](../models.md)
- [Managers](../managers.md)
