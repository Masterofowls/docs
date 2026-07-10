# Events

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

DOM events notify your code about user and system actions. Register with `addEventListener`, control propagation with `stopPropagation` / `preventDefault`, and prefer delegation for dynamic lists.

## 🔧 Core concepts

- **Listen**: `addEventListener(type, handler, options?)`, `removeEventListener` (same ref/options).
- **Options**: `{ capture, once, passive, signal }`.
- **Phases**: capture → target → bubble.
- **Event object**: `type`, `target`, `currentTarget`, `eventPhase`, `timeStamp`.
- **Cancel**: `preventDefault()` when `cancelable`; check `defaultPrevented`.
- **Custom**: `new CustomEvent(name, { detail, bubbles, cancelable })` + `dispatchEvent`.

```js
btn.addEventListener("click", onClick, { once: true });
```

## 💡 Examples

```js
function onClick(e) {
  console.log(e.target, e.currentTarget);
  e.preventDefault();
}

link.addEventListener("click", onClick);
link.removeEventListener("click", onClick);

// AbortSignal unsubscribe
const ac = new AbortController();
window.addEventListener("resize", onResize, { signal: ac.signal });
ac.abort(); // removes listener

// Delegation
list.addEventListener("click", (e) => {
  const item = e.target.closest("li[data-id]");
  if (!item || !list.contains(item)) return;
  select(item.dataset.id);
});

// Keyboard
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submit();
  }
});

// Passive scroll (perf)
window.addEventListener("touchmove", onMove, { passive: true });

// Custom events
panel.addEventListener("cart:add", (e) => console.log(e.detail));
panel.dispatchEvent(
  new CustomEvent("cart:add", { detail: { id: 1 }, bubbles: true }),
);
```

```js
// Pointer events unify mouse/touch/pen
el.addEventListener("pointerdown", (e) => {
  el.setPointerCapture(e.pointerId);
});
```

## ⚠️ Pitfalls

- Anonymous handlers cannot be removed — keep a reference.
- Capture flag must match between add and remove.
- `passive: true` listeners cannot `preventDefault` (useful for scroll perf).
- Inline `onclick=` attributes and property handlers differ from `addEventListener` stacking.
- Forgetting delegation causes missing listeners on dynamically added nodes.

## 🔗 Related

- [form.md](./form.md) — submit / input events
- [datatransfer.md](./datatransfer.md) — drag events
- [selectors.md](./selectors.md) — closest / matches
- [window.md](./window.md) — window-level events
- [mutation_methods.md](./mutation_methods.md) — MutationObserver
- [../api.md](../api.md) — AbortSignal
- [../async.md](../async.md) — async handlers
