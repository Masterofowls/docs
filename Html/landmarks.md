# Landmarks

_HTML · Reference cheat sheet_

---

## 📋 Overview

Landmark elements (`header`, `nav`, `main`, `aside`, `footer`, `search`) structure pages for accessibility and SEO. One `main` per page; skip links jump to it.

## 🔧 Core concepts

| Element | Role |
| --- | --- |
| `header` | Banner / intro |
| `nav` | Primary navigation |
| `main` | Unique page content |
| `aside` | Complementary |
| `footer` | Site/page footer |
| `search` | Search landmark (modern) |

## 💡 Examples

```html
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>
    <p>Code Reference</p>
    <nav aria-label="Primary">...</nav>
  </header>
  <main id="main">
    <article>...</article>
  </main>
  <aside aria-label="On this page">...</aside>
  <footer>...</footer>
</body>
```

## ⚠️ Pitfalls

- Multiple `main` confuses AT; nest sections inside one `main`.
- `nav` without accessible name is vague when several exist — use `aria-label`.

## 🔗 Related

- [Semantic](semantic.md)
- [Nav](nav.md)
- [Accessibility](accessibility.md)
- [Aria](aria.md)
