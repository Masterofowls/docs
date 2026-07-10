# Serializers

_Django · Reference cheat sheet_

---

## 📋 Overview

DRF serializers convert between complex types (model instances, querysets) and JSON-native Python data. They validate incoming payloads like Django forms. Prefer `ModelSerializer` for CRUD; use plain `Serializer` for custom shapes and write-only flows (e.g. password change).

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `Serializer` | Explicit fields |
| `ModelSerializer` | Auto fields from a model |
| `validated_data` | After `is_valid()` |
| Nested serializers | Embed related objects |
| `read_only` / `write_only` | Directional fields |
| `SerializerMethodField` | Computed output |
| Validators | UniqueTogether, custom `validate_*` |

Call `serializer.save()` only after successful validation (ModelSerializer).

## 💡 Examples

**ModelSerializer:**

```python
from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.get_username", read_only=True)

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "slug",
            "body",
            "author",
            "author_name",
            "is_published",
            "published_at",
        )
        read_only_fields = ("author", "published_at")

    def validate_title(self, value: str) -> str:
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError("Title too short.")
        return value
```

**Create / update in a view:**

```python
serializer = ArticleSerializer(data=request.data)
serializer.is_valid(raise_exception=True)
article = serializer.save(author=request.user)
return Response(ArticleSerializer(article).data, status=201)
```

**Nested / method field:**

```python
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name")


class ArticleDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    summary = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ("id", "title", "slug", "tags", "summary")

    def get_summary(self, obj: Article) -> str:
        return obj.body[:120]
```

## ⚠️ Pitfalls

- Returning `serializer.data` before `is_valid()` on input serializers is wrong for writes.
- Writable nested serializers need custom `create`/`update`.
- Exposing sensitive model fields via `fields = "__all__"`.
- Forgetting `many=True` for lists causes cryptic errors.

## 🔗 Related

- [REST framework](rest_framework.md)
- [Models](models.md)
- [Forms](forms.md)
- [Views](views.md)
- [Authentication](authentication.md)
- [URLs](urls.md)
