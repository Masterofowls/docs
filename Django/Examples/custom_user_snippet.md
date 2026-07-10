# Custom User Snippet

_Django · Example / how-to_

---

## 📋 Overview

Swap in a custom user model early with email as the username field using `AbstractUser` and `AUTH_USER_MODEL`.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `AbstractUser` | Keep Django auth features |
| `USERNAME_FIELD` | Login identifier |
| `AUTH_USER_MODEL` | Project-wide reference |
| Migrations | Must exist before first migrate |

## 💡 Examples

**accounts/models.py:**

```python
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self) -> str:
        return self.email
```

**settings.py:**

```python
INSTALLED_APPS = [
    # ...
    "accounts",
    "django.contrib.auth",
    # ...
]

AUTH_USER_MODEL = "accounts.User"
```

**Foreign keys elsewhere:**

```python
from django.conf import settings
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    bio = models.TextField(blank=True)
```

## ⚠️ Pitfalls

- Changing `AUTH_USER_MODEL` after migrations is painful — set it on day one.
- Always reference `settings.AUTH_USER_MODEL`, never hard-code `auth.User`.
- Admin / forms may need a custom user admin when fields change.

## 🔗 Related

- [CRUD CBV](crud_cbv.md)
- [DRF list create](drf_list_create.md)
