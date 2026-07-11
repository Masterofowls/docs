# Login Auth Test

_Pytest · Example / how-to_

---

## 📋 Overview

Happy-path and failure-path login tests for a JSON auth API.

## 🔧 Core concepts

| Case | Expect |
| --- | --- |
| Valid creds | Token present |
| Wrong password | 401 |
| Protected + token | 200 |

## 💡 Examples

```python
import os
import requests

BASE = os.getenv("API_URL", "http://127.0.0.1:8000")
EMAIL = os.getenv("TEST_EMAIL", "ada@example.com")
PASSWORD = os.getenv("TEST_PASS", "correct-horse")

def test_login_ok():
    r = requests.post(
        f"{BASE}/api/auth/login",
        json={"email": EMAIL, "password": PASSWORD},
        timeout=5,
    )
    assert r.status_code == 200
    body = r.json()
    assert "access_token" in body

def test_login_bad_password():
    r = requests.post(
        f"{BASE}/api/auth/login",
        json={"email": EMAIL, "password": "nope"},
        timeout=5,
    )
    assert r.status_code in (400, 401)

def test_protected_with_token():
    login = requests.post(
        f"{BASE}/api/auth/login",
        json={"email": EMAIL, "password": PASSWORD},
        timeout=5,
    )
    token = login.json()["access_token"]
    me = requests.get(
        f"{BASE}/api/me",
        headers={"Authorization": f"Bearer {token}"},
        timeout=5,
    )
    assert me.status_code == 200
```

## ⚠️ Pitfalls

- Seed the test user in CI before the suite runs.
- Rate limits can flake login spam — reuse one token fixture when possible.

## 🔗 Related

- [Auth testing](../auth_testing.md)
- [API client test](api_client_test.md)
