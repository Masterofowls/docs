# File uploads

_Django · Reference cheat sheet_

---

## 📋 Overview

Uploaded files arrive on `request.FILES`. Model `FileField` / `ImageField` store paths under `MEDIA_ROOT` and expose URLs via `MEDIA_URL`. Validate size/type; never trust client filenames. In production, serve media from object storage or a dedicated host—not the app process.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `request.FILES` | Uploaded file mapping |
| `FileField` / `ImageField` | Model storage |
| `enctype="multipart/form-data"` | Required on forms |
| `upload_to` | Path callable / string |
| `STORAGES["default"]` | Backend (local, S3, …) |
| Validators | Size, extension, content-type |

Temporary files use `TemporaryUploadedFile` above `FILE_UPLOAD_MAX_MEMORY_SIZE`.

## 💡 Examples

**Model + form:**

```python
import uuid
from pathlib import Path

from django.db import models


def avatar_path(instance, filename):
    ext = Path(filename).suffix.lower()
    return f"avatars/{instance.pk}/{uuid.uuid4().hex}{ext}"


class Profile(models.Model):
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to=avatar_path, blank=True)
```

```python
from django import forms


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ("avatar",)
```

**View:**

```python
def upload_avatar(request):
    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect("profile")
    else:
        form = ProfileForm(instance=request.user.profile)
    return render(request, "upload.html", {"form": form})
```

```django
<form method="post" enctype="multipart/form-data">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit">Upload</button>
</form>
```

**Settings:**

```python
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
DATA_UPLOAD_MAX_MEMORY_SIZE = 5 * 1024 * 1024
```

## ⚠️ Pitfalls

- Missing `enctype` → empty `request.FILES`.
- Serving user uploads as static executable content → XSS/RCE risk.
- Trusting `Content-Type` / extension alone—inspect content when needed.
- Not deleting old files on replace (storage orphans).
- Huge uploads without size limits or streaming.

## 🔗 Related

- [Forms](forms.md)
- [Models](models.md)
- [Validators](validators.md)
- [Static files](static_files.md)
- [Security](security.md)
- [Settings](settings.md)
