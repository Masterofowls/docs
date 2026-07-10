# Document Methods

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

`document` is the entry point to the DOM tree: querying, creating nodes, reading metadata, and listening for lifecycle events. Prefer `document` methods over legacy globals like `document.all`.

## 🔧 Core concepts

- **Query**: `getElementById`, `querySelector`, `querySelectorAll`, `getElementsBy*`.
- **Create**: `createElement`, `createTextNode`, `createDocumentFragment`, `createRange`.
- **Adopt/import**: `importNode`, `adoptNode` across documents.
- **Metadata**: `title`, `URL`, `documentElement`, `head`, `body`, `compatMode`.
- **Ready**: `DOMContentLoaded`, `document.readyState`, `document.fonts`.
- **Visibility**: `document.visibilityState`, `visibilitychange`.

```js
document.addEventListener("DOMContentLoaded", () => {
  init(document.getElementById("app"));
});
```

## 💡 Examples

```js
const app = document.getElementById("app");
const first = document.querySelector(".item");
const all = document.querySelectorAll(".item"); // static NodeList

// Collections (live)
const live = document.getElementsByClassName("item");
const tags = document.getElementsByTagName("div");

// Create & insert
const el = document.createElement("section");
el.id = "panel";
document.body.append(el);

// Ready helpers
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// Visibility pause
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pause();
  else resume();
});

// Current script (classic scripts)
const current = document.currentScript;

// Open graph-ish meta
document.title = "Dashboard";
```

```js
// Wait for fonts
await document.fonts.ready;
drawText();

// CSS escape for dynamic selectors
const id = "a.b#c";
document.querySelector(`#${CSS.escape(id)}`);
```

## ⚠️ Pitfalls

- `getElementsBy*` collections are **live**; `querySelectorAll` is static.
- `document.write` clobbers the page after load — avoid it.
- Scripts of `type="module"` defer by default — `DOMContentLoaded` may already have fired.
- `getElementById` does not need `#`; `querySelector` does.
- Accessing `document.body` before it exists returns `null`.

## 🔗 Related

- [selectors.md](./selectors.md) — selector engines
- [create_add_remove.md](./create_add_remove.md) — node factories
- [events.md](./events.md) — document listeners
- [window.md](./window.md) — window ↔ document
- [navigation.md](./navigation.md) — location / history
- [../async.md](../async.md) — waiting for ready
