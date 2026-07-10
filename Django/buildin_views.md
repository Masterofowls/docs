# Built-in class-based views

_Django · Reference cheat sheet_

---

## 📋 Overview

Django ships generic class-based views (CBVs) for common patterns: templates, lists, details, create/update/delete, redirects, and dates. Subclass, set attributes (`model`, `queryset`, `template_name`), and wire with `as_view()` in URLconfs.

## 🔧 Core concepts

| View | Purpose |
| --- | --- |
| `TemplateView` | Render a template with optional extra context |
| `RedirectView` | HTTP redirect |
| `ListView` / `DetailView` | Object collections / single object |
| `CreateView` / `UpdateView` / `DeleteView` | Model form CRUD |
| `FormView` | Arbitrary form |
| Date views | `ArchiveIndexView`, `YearArchiveView`, … |
| Mixins | `LoginRequiredMixin`, `PermissionRequiredMixin`, `UserPassesTestMixin` |

Lifecycle hooks: `get_queryset`, `get_context_data`, `form_valid`, `get_success_url`.

## 💡 Examples

**List and detail:**

```python
from django.views.generic import DetailView, ListView
from .models import Article


class ArticleListView(ListView):
    model = Article
    paginate_by = 20
    context_object_name = "articles"
    template_name = "blog/article_list.html"

    def get_queryset(self):
        return Article.objects.filter(is_published=True).select_related("author")


class ArticleDetailView(DetailView):
    model = Article
    slug_field = "slug"
    context_object_name = "article"
```

**Create with auth:**

```python
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .models import Article


class ArticleCreateView(LoginRequiredMixin, CreateView):
    model = Article
    fields = ("title", "body", "slug")
    success_url = reverse_lazy("article-list")

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
```

**URLs:**

```python
from django.urls import path
from .views import ArticleCreateView, ArticleDetailView, ArticleListView

urlpatterns = [
    path("", ArticleListView.as_view(), name="article-list"),
    path("new/", ArticleCreateView.as_view(), name="article-create"),
    path("<slug:slug>/", ArticleDetailView.as_view(), name="article-detail"),
]
```

## ⚠️ Pitfalls

- Forgetting `.as_view()` in `urlpatterns` passes the class, not a callable.
- `fields = "__all__"` on Create/Update can expose sensitive model fields.
- Overriding `get()` without calling `super()` drops mixin behavior.
- Multiple inheritance mixin order matters—mixins left of the base view.

## 🔗 Related

- [Views](views.md)
- [URLs](urls.md)
- [Forms](forms.md)
- [Models](models.md)
- [Authentication](authentication.md)
- [Admin](admin.md)
