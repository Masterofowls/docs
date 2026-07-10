# Static files

_Django · Reference cheat sheet_

---

## 📋 Overview

Static files are CSS, JS, and images not uploaded by users. In development, Django can serve them; in production, collect into `STATIC_ROOT` and serve via WhiteNoise, nginx, or a CDN. Use `{% static %}` and `django.contrib.staticfiles`.

## 🔧 Core concepts

| Setting | Role |
| --- | --- |
| `STATIC_URL` | URL prefix (`/static/`) |
| `STATIC_ROOT` | Collect destination for prod |
| `STATICFILES_DIRS` | Extra project-level dirs |
| App `static/` | Per-app assets |
| `collectstatic` | Copy/hashed files to `STATIC_ROOT` |
| Storages | `ManifestStaticFilesStorage`, S3, etc. |

Finders locate files; Manifest storage adds cache-busting hashes.

## 💡 Examples

**Settings:**

```python
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "assets"]
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.ManifestStaticFilesStorage",
    },
}
```

**Template:**

```django
{% load static %}
<link rel="stylesheet" href="{% static 'blog/app.css' %}">
<script src="{% static 'blog/app.js' %}"></script>
```

**Collect:**

```bash
python manage.py collectstatic --noinput
python manage.py findstatic blog/app.css
```

**WhiteNoise (typical):**

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    ...
]
```

## ⚠️ Pitfalls

- Confusing static files with media (`MEDIA_URL` / user uploads).
- Hardcoding `/static/...` instead of `{% static %}`.
- Forgetting `collectstatic` in deploy pipelines.
- Putting secrets or env-specific config inside static JS—use templated bootstrapping carefully.
- App static name collisions—namespace under `static/<app_label>/`.

## 🔗 Related

- [Templates](templates.md)
- [Settings](settings.md)
- [File uploads](file_uploads.md)
- [Security](security.md)
- [Middleware](middleware.md)
