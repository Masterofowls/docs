# Timers

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Timers schedule callbacks on the event loop: `setTimeout`, `setInterval`, and animation-oriented `requestAnimationFrame`. Always keep the handle to clear them. Prefer `rAF` for visual work and avoid overlapping intervals for async jobs.

## 🔧 Core concepts

- **`setTimeout(fn, ms, ...args)`**: once after delay; returns timer id.
- **`setInterval(fn, ms, ...args)`**: repeats; drifts under load.
- **`clearTimeout` / `clearInterval`**: cancel by id.
- **`requestAnimationFrame(cb)`**: before next paint; `cb(timestamp)`.
- **`cancelAnimationFrame(id)`**: cancel rAF.
- **Delay clamping**: nested timeouts / background tabs may be throttled (≥4ms, often 1s+ inactive).
- **`scheduler` / `scheduler.postTask`** (where available): prioritized tasks.

```js
const id = setTimeout(() => console.log("later"), 1000);
clearTimeout(id);
```

## 💡 Examples

```js
// Pass arguments
setTimeout(console.log, 0, "hello", 42);

// Recursive timeout (better control than interval)
function poll(ms) {
  let stopped = false;
  async function tick() {
    if (stopped) return;
    await fetchStatus();
    setTimeout(tick, ms);
  }
  tick();
  return () => {
    stopped = true;
  };
}

// Interval with cleanup
const id = setInterval(() => {
  console.log(Date.now());
}, 1000);
// later: clearInterval(id);

// Animation loop
let raf;
function loop(t) {
  draw(t);
  raf = requestAnimationFrame(loop);
}
raf = requestAnimationFrame(loop);
// cancelAnimationFrame(raf);

// Debounce with timeout
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// Promise wrapper
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(200);
```

```js
// Abortable sleep
function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(signal.reason);
    });
  });
}
```

## ⚠️ Pitfalls

- `setInterval` does not wait for async work — callbacks can overlap; use recursive `setTimeout`.
- Timer ids are numbers in browsers, objects in Node — don’t assume type.
- Forgetting to clear timers on unmount leaks and causes “setState on unmounted” bugs.
- `rAF` pauses in background tabs; don’t use it for critical non-visual deadlines.
- String eval form `setTimeout("code", 0)` is obsolete and unsafe.

## 🔗 Related

- [event_loop.md](./event_loop.md) — task queues
- [abort_controller.md](./abort_controller.md) — cancel async waits
- [performance.md](./performance.md) — measuring delays
- [promise.md](./promise.md) — sleep helpers
- [web_workers.md](./web_workers.md) — timers in workers
