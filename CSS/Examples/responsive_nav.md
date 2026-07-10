# Responsive Nav

_CSS · Example / how-to_

---

## 📋 Overview

Build a horizontal nav that collapses behind a details/summary (or checkbox) toggle on small screens using only CSS.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Flexbox | Align brand + links |
| Media queries | Switch layout by width |
| `:checked` / `details` | Toggle without JS |
| `gap` / `wrap` | Spacing without hacks |

## 💡 Examples

**responsive_nav.html + CSS:**

```html
<header class="site-header">
  <a class="brand" href="/">Docs</a>
  <details class="nav">
    <summary class="nav-toggle">Menu</summary>
    <ul class="nav-list">
      <li><a href="/guides">Guides</a></li>
      <li><a href="/api">API</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
  </details>
</header>
```

```css
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
}

.nav-toggle {
  cursor: pointer;
  list-style: none;
}

.nav-toggle::-webkit-details-marker {
  display: none;
}

@media (min-width: 720px) {
  .nav {
    display: contents;
  }

  .nav-toggle {
    display: none;
  }

  .nav-list {
    flex-direction: row;
    margin: 0;
    align-items: center;
  }
}
```

## ⚠️ Pitfalls

- `display: contents` removes the details box from layout — test focus order.
- Tiny tap targets on mobile — give summary enough padding.
- Fixed headers need `scroll-padding-top` so in-page anchors are not hidden.

## 🔗 Related

- [Card layout](card_layout.md)
- [Dark mode toggle](dark_mode_toggle.md)
