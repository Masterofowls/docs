# Parse JSON API

_Python · Example / how-to_

---

## 📋 Overview

Fetch a JSON API with `urllib` or `httpx`, validate the shape lightly, and extract fields safely.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| GET + JSON body | Typical REST read |
| `response.json()` | Decode payload |
| Key checks | Avoid `KeyError` on partial data |
| Timeout | Fail fast on hung networks |

## 💡 Examples

**parse_json_api.py (stdlib):**

```python
from __future__ import annotations

import json
import urllib.error
import urllib.request
from typing import Any


def fetch_user(user_id: int, timeout: float = 10.0) -> dict[str, Any]:
    url = f"https://jsonplaceholder.typicode.com/users/{user_id}"
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"HTTP {e.code} for user {user_id}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"network error: {e.reason}") from e

    data = json.loads(raw)
    if not isinstance(data, dict):
        raise ValueError("expected a JSON object")
    if "id" not in data or "email" not in data:
        raise ValueError("missing id or email")
    return data


def main() -> None:
    user = fetch_user(1)
    print(f"{user['name']} <{user['email']}>")


if __name__ == "__main__":
    main()
```

**With httpx (optional):**

```python
import httpx

def fetch_user_httpx(user_id: int) -> dict:
    r = httpx.get(
        f"https://jsonplaceholder.typicode.com/users/{user_id}",
        timeout=10.0,
    )
    r.raise_for_status()
    return r.json()
```

## ⚠️ Pitfalls

- Never assume every key exists — APIs change and error bodies differ.
- Always set a timeout; default can hang forever.
- `json.loads` on HTML error pages raises `JSONDecodeError` — catch it.

## 🔗 Related

- [HTTP requests](http_requests.md)
- [../json.md](../json.md)
- [../exceptions.md](../exceptions.md)
