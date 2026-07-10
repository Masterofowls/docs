# Performance

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Measure and improve runtime with the Performance APIs: high-res timestamps, marks/measures, resource timing, and observers. Optimize what you measure — long tasks, layout thrash, oversized payloads, and unnecessary main-thread work.

## 🔧 Core concepts

- **`performance.now()`**: monotonic ms since `timeOrigin` (not wall clock).
- **Marks/measures**: `mark`, `measure`, `getEntriesByName`, `clearMarks`.
- **`PerformanceObserver`**: stream entries (`resource`, `paint`, `largest-contentful-paint`, `layout-shift`, `longtask`, `event`, …).
- **Navigation / Resource Timing**: network waterfall data.
- **User Timing**: custom marks for app logic.
- **DevTools**: Performance panel + Lighthouse complement APIs.

```js
performance.mark("start");
work();
performance.mark("end");
performance.measure("work", "start", "end");
```

## 💡 Examples

```js
// Simple timing
const t0 = performance.now();
await doWork();
console.log(performance.now() - t0, "ms");

// Observer for long tasks
const po = new PerformanceObserver((list) => {
  for (const e of list.getEntries()) {
    console.log("longtask", e.duration, e);
  }
});
po.observe({ type: "longtask", buffered: true });

// LCP
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const last = entries[entries.length - 1];
  console.log("LCP", last.startTime, last.element);
}).observe({ type: "largest-contentful-paint", buffered: true });

// Resource sizes
performance.getEntriesByType("resource").forEach((r) => {
  console.log(r.name, r.transferSize, r.duration);
});

// Avoid layout thrashing
// BAD: read/write interleave forcing reflow
// GOOD: batch reads then writes
const heights = els.map((el) => el.offsetHeight);
els.forEach((el, i) => {
  el.style.height = heights[i] * 2 + "px";
});

// Idle work
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0 && tasks.length) tasks.pop()();
});
```

```js
// Measure fetch
performance.mark("fetch-start");
const res = await fetch("/api");
performance.mark("fetch-end");
performance.measure("fetch", "fetch-start", "fetch-end");
```

## ⚠️ Pitfalls

- `Date.now()` can jump with clock changes — use `performance.now()` for durations.
- Observing everything allocates — filter entry types and disconnect when done.
- Micro-benchmarks lie (JIT warmup, DCE) — measure realistic paths.
- Optimizing without profiles wastes time — record a trace first.
- Some entries require HTTPS / specific headers (e.g. server timing, cross-origin detail).

## 🔗 Related

- [timers.md](./timers.md) — rAF / scheduling
- [event_loop.md](./event_loop.md) — long tasks
- [web_workers.md](./web_workers.md) — offload CPU
- [fetch.md](./fetch.md) — network cost
- [DOM/events.md](./DOM/events.md) — event timing
