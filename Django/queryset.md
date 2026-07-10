# QuerySet

_Django · Reference cheat sheet_

---

## 📋 Overview

A `QuerySet` is a lazy, chainable representation of a DB query. Evaluation happens on iteration, `list()`, `bool()`, slicing with step, or terminal methods (`get`, `count`, `exists`, `aggregate`). Optimize with `select_related` / `prefetch_related` and defer unused fields.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `filter` / `exclude` | Narrow rows (`Q` for OR/complex) |
| `get` | Exactly one row or raise |
| `create` / `get_or_create` / `update_or_create` | Write helpers |
| `annotate` / `aggregate` | Per-row / whole-set aggregates |
| `order_by` / `distinct` | Sort / unique |
| `values` / `values_list` | Dicts / tuples instead of models |
| `select_related` | JOIN for FK / O2O |
| `prefetch_related` | Separate query for M2M / reverse FK |
| `only` / `defer` | Column subset |
| `iterator` | Stream large results |

Lookups: `field__lookup` (`exact`, `iexact`, `contains`, `in`, `gt`, `isnull`, …).

## 💡 Examples

**Filtering and Q objects:**

```python
from django.db.models import Q, Count

Article.objects.filter(is_published=True).exclude(author=None)

Article.objects.filter(
    Q(title__icontains="django") | Q(tags__name="python")
).distinct()
```

**Related + annotate:**

```python
qs = (
    Article.objects.filter(is_published=True)
    .select_related("author")
    .prefetch_related("tags")
    .annotate(tag_count=Count("tags"))
    .order_by("-published_at")
)
```

**Updates and existence:**

```python
Article.objects.filter(pk=1).update(is_published=True)  # no signals
Article.objects.filter(slug="hello").exists()
Article.objects.values_list("id", flat=True)
```

## ⚠️ Pitfalls

- N+1: accessing `.author` / `.tags.all()` in a loop without prefetch.
- Evaluating the same queryset twice unexpectedly (cache after first eval).
- `get()` raises `DoesNotExist` / `MultipleObjectsReturned`.
- Chaining after slicing can be restricted; prefer filter before slice.
- `update()` / `bulk_create` skip `save()` and most signals.

## 🔗 Related

- [Models](models.md)
- [Managers](managers.md)
- [Transactions / ORM](transactions_orm.md)
- [Pagination](pagination.md)
- [Testing](testing.md)
