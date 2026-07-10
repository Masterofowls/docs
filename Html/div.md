# Div

_HTML · Reference cheat sheet_

---

## 📋 Overview

The `<div>` element is a generic **flow content** container with no semantic meaning. It groups elements for styling, scripting, or layout when no more specific HTML element fits. Overusing `<div>` (div soup) harms accessibility and maintainability—prefer landmarks and sectioning elements first.

Use `<div>` when you need a box without implying article, navigation, complementary, or other roles. Pair with classes, IDs, and ARIA only when semantics cannot be expressed natively.

## 🔧 Core concepts

### Default behavior

- Display: `block` (full width of containing block).
- No default margins (unlike headings/paragraphs).
- Valid almost anywhere flow content is allowed; may contain flow content.
- Does **not** create a landmark or outline entry by itself.

### Prefer semantic alternatives

| Instead of… | Prefer… |
|-------------|---------|
| Page header block | `<header>` |
| Main content wrapper | `<main>` |
| Sidebar | `<aside>` |
| Site/footer chrome | `<footer>` |
| Primary nav | `<nav>` |
| Standalone story | `<article>` |
| Thematic group with heading | `<section>` |
| Inline grouping | `<span>` |

### Legitimate uses

- CSS Grid / Flexbox layout shells
- Script hooks (`id`, `data-*`) without implying meaning
- Presentational wrappers required by a design system
- Grouping for `display: contents` or sticky positioning contexts

### ARIA on divs

If a `<div>` must act as a widget, add the correct `role`, keyboard support, and labels (`aria-label` / `aria-labelledby`). Prefer native elements (`button`, `a`, `input`) over `role="button"` on a div.

```html
<!-- Avoid when a button works -->
<div role="button" tabindex="0">Save</div>

<!-- Prefer -->
<button type="button">Save</button>
```

## 💡 Examples

### Layout shell (after semantics)

```html
<body>
  <header>…</header>
  <div class="layout">
    <main id="content">…</main>
    <aside>…</aside>
  </div>
  <footer>…</footer>
</body>
```

### Flex / grid wrapper

```html
<div class="card-grid">
  <article class="card">…</article>
  <article class="card">…</article>
  <article class="card">…</article>
</div>
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
}
```

### Script target without fake semantics

```html
<div id="toast-root" aria-live="polite" aria-atomic="true"></div>
```

### Dialog pattern (prefer `<dialog>` when possible)

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dlg-title"
  hidden>
  <h2 id="dlg-title">Confirm delete</h2>
  <p>This cannot be undone.</p>
  <button type="button">Cancel</button>
  <button type="button">Delete</button>
</div>
```

Native `<dialog>` with `.showModal()` is usually better for focus trapping and `Escape`.

## ⚠️ Pitfalls

- **Div soup** — Nested anonymous divs make outlines and CSS brittle; name regions with real tags.
- **Clickable divs** — Missing `tabindex`, Enter/Space handlers, and roles break keyboard and AT users.
- **`div` for text** — Use `<p>`, lists, or headings for prose; divs do not convey paragraph structure.
- **Landmark overload** — Do not put `role="main"` on every wrapper; one `<main>` per page.
- **`display: contents`** — Can remove the box from a11y trees in some browsers; test carefully.
- **Styling only** — If the only reason is “I need a class,” check whether a semantic parent already exists.

## 🔗 Related

- [Section](section.md) — thematic grouping with headings
- [Nav](nav.md) — navigation landmark
- [Footer](footer.md) — footer / contentinfo
- [Form](form.md) — form layout containers
- [Style](style.md) — styling hooks
- [Canvas](canvas.md) — wrapping drawing surfaces
- [Language](language.md) — `lang` on containers
