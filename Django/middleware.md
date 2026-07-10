# Middleware

_Django · Reference cheat sheet_

---

## 📋 Overview

Middleware is a hook into Django’s request/response cycle. Each class can process the request before the view, the response after, and exceptions. Order in `MIDDLEWARE` matters—security and session middleware run early; custom logic usually sits after auth.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `__init__(get_response)` | Store next callable (Django 1.10+ style) |
| `__call__(request)` | Process request → call `get_response` → process response |
| `process_view` | After URL resolve, before view (optional) |
| `process_exception` | On view exception (optional) |
| `process_template_response` | For `TemplateResponse` (optional) |
| Short-circuit | Return `HttpResponse` without calling `get_response` |

Built-ins: `SecurityMiddleware`, `SessionMiddleware`, `CommonMiddleware`, `CsrfViewMiddleware`, `AuthenticationMiddleware`, `MessageMiddleware`, `XFrameOptionsMiddleware`.

## 💡 Examples

**Simple timing middleware:**

```python
import time
from django.utils.deprecation import MiddlewareMixin  # avoid if possible


class TimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start = time.perf_counter()
        response = self.get_response(request)
        elapsed_ms = (time.perf_counter() - start) * 1000
        response["X-Request-Duration-Ms"] = f"{elapsed_ms:.1f}"
        return response
```

**Settings:**

```python
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "myapp.middleware.TimingMiddleware",
]
```

**Short-circuit (maintenance mode):**

```python
from django.http import HttpResponse

class MaintenanceMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if getattr(settings, "MAINTENANCE_MODE", False):
            return HttpResponse("Down for maintenance", status=503)
        return self.get_response(request)
```

## ⚠️ Pitfalls

- Wrong order: CSRF after session; auth after session.
- Mutating `request` after the view has run does nothing useful for that response.
- Heavy work in middleware hits every request—cache or skip static paths.
- Prefer new-style `__call__` over deprecated `MiddlewareMixin` patterns.
- Async views need async-capable middleware on ASGI (Django 4.1+).

## 🔗 Related

- [Settings](settings.md)
- [Views](views.md)
- [Sessions](sessions.md)
- [Security](security.md)
- [Authentication](authentication.md)
- [ASGI / Channels](asgi_channels.md)
