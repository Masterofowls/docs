# Style

_HTML · Reference cheat sheet_

---

## 📋 Overview

Styling HTML happens through the **CSS cascade**: external stylesheets (`<link rel="stylesheet">`), document-level `<style>` elements, and inline `style` attributes. Prefer external or scoped document CSS for maintainability; use inline styles sparingly for dynamic values. The HTML `style` attribute applies declarations to one element with high specificity.

Separating structure (HTML) from presentation (CSS) improves accessibility, caching, and theming. Never use styling alone to convey meaning that belongs in semantics or text.

## 🔧 Core concepts

### Three authoring layers

```html
<head>
  <link rel="stylesheet" href="/styles.css">
  <style>
    :root { color-scheme: light dark; }
    .callout { border-inline-start: 4px solid #0f766e; }
  </style>
</head>
<body>
  <p style="margin-block: 0">Inline exception</p>
</body>
```

| Layer | Pros | Cons |
|-------|------|------|
| External CSS | Cacheable, shareable | Extra request (mitigate with HTTP/2, bundling) |
| `<style>` | Critical CSS, no round trip | Not shared across pages unless duplicated |
| `style=""` | Quick overrides, JS-set values | Hard to maintain; high specificity |

### The `style` attribute

- Contains CSS declarations, not selectors.
- Specificity equals one inline declaration (beats classes unless `!important` wars).
- Cannot express pseudo-elements (`::before`) or media queries—use a stylesheet.
- Reflects in `element.style`; CSSOM `cssText` updates it.

### `<style>` element attributes

- `media` — conditional application (`media="(min-width: 48rem)"`).
- `blocking="render"` — opt into render-blocking (default for classic stylesheets in head).
- `nonce` / CSP hashes — allow inline under strict CSP.
- `title` — alternate stylesheets (with `<link rel="stylesheet" title>`).

### Cascade and importance (simplified)

1. Origin & importance (user agent < user < author; `!important` reverses layers carefully)
2. Specificity (`inline` > IDs > classes/attributes > elements)
3. Order (later wins when equal)

### Accessibility of presentation

- Do not rely on color alone.
- Preserve focus visibility.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- Maintain contrast (WCAG).
- Keep hit targets large enough.

## 💡 Examples

### Critical CSS in head

```html
<head>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; }
    .hero { min-height: 60vh; }
  </style>
  <link rel="stylesheet" href="/full.css">
</head>
```

### Media-specific style block

```html
<style media="print">
  nav, .no-print { display: none; }
  a[href]::after { content: " (" attr(href) ")"; }
</style>
```

### Theming with custom properties

```html
<style>
  :root {
    --bg: #f8fafc;
    --fg: #0f172a;
    --accent: #0f766e;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0f172a;
      --fg: #f8fafc;
    }
  }
  body {
    background: var(--bg);
    color: var(--fg);
  }
</style>
```

### Dynamic inline style from script

```html
<div id="bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
  <span class="fill"></span>
</div>
<script type="module">
  const fill = document.querySelector("#bar .fill");
  fill.style.width = "40%";
  fill.style.background = "var(--accent)";
</script>
```

## ⚠️ Pitfalls

- **Inline everything** — Unmaintainable; breaks theming and CSP ease.
- **`!important` sprawl** — Sign of specificity fights; refactor selectors.
- **Removing focus outlines** — Provide `:focus-visible` alternatives.
- **Using CSS for content** — Important text in `content:` may be missed by AT/translators.
- **FOUC** — Late stylesheets flash unstyled content; order and preload carefully.
- **Mixing presentational HTML** — `<font>`, `align`, `bgcolor` are obsolete; use CSS.
- **Huge style tags** — Defeat caching; extract to files for multi-page sites.

## 🔗 Related

- [Head](head.md) — linking stylesheets
- [Div](div.md) — layout hooks for CSS
- [Script](script.md) — load order with JS
- [Meta](meta.md) — `color-scheme`, theme-color
- [Media](media.md) — styling images/video (`object-fit`)
- [Canvas](canvas.md) — CSS size vs bitmap size
- [Section](section.md) — styling landmarks
