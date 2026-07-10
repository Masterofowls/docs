# Models

_Django · Reference cheat sheet_

---

## 📋 Overview

Models define database tables via Django ORM. Subclass `django.db.models.Model`, declare fields and `Meta`, then `makemigrations` / `migrate`. Prefer explicit `related_name`, indexes for common filters, and `get_absolute_url` for object links.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Fields | `CharField`, `TextField`, `ForeignKey`, `ManyToManyField`, … |
| Options | `null`, `blank`, `default`, `unique`, `db_index` |
| Relations | FK / M2M / O2O with `on_delete` |
| Managers | `objects` / custom `Manager` + `QuerySet` |
| Meta | `ordering`, `constraints`, `indexes`, `unique_together` → `UniqueConstraint` |
| Migrations | Schema evolution under `migrations/` |

`null` is DB-level; `blank` is validation/forms-level.

## 💡 Examples

**Typical model:**

```python
from django.conf import settings
from django.db import models
from django.urls import reverse


class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    body = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="articles",
    )
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-published_at", "-pk")
        indexes = [
            models.Index(fields=["is_published", "published_at"]),
        ]

    def __str__(self) -> str:
        return self.title

    def get_absolute_url(self):
        return reverse("article-detail", kwargs={"slug": self.slug})
```

**Query patterns:**

```python
Article.objects.filter(is_published=True).select_related("author")
Article.objects.prefetch_related("tags")
Article.objects.get(slug="hello")
```

## ⚠️ Pitfalls

- `CharField(null=True)` usually wrong—use `blank=True` + default `""`.
- Missing `on_delete` on `ForeignKey` is required.
- N+1 queries: use `select_related` / `prefetch_related`.
- Changing fields without migrations desyncs DB and code.
- Avoid circular imports—use string references `"app.Model"`.

## 🔗 Related

- [Admin](admin.md)
- [Forms](forms.md)
- [Serializers](serializers.md)
- [Views](views.md)
- [Settings](settings.md)
- [REST framework](rest_framework.md)
