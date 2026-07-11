# Async

_Python · Reference cheat sheet_

---

## 📋 Overview

`async` / `await` run concurrent I/O with an event loop (`asyncio`). Prefer async for many waiting network/file ops; use threads/processes for CPU-bound work.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `async def` | Coroutine function |
| `await` | Suspend until awaitable completes |
| `asyncio.run(main())` | Entry point |
| `asyncio.gather` | Run many coroutines |
| `asyncio.create_task` | Schedule concurrently |
| `asyncio.sleep` | Non-blocking delay |

## 💡 Examples

```python
import asyncio

async def fetch(n: int) -> int:
    await asyncio.sleep(0.05)
    return n * 2

async def main() -> None:
    results = await asyncio.gather(fetch(1), fetch(2), fetch(3))
    print(results)

asyncio.run(main())
```

```python
import asyncio

async def worker(name: str) -> None:
    print(name, "start")
    await asyncio.sleep(0.1)
    print(name, "done")

async def main() -> None:
    t1 = asyncio.create_task(worker("a"))
    t2 = asyncio.create_task(worker("b"))
    await t1
    await t2

asyncio.run(main())
```

## ⚠️ Pitfalls

- Never call blocking I/O inside coroutines without an executor.
- Forgetting `await` returns a coroutine object (often a warning).
- `asyncio.run` cannot nest inside a running loop.
- Mixing sync Django views with async requires care (ASGI).

## 🔗 Related

- [concurrency](concurrency.md)
- [generators](generators.md)
- [context_managers](context_managers.md)
- [Examples/server](Examples/server.md)
