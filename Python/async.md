# Async / await

_Python · Reference cheat sheet_

---

## 📋 Overview

`async`/`await` runs concurrent I/O-bound work with a single-threaded event loop (`asyncio`). Coroutines pause at `await` so other tasks can run. Prefer async for network, DB drivers, and file I/O with async APIs—not for CPU-heavy work (use processes/threads).

## 🔧 Core concepts

| Concept | Meaning |
| --- | --- |
| `async def` | Defines a coroutine function; calling it returns a coroutine object |
| `await` | Suspends until the awaitable completes; only inside `async def` |
| Event loop | Schedules and runs tasks (`asyncio.run`, `loop.create_task`) |
| Task | Scheduled coroutine (`asyncio.create_task`) |
| Gather / TaskGroup | Run many coroutines concurrently |
| Sync vs async | Mixing blocking calls inside async code stalls the loop |

```python
import asyncio

async def fetch(url: str) -> str:
    await asyncio.sleep(0.1)  # stand-in for I/O
    return url

async def main() -> None:
    results = await asyncio.gather(fetch("a"), fetch("b"))
    print(results)

asyncio.run(main())
```

## 💡 Examples

**Concurrent tasks with `TaskGroup` (3.11+):**

```python
import asyncio

async def work(n: int) -> int:
    await asyncio.sleep(0.05)
    return n * 2

async def main() -> None:
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(work(1))
        t2 = tg.create_task(work(2))
    print(t1.result(), t2.result())

asyncio.run(main())
```

**Timeouts and cancellation:**

```python
import asyncio

async def slow() -> None:
    await asyncio.sleep(10)

async def main() -> None:
    try:
        async with asyncio.timeout(0.2):
            await slow()
    except TimeoutError:
        print("timed out")

asyncio.run(main())
```

**Run blocking code off the loop:**

```python
import asyncio

def blocking_read(path: str) -> str:
    with open(path, encoding="utf-8") as f:
        return f.read()

async def main(path: str) -> str:
    return await asyncio.to_thread(blocking_read, path)
```

## ⚠️ Pitfalls

- Calling `async def` without `await`/`create_task` does nothing useful (coroutine never runs).
- `time.sleep` / sync HTTP / sync ORM inside async blocks the event loop.
- `asyncio.run()` cannot be nested inside an already-running loop.
- Shared mutable state across tasks still needs locks or careful design.
- Exceptions in fire-and-forget tasks can be silent unless retrieved or logged.

## 🔗 Related

- [Types](types.md)
- [Import / export](import_export.md)
- [Loops](loops.md)
- [Docstrings](docstrings.md)
- [Examples: server](Examples/server.md)
- [Examples: Telegram bot](Examples/tg_bot.md)
