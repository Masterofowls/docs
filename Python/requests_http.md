# Requests

_Python · Reference cheat sheet_

---

## 📋 Overview

`requests` is the popular third-party HTTP client. Install: `pip install requests`. Use it for GET/POST, JSON APIs, headers, and timeouts. For stdlib-only code, see `urllib` — most apps prefer `requests`.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `requests.get(url, ...)` | HTTP GET |
| `requests.post(url, ...)` | HTTP POST |
| `params=` | Query string dict |
| `json=` | Encode body as JSON + set content-type |
| `data=` / `files=` | Form body / multipart |
| `headers=` | Custom headers |
| `timeout=` | Connect/read timeout (seconds) |
| `r.raise_for_status()` | Raise on 4xx/5xx |
| `r.json()` / `r.text` / `r.content` | Parse response |
| `requests.Session()` | Reuse cookies/connection |
| `r.status_code` | Numeric HTTP status |
| `r.elapsed` | Latency (`timedelta`) |
| `allow_redirects=` | Follow 3xx (default True) |
| `stream=True` | Download without loading all RAM |

**Theory:** Each call opens (or reuses) a connection, sends a request line + headers + optional body, then reads the response. Prefer `Session` when talking to one host repeatedly — TCP/TLS handshake cost drops and cookies persist. Always bound waits with `timeout=(connect, read)` or a single float.

## 💡 Examples

**GET + JSON:**

```python
import requests

r = requests.get(
    "https://httpbin.org/get",
    params={"q": "python"},
    timeout=10,
)
r.raise_for_status()
print(r.json()["args"])
```

**POST JSON:**

```python
import requests

r = requests.post(
    "https://httpbin.org/post",
    json={"name": "Ada", "active": True},
    headers={"X-Client": "demo"},
    timeout=10,
)
r.raise_for_status()
print(r.json()["json"])
```

**Session:**

```python
import requests

with requests.Session() as s:
    s.headers.update({"Accept": "application/json"})
    r = s.get("https://httpbin.org/headers", timeout=10)
    print(r.json()["headers"]["Accept"])
```

**Error handling:**

```python
import requests

try:
    r = requests.get("https://httpbin.org/status/404", timeout=5)
    r.raise_for_status()
except requests.HTTPError as e:
    print("http error", e.response.status_code)
except requests.RequestException as e:
    print("network/other", e)
```

**Streaming download:**

```python
import requests

with requests.get("https://httpbin.org/bytes/1024", stream=True, timeout=30) as r:
    r.raise_for_status()
    with open("blob.bin", "wb") as f:
        for chunk in r.iter_content(chunk_size=4096):
            if chunk:
                f.write(chunk)
```

**Multipart upload:**

```python
import requests

with open("photo.jpg", "rb") as f:
    r = requests.post(
        "https://httpbin.org/post",
        files={"file": ("photo.jpg", f, "image/jpeg")},
        data={"caption": "demo"},
        timeout=60,
    )
r.raise_for_status()
```

**Timeouts (connect, read):**

```python
import requests

r = requests.get(
    "https://httpbin.org/delay/1",
    timeout=(3.05, 10),  # connect, read
)
print(r.elapsed.total_seconds())
```

## ⚠️ Pitfalls

- Always set `timeout=` — otherwise calls can hang forever.
- Check status: `raise_for_status()` or inspect `r.status_code`.
- `r.json()` fails on empty/non-JSON bodies — catch `ValueError`.
- Don’t disable TLS verify (`verify=False`) in production.
- Third-party package: pin versions in requirements; not in the stdlib.

## 🔗 Related

- [Json](json.md)
- [Urllib parse](urllib_parse.md)
- [Exceptions](exceptions.md)
- [Requests auth & sessions](requests_auth_sessions.md)
- [Requests errors & retries](requests_errors_retries.md)
- [Pip](pip.md)
- [Venv](venv.md)
