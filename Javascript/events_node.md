# Events

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Node.js `EventEmitter` (`node:events`) is the pub/sub backbone for streams, servers, and many core APIs. Objects emit named events; listeners run when those events fire. Browser DOM events are different — see DOM Events for UI.

```js
import { EventEmitter } from "node:events";
```

## 🔧 Core concepts

- **`on(event, listener)` / `addListener`**: register a lasting handler.
- **`once(event, listener)`**: run at most once, then remove.
- **`emit(event, ...args)`**: call listeners synchronously in registration order.
- **`off` / `removeListener` / `removeAllListeners`**: unsubscribe.
- **`prependListener`**: run before previously registered handlers.
- **Error event**: if `error` is emitted with no listeners, Node throws.
- **`EventEmitter` subclassing**: common pattern for custom components.

## 💡 Examples

```js
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("data", (chunk) => console.log("got", chunk));
bus.once("ready", () => console.log("ready once"));

bus.emit("ready");
bus.emit("ready"); // no-op for once
bus.emit("data", { n: 1 });

bus.off("data", handler); // need same function reference

class Job extends EventEmitter {
  start() {
    this.emit("start");
    try {
      // work…
      this.emit("done", { ok: true });
    } catch (err) {
      this.emit("error", err);
    }
  }
}

const job = new Job();
job.on("error", (err) => console.error(err));
job.start();
```

```js
import { once } from "node:events";
// Promise that resolves on next event
const [value] = await once(bus, "data");
```

## ⚠️ Pitfalls

- Listeners are sync: a slow handler blocks subsequent listeners and the emitter.
- Missing `error` listener can crash the process when `emit("error", err)` runs.
- Memory leaks: forgetting to `off` long-lived emitters (set `setMaxListeners` only after understanding why).
- Arrow vs bound methods: remove requires the same function reference you added.
- Do not confuse with DOM `EventTarget` — APIs differ (`addEventListener` vs `on`).

## 🔗 Related

- [DOM Events](DOM/events.md) — browser event model
- [Stream](stream.md) — streams extend EventEmitter patterns
- [Async](async.md) — `once()` promise helper
- [Promise](promise.md) — bridging events to promises
- [this keyword](this_keyword.md) — listener `this` binding
