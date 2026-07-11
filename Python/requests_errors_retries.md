# Requests Errors & Retries

_Python · Reference cheat sheet_

---

## 📋 Overview

Distinguish network failures, timeouts, and HTTP error statuses. Retry idempotent GETs with backoff; don't blindly retry POST without idempotency keys.

## 🔧 Core concepts

| Exception | Meaning |
| --- | --- |
| `Timeout` | Connect/read deadline |
| `ConnectionError` | DNS / refused / reset |
| `HTTPError` | From `raise_for_status` |
| `RequestException` | Base catch-all |
| Status 429/503 | Often retryable |

## 💡 Examples

**Classify errors:**

```python
import requests

try:
    r = requests.get("https://httpbin.org/status/500", timeout=5)
    r.raise_for_status()
except requests.Timeout:
    print("timeout")
except requests.HTTPError as e:
    print("http", e.response.status_code)
except requests.RequestException as e:
    print("other", e)
```

**Simple retry for GET:**

```python
import time
import requests

def get_with_retry(url, attempts=3):
    last = None
    for i in range(attempts):
        try:
            r = requests.get(url, timeout=5)
            if r.status_code in (429, 503):
                time.sleep(2 ** i)
                continue
            r.raise_for_status()
            return r
        except requests.RequestException as e:
            last = e
            time.sleep(2 ** i)
    raise last
```

## ⚠️ Pitfalls

- Retrying non-idempotent POST can duplicate charges/orders.
- Infinite retries without jitter can stampede a failing service.
- Log `response.text[:200]` on failure for debugging — not full secrets.

## 🔗 Related

- [Requests](requests_http.md)
- [Requests auth & sessions](requests_auth_sessions.md)
- [Exceptions](exceptions.md)
