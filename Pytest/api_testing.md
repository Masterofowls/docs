# API Testing

_Pytest · Reference cheat sheet_

---

## 📋 Overview

Test HTTP APIs with `requests`/`httpx` against a running server, or call FastAPI/Flask test clients in-process. Assert status, headers, and JSON body; seed data in fixtures.

## 🔧 Core concepts

| Approach | When |
| --- | --- |
| Test client | Fast in-process (Flask/FastAPI/Django) |
| Real HTTP | Contract / staging smoke |
| `responses` / `respx` | Mock outbound calls |
| Status + schema | 2xx/4xx + JSON shape |

## 💡 Examples

**requests against local API:**

```python
import os
import requests

BASE = os.getenv("API_URL", "http://127.0.0.1:8000")

def test_list_items():
    r = requests.get(f"{BASE}/api/items", timeout=5)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)

def test_create_item():
    r = requests.post(
        f"{BASE}/api/items",
        json={"title": "Notebook"},
        timeout=5,
    )
    assert r.status_code in (200, 201)
    assert r.json()["title"] == "Notebook"
```

**FastAPI TestClient:**

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"ok": True}
```

**Expect 401:**

```python
def test_private_without_token():
    r = requests.get(f"{BASE}/api/me", timeout=5)
    assert r.status_code == 401
```

## ⚠️ Pitfalls

- Always set timeouts on real HTTP.
- Clean up created rows (fixture teardown or unique ids).
- Don't hardcode production URLs in unit suites.

## 🔗 Related

- [Auth testing](auth_testing.md)
- [Testing basics](testing_basics.md)
- [Mocking](mocking.md)
- [Django pytest](django_pytest.md)
