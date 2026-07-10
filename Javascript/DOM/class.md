# classList & CSS Classes

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

`element.classList` is a live `DOMTokenList` for CSS class tokens. Prefer it over string-splicing `className`. It supports add/remove/toggle/replace and iteration.

## 🔧 Core concepts

- **API**: `add`, `remove`, `toggle`, `contains`, `replace`, `item`, `length`.
- **`className`**: full string getter/setter (space-separated).
- **`classList.value`**: string form of the token list.
- **Toggle force**: `toggle(token, force)` — `true` adds, `false` removes.
- **SVG**: same `classList` on SVG elements in modern browsers.

```js
el.classList.add("is-open", "animate");
el.classList.toggle("is-open");
```

## 💡 Examples

```js
const el = document.querySelector(".panel");

el.classList.add("visible");
el.classList.remove("hidden");
el.classList.contains("visible"); // true

// Force on/off
el.classList.toggle("active", isActive);

// Replace token
el.classList.replace("theme-light", "theme-dark");

// Iterate
for (const token of el.classList) {
  console.log(token);
}

// One-shot from state object
function applyState(el, state) {
  el.classList.toggle("is-loading", state.loading);
  el.classList.toggle("is-error", state.error);
  el.classList.toggle("is-ready", state.ready);
}

// Avoid duplicates / empties — classList handles spaces & dupes
el.className = "  a   a  b "; // messy
el.classList.add("a", "b"); // clean tokens
```

```js
// Animation reflow trick
el.classList.remove("pulse");
void el.offsetWidth; // force reflow
el.classList.add("pulse");
```

```js
// Conditional multi-class from a list
function setClasses(el, tokens) {
  el.className = ""; // reset
  el.classList.add(...tokens.filter(Boolean));
}

setClasses(el, ["card", isFeatured && "card--featured", size]);
```

## ⚠️ Pitfalls

- Tokens cannot contain spaces — each class is one token.
- `className` on SVG historically returned `SVGAnimatedString` — prefer `classList`.
- Toggling in tight loops can thrash layout if combined with measuring.
- Don’t store state only in classes if you need typed data — use `data-*` or JS state.
- Removing a missing class is a no-op; adding an existing class is a no-op.

## 🔗 Related

- [attributes.md](./attributes.md) — class attribute
- [selectors.md](./selectors.md) — `.class` selectors
- [events.md](./events.md) — UI state toggles
- [content_methods.md](./content_methods.md) — updating UI
- [position.md](./position.md) — layout reads after class changes
- [../strings.md](../strings.md) — token strings
