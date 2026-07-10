# Asyncio

_Pytest · Reference cheat sheet_

---

## 📋 Overview

`pytest-asyncio` runs `async def` tests and fixtures. Modern default is `asyncio_mode = auto` so marked or auto-detected coroutines work cleanly.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `pytest.mark.asyncio` | Mark async test (strict mode) |
| `asyncio_mode` | `strict` \| `auto` |
| Async fixtures | `async def` + await setup |
| `event_loop` | Legacy loop fixture (avoid new code) |
| `AsyncMock` | Mock awaitables |

Prefer one event loop policy per process; be careful with xdist.

## 💡 Examples

**Install & config:**

```bash
python -m pip install pytest-asyncio
```

```toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
asyncio_default_fixture_loop_scope = "function"
```

**Async test:**

```python
import pytest
import httpx

@pytest.mark.asyncio
async def test_ping():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://example.com")
    assert r.status_code == 200
```

With `asyncio_mode = auto`, the mark is optional for async tests.

**Async fixture:**

```python
@pytest.fixture
async def db_pool():
    pool = await create_pool()
    yield pool
    await pool.close()

async def test_row(db_pool):
    assert await db_pool.fetchval("SELECT 1") == 1
```

**Mock async:**

```python
from unittest.mock import AsyncMock

async def test_service():
    fetch = AsyncMock(return_value={"id": 1})
    assert await fetch() == {"id": 1}
```

## ⚠️ Pitfalls

- Mixing sync fixtures that block the loop heavily.
- Forgetting `await` on coroutine mocks → always-true assertions.
- Session-scoped async fixtures with function-scoped loops.
- Sharing aiohttp/httpx clients across tests without reset.
- Nested event loops (`asyncio.run` inside async tests).

## 🔗 Related

- [Install](install.md)
- [Fixtures](fixtures.md)
- [Mocking](mocking.md)
- [Plugins](plugins.md)
- [Configuration](configuration.md)
- [xdist](xdist.md)
