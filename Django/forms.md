# Forms

_Django · Reference cheat sheet_

---

## 📋 Overview

Django forms validate and clean user input, then render HTML widgets. Use `Form` for unbound data and `ModelForm` to map model fields. Always validate with `is_valid()` and read `cleaned_data`—never raw `request.POST` for business logic.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `forms.Form` | Standalone fields + validation |
| `forms.ModelForm` | Bound to a model |
| `clean_<field>` / `clean` | Field-level / cross-field validation |
| Widgets | Control HTML input types |
| CSRF | `{% csrf_token %}` on POST forms |
| Formsets | Edit collections of forms |

Bound form: data from request; unbound: empty for GET display.

## 💡 Examples

**ModelForm:**

```python
from django import forms
from .models import Article


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ("title", "slug", "body")
        widgets = {
            "body": forms.Textarea(attrs={"rows": 10}),
        }

    def clean_title(self):
        title = self.cleaned_data["title"].strip()
        if len(title) < 3:
            raise forms.ValidationError("Title too short.")
        return title
```

**View usage:**

```python
from django.shortcuts import redirect, render
from .forms import ArticleForm


def article_create(request):
    if request.method == "POST":
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.author = request.user
            article.save()
            return redirect(article)
    else:
        form = ArticleForm()
    return render(request, "blog/article_form.html", {"form": form})
```

**Template:**

```django
<form method="post" novalidate>
  {% csrf_token %}
  {{ form.non_field_errors }}
  {{ form.as_p }}
  <button type="submit">Save</button>
</form>
```

## ⚠️ Pitfalls

- Skipping CSRF on POSTs yields 403.
- `form.save()` on invalid forms is wrong—check `is_valid()` first.
- `fields = "__all__"` may expose fields you did not intend.
- File uploads need `request.FILES` and `enctype="multipart/form-data"`.

## 🔗 Related

- [Views](views.md)
- [Models](models.md)
- [Built-in class-based views](buildin_views.md)
- [Admin](admin.md)
- [Serializers](serializers.md)
- [Authentication](authentication.md)
