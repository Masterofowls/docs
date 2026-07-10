# Web APIs

_JavaScript · Reference cheat sheet_

## 📋 Overview

Browser and runtime **Web APIs** sit beside the language core: timers, encoding, crypto, streams, and platform globals. This sheet covers common non-DOM APIs you use from scripts. Prefer standards-based APIs over legacy vendor methods.

## 🔧 Core concepts

- **Globals**: `globalThis`, `window` (browsers), `self` (workers).
- **Timers**: `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, `queueMicrotask`.
- **Encoding**: `TextEncoder` / `TextDecoder`, `btoa` / `atob` (binary strings).
- **Crypto**: `crypto.getRandomValues`, `crypto.randomUUID`, `crypto.subtle`.
- **Streams**: `ReadableStream`, `WritableStream`, `TransformStream`.
- **Abort**: `AbortController` / `AbortSignal` cancel async work.
- **Structured clone**: `structuredClone(value)` deep-copies most data.

```js
const id = crypto.randomUUID();
const bytes = crypto.getRandomValues(new Uint8Array(16));
const copy = structuredClone({ nested: [1, 2, 3] });
```

## 💡 Examples

```js
// Debounced timer
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// Abortable delay
function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
    }, { once: true });
  });
}

const ac = new AbortController();
await delay(1000, ac.signal).catch((e) => console.warn(e.name));

// Text encode / decode
const enc = new TextEncoder();
const dec = new TextDecoder();
const buf = enc.encode("café");
console.log(dec.decode(buf)); // café

// Base64 of binary (safe path)
function toBase64(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

// Subtle crypto digest
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Microtask vs macrotask
queueMicrotask(() => console.log("micro"));
setTimeout(() => console.log("macro"), 0);
Promise.resolve().then(() => console.log("promise"));
// Order: micro, promise, macro
```

```js
// Simple transform stream (uppercase)
const upper = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

const reader = new ReadableStream({
  start(c) {
    c.enqueue("hello");
    c.close();
  },
}).pipeThrough(upper).getReader();

const { value } = await reader.read();
console.log(value); // HELLO
```

## ⚠️ Pitfalls

- `btoa` / `atob` expect Latin-1 binary strings — not UTF-8 text directly.
- Timer IDs are numbers in browsers, objects in Node — always store and clear the return value.
- `crypto.subtle` needs a secure context (`https:` or `localhost`).
- `structuredClone` cannot clone functions, DOM nodes, or some host objects.
- Unhandled timer callbacks still run after navigation in some cases — clear on teardown.

## 🔗 Related

- [fetch.md](./fetch.md) — HTTP via Fetch API
- [promise.md](./promise.md) — async primitives
- [async.md](./async.md) — async/await patterns
- [encode.md](./encode.md) — URI and percent-encoding
- [url.md](./url.md) — URL / URLSearchParams
- [error.md](./error.md) — AbortError and exceptions
- [DOM/window.md](./DOM/window.md) — window globals
- [DOM/events.md](./DOM/events.md) — event targets
