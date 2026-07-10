# django-allauth

_Django · Reference cheat sheet_

---

## 📋 Overview

[django-allauth](https://docs.allauth.org/) adds local and social authentication: registration, email verification, password reset, and providers (Google, GitHub, etc.). Prefer it over rolling your own auth UI. Works with Django 4.2+/5.x; configure via settings and include its URLs.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `allauth` / `allauth.account` | Email/username accounts |
| `allauth.socialaccount` | OAuth providers |
| `ACCOUNT_*` settings | Verification, login methods, adapters |
| Templates | Override under `templates/account/` |
| Adapters | Customize redirects and signup behavior |
| Headless / API | Newer allauth headless APIs for SPAs |

Install: `pip install django-allauth` (add provider extras as needed).

## 💡 Examples

**Settings sketch:**

```python
INSTALLED_APPS = [
    # Django contrib…
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.github",
]

SITE_ID = 1

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

MIDDLEWARE = [
    # …
    "allauth.account.middleware.AccountMiddleware",  # allauth 0.56+
]

LOGIN_REDIRECT_URL = "/"
ACCOUNT_LOGOUT_REDIRECT_URL = "/"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "mandatory"  # "optional" | "none"
ACCOUNT_AUTHENTICATION_METHOD = "email"  # or "username" / "username_email"
```

**URLs:**

```python
from django.urls import include, path

urlpatterns = [
    path("accounts/", include("allauth.urls")),
]
```

**Provider settings (GitHub):**

```python
SOCIALACCOUNT_PROVIDERS = {
    "github": {
        "APP": {
            "client_id": "…",
            "secret": "…",
            "key": "",
        },
        "SCOPE": ["user:email"],
    }
}
```

Prefer env vars / `django-environ` over hardcoding secrets.

## ⚠️ Pitfalls

- Missing `django.contrib.sites` + `SITE_ID` breaks allauth.
- Email backend must work in production for verification (`EMAIL_HOST` or console in dev).
- Custom user models need correct `ACCOUNT_USER_MODEL_*` / adapter settings.
- Provider callback URLs must match the OAuth app config exactly (https, path).

## 🔗 Related

- [Authentication](authentication.md)
- [Settings](settings.md)
- [URLs](urls.md)
- [Views](views.md)
- [Admin](admin.md)
- [REST framework](rest_framework.md)
