# Semantic HTML

_HTML · Reference cheat sheet_

---

## 📋 Overview

Semantic elements describe meaning: headings, landmarks, lists, figures, and text-level semantics. They improve accessibility, SEO, and readability without CSS. Prefer native elements over generic `<div>`/`<span>` when a matching semantic tag exists.

## 🔧 Core concepts

| Element | Meaning |
| --- | --- |
| `header` `footer` `main` `nav` `aside` `section` `article` | landmarks / sections |
| `h1`–`h6` | heading outline |
| `p` `ul` `ol` `dl` | text structure |
| `figure` `figcaption` | media with caption |
| `blockquote` `cite` `q` | quotations |
| `time` `address` `mark` `strong` `em` | inline semantics |
| `search` | search landmark (modern) |

- One primary `<main>` per document.
- `section` needs a heading; `article` is independently distributable content.
- Don’t skip heading levels arbitrarily.

```html
<body>
  <header>...</header>
  <nav aria-label="Primary">...</nav>
  <main>
    <article>
      <h1>Title</h1>
      <p>...</p>
    </article>
  </main>
  <footer>...</footer>
</body>
```

## 💡 Examples

```html
<article>
  <header>
    <h1>Release notes</h1>
    <p><time datetime="2026-07-10">July 10, 2026</time></p>
  </header>
  <section aria-labelledby="feat">
    <h2 id="feat">Features</h2>
    <ul>
      <li>Faster builds</li>
    </ul>
  </section>
  <figure>
    <img src="/chart.svg" alt="Build time chart falling from 12s to 4s" />
    <figcaption>Median build time by week</figcaption>
  </figure>
</article>

<aside aria-labelledby="tips">
  <h2 id="tips">Tips</h2>
  <p>...</p>
</aside>

<!-- Text emphasis -->
<p><strong>Warning:</strong> <em>destructive</em> action.</p>
```

```html
<!-- Prefer -->
<nav>...</nav>
<!-- Over -->
<div class="nav">...</div>
```

## ⚠️ Pitfalls

- Using only `<div>` soup forces ARIA to reinvent semantics poorly.
- Multiple `<h1>` can be OK in some outlines but keep a clear hierarchy.
- `section` without headings is usually a glorified div.
- `strong` ≠ bold CSS; `em` ≠ italic CSS — meaning first, style second.
- Landmark overuse (`nav` everywhere) adds noise — label distinct navs.

## 🔗 Related

- [section.md](./section.md) — sections
- [nav.md](./nav.md) — navigation
- [footer.md](./footer.md) — footer
- [accessibility.md](./accessibility.md) — a11y
- [aria.md](./aria.md) — when HTML isn’t enough
