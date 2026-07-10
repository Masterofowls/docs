# Retry with Backoff

_Python · Example / how-to_

---

## 📋 Overview

Transient failures (network blips, 429/503) often succeed on retry. Use exponential backoff with jitter. Prefer a small helper or `tenacity` over ad-hoc loops copied everywhere.

## 🔧 Core concepts

| Idea | Detail |
| --- | --- |
| Retryable | Timeouts, connection errors, 429/5xx |
| Non-retryable | 400/401/403/404 (usually) |
| Exponential backoff | `delay * 2 ** attempt` |
| Jitter | Randomize delay to avoid thundering herds |
| Cap | Max attempts + max delay |
| Idempotency | Safe to retry GET; careful with POST |

## 💡 Examples

**Manual helper:**

```python
from __future__ import annotations

import random
import time
from collections.abc import Callable
from typing import TypeVar

import requests

T = TypeVar("T")

def with_backoff(
    fn: Callable[[], T],
    *,
    attempts: int = 5,
    base: float = 0.5,
    max_delay: float = 8.0,
) -> T:
    last: Exception | None = None
    for i in range(attempts):
        try:
            return fn()
        except (requests.Timeout, requests.ConnectionError) as e:
            last = e
        except requests.HTTPError as e:
            status = e.response.status_code if e.response is not None else 0
            if status not in {429, 500, 502, 503, 504}:
                raise
            last = e
        delay = min(max_delay, base * (2**i))
        delay *= 0.5 + random.random()  # jitter
        time.sleep(delay)
    assert last is not None
    raise last

def fetch(url: str) -> dict:
    def _call() -> dict:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return r.json()

    return with_backoff(_call)
```

**tenacity sketch:**

```python
from tenacity import retry, stop_after_attempt, wait_exponential_jitter
import requests

@retry(stop=stop_after_attempt(5), wait=wait_exponential_jitter(initial=0.5, max=8))
def get_json(url: str) -> dict:
    r = requests.get(url, timeout=10)
    r.raise_for_status()
    return r.json()
```

**Async note:** use `asyncio.sleep` in async helpers — see [../async.md](../async.md).

## ⚠️ Pitfalls

- Retrying non-idempotent POSTs can duplicate side effects.
- No jitter → synchronized retries amplify outages.
- Swallowing all exceptions hides permanent bugs.
- Ignoring `Retry-After` headers on 429.
- Busy-loops without sleep burn CPU and get banned.

## 🔗 Related

- [HTTP requests](http_requests.md)
- [Scrape HTML](scrape_html.md)
- [../exceptions.md](../exceptions.md)
- [../concurrency.md](../concurrency.md)
- [../logging.md](../logging.md)
- [../datetime.md](../datetime.md)
