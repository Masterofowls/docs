# Data Attributes

_HTML · Reference cheat sheet_

---

## 📋 Overview

`data-*` attributes store custom private data on HTML elements. Access them via `getAttribute`/`setAttribute` or the `element.dataset` map (camelCase). Prefer data attributes for hooks and progressive enhancement state — not for CSS-critical styling when a class or ARIA state fits better.

## 🔧 Core concepts

- **HTML**: `data-user-id="42"` → `el.dataset.userId`.
- **Naming**: only lowercase letters, digits, hyphens in the attribute; multi-word becomes camelCase in `dataset`.
- **Values**: always strings — parse numbers/JSON yourself.
- **Presence**: `data-open` without value → `dataset.open === ""` (truthy string).
- **CSS**: attribute selectors `[data-state="on"]` or `.x[data-active]`.
- **Not for**: accessible names/roles — use ARIA/semantics.

```html
<button type="button" data-action="add" data-product-id="123">Add</button>
<script>
  btn.addEventListener("click", () => {
    cart.add(Number(btn.dataset.productId));
  });
</script>
```

## 💡 Examples

```html
<div
  id="chart"
  data-endpoint="/api/stats"
  data-refresh-ms="30000"
  data-theme="dark"
></div>

<script>
  const el = document.getElementById("chart");
  const url = el.dataset.endpoint;
  const ms = Number(el.dataset.refreshMs);
  el.dataset.theme = "light"; // sets data-theme="light"
  delete el.dataset.theme; // removes attribute
</script>

<!-- CSS hooks -->
<style>
  .tab[data-active] {
    font-weight: 700;
  }
  .toast[data-variant="danger"] {
    border-color: crimson;
  }
</style>

<!-- JSON in data (keep small) -->
<div data-config='{"lang":"en","n":3}'></div>
<script>
  const cfg = JSON.parse(el.dataset.config);
</script>
```

```html
<!-- Validation: data-userId is invalid — use data-user-id -->
```

## ⚠️ Pitfalls

- `dataset` values are strings — `"false"` is truthy; compare explicitly or use presence toggles carefully.
- Large JSON in attributes bloats HTML and XSS surface — prefer `<script type="application/json">` or fetch.
- Don’t put secrets in `data-*` — visible in DOM.
- Mixing `data-id` with real `id` confuses mental models — name clearly.
- CSS-only state often better as classes; a11y state better as ARIA.

## 🔗 Related

- [aria.md](./aria.md) — accessibility state
- [../Javascript/DOM/attributes.md](../Javascript/DOM/attributes.md) — attribute APIs
- [button.md](./button.md) — action hooks
- [semantic.md](./semantic.md) — prefer semantics first
- [../CSS/selectors.md](../CSS/selectors.md) — attribute selectors
