# Concurrency

_Python · Reference cheat sheet_

---

## 📋 Overview

Python offers threads, processes, and asyncio for concurrent work. Choose based on the bottleneck: **I/O-bound** → threads or asyncio; **CPU-bound** → multiprocessing (GIL limits CPU threads). See [async.md](async.md) for `async`/`await` detail.

## 🔧 Core concepts

| Model | Best for | Module |
| --- | --- | --- |
| Threading | I/O, shared memory | `threading`, `concurrent.futures` |
| Multiprocessing | CPU parallelism | `multiprocessing`, `ProcessPoolExecutor` |
| Asyncio | Many sockets / timers | `asyncio` |
| GIL | One bytecode thread at a time (CPython) | — |

`concurrent.futures` unifies thread/process pools behind `Executor.map` / `submit`.

## 💡 Examples

**ThreadPoolExecutor (I/O):**

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.request import urlopen

urls = ["https://example.com", "https://httpbin.org/get"]

def fetch(url: str) -> int:
    with urlopen(url, timeout=10) as resp:
        return resp.status

with ThreadPoolExecutor(max_workers=8) as pool:
    futures = {pool.submit(fetch, u): u for u in urls}
    for fut in as_completed(futures):
        print(futures[fut], fut.result())
```

**ProcessPoolExecutor (CPU):**

```python
from concurrent.futures import ProcessPoolExecutor

def crunch(n: int) -> int:
    return sum(i * i for i in range(n))

if __name__ == "__main__":
    with ProcessPoolExecutor() as pool:
        print(list(pool.map(crunch, [10**6, 10**6])))
```

**asyncio overview:**

```python
import asyncio

async def sleeper(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return name

async def main() -> None:
    results = await asyncio.gather(sleeper("a", 0.1), sleeper("b", 0.2))
    print(results)

asyncio.run(main())
```

## ⚠️ Pitfalls

- CPU-bound work in threads won't scale on CPython due to the GIL.
- Share state only with locks/queues — races are subtle.
- On Windows, process entry must be under `if __name__ == "__main__"`.
- Mixing blocking I/O inside asyncio stalls the event loop — use `to_thread`.
- Deadlocks: never lock in inconsistent orders across threads.

## 🔗 Related

- [Async / await](async.md)
- [Context managers](context_managers.md)
- [Logging](logging.md)
- [Examples: server](Examples/server.md)
- [Examples: retry backoff](Examples/retry_backoff.md)
- [Testing with pytest](testing_pytest.md)
