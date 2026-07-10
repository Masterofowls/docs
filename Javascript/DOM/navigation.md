# Navigation (Location & History)

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

`location` describes the current URL; `history` manages the session history stack. For SPAs, combine `pushState` / `replaceState` with `popstate` and the Navigation API where available.

## 🔧 Core concepts

- **`location`**: `href`, `origin`, `pathname`, `search`, `hash`, `assign`, `replace`, `reload`.
- **`history`**: `length`, `state`, `pushState`, `replaceState`, `back`, `forward`, `go`.
- **Events**: `popstate`, `hashchange`.
- **Navigation API** (modern): `navigation.navigate()`, `navigate` event (progressive enhancement).
- **URL API**: parse `location.href` with `new URL(...)`.

```js
history.pushState({ page: 2 }, "", "/page/2");
```

## 💡 Examples

```js
// Read
const url = new URL(location.href);
const page = url.searchParams.get("page");

// Navigate
location.assign("/home"); // pushes history
location.replace("/login"); // no extra history entry
location.reload();

// SPA route change
function navigate(path, state = {}) {
  history.pushState(state, "", path);
  render(path, state);
}

window.addEventListener("popstate", (e) => {
  render(location.pathname, e.state);
});

// Hash routing
window.addEventListener("hashchange", () => {
  renderHash(location.hash.slice(1));
});

// Query update without full reload
function setQuery(key, value) {
  const u = new URL(location.href);
  u.searchParams.set(key, value);
  history.replaceState(history.state, "", u);
}
```

```js
// Guard unload
window.addEventListener("beforeunload", (e) => {
  if (isDirty) {
    e.preventDefault();
    e.returnValue = "";
  }
});
```

## ⚠️ Pitfalls

- `pushState` does not trigger `popstate` — you must render yourself.
- Cross-origin `location` access throws — only same-origin details are readable.
- Large `history.state` objects are cloned — keep them small/serializable.
- `location.search` includes `?`; prefer `URLSearchParams`.
- `beforeunload` prompts are restricted/browser-dependent.

## 🔗 Related

- [window.md](./window.md) — window object
- [../url.md](../url.md) — URL / search params
- [../encode.md](../encode.md) — encoding paths
- [events.md](./events.md) — popstate / hashchange
- [document_methods.md](./document_methods.md) — document.URL
- [storage.md](./storage.md) — persisting UI state
