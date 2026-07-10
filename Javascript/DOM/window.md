# Window

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

`window` is the global object in browsers (`globalThis === window`). It exposes the viewport, timers, framing, storage entry points, and dialogs. Prefer feature-specific APIs (`document`, `location`, `fetch`) over legacy window methods when both exist.

## 🔧 Core concepts

- **Global**: undeclared `var` / browser globals hang off `window`; modules don’t create globals.
- **Viewport**: `innerWidth`, `innerHeight`, `outerWidth`, `scrollX`, `scrollY`, `devicePixelRatio`.
- **Frames**: `parent`, `top`, `frames`, `frameElement`.
- **Timers**: `setTimeout`, `setInterval`, `requestAnimationFrame`, `requestIdleCallback`.
- **Dialogs**: `alert`, `confirm`, `prompt` (blocking — avoid in modern UX).
- **Open**: `window.open`, `close`, `focus` (popup rules apply).

```js
requestAnimationFrame(draw);
window.addEventListener("resize", onResize);
```

## 💡 Examples

```js
// Scroll helpers
window.scrollTo({ top: 0, behavior: "smooth" });
const y = window.scrollY;

// rAF loop
let raf;
function loop(t) {
  update(t);
  raf = requestAnimationFrame(loop);
}
raf = requestAnimationFrame(loop);
cancelAnimationFrame(raf);

// Match media
const dark = window.matchMedia("(prefers-color-scheme: dark)");
dark.addEventListener("change", (e) => {
  document.documentElement.dataset.theme = e.matches ? "dark" : "light";
});

// postMessage (cross-window)
otherWindow.postMessage({ type: "ping" }, "https://trusted.example");
window.addEventListener("message", (e) => {
  if (e.origin !== "https://trusted.example") return;
  console.log(e.data);
});

// Safe external open
const w = window.open("https://example.com", "_blank", "noopener,noreferrer");
```

```js
// globalThis for portable code
const g = globalThis;
g.addEventListener?.("offline", () => showBanner());

// Idle work when browser is quiet
requestIdleCallback?.((deadline) => {
  while (deadline.timeRemaining() > 0 && jobs.length) {
    jobs.shift()();
  }
});
```

## ⚠️ Pitfalls

- Popup blockers require `window.open` in direct user-gesture handlers.
- Always verify `event.origin` on `message` events.
- `innerWidth` includes scrollbars differently across engines — test layout.
- Blocking dialogs freeze the main thread and are suppressed in many contexts.
- In workers there is no `window` — use `self` / `globalThis`.

## 🔗 Related

- [document_methods.md](./document_methods.md) — document
- [navigation.md](./navigation.md) — location / history
- [screen.md](./screen.md) — screen metrics
- [position.md](./position.md) — scroll & geometry
- [events.md](./events.md) — window events
- [storage.md](./storage.md) — localStorage
- [../api.md](../api.md) — timers & fetch globals
- [../fetch.md](../fetch.md) — networking
