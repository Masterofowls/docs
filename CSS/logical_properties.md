# Logical Properties

_CSS · Reference cheat sheet_

---

## 📋 Overview

Logical properties use **flow-relative** directions (`inline`/`block`, `start`/`end`) instead of physical `left`/`right`/`top`/`bottom`. They adapt automatically to writing modes and direction (`ltr`/`rtl`, vertical text). Prefer them for margins, padding, borders, and positioning in global UIs.

## 🔧 Core concepts

| Physical | Logical |
| --- | --- |
| `width` / `height` | `inline-size` / `block-size` |
| `min-width` | `min-inline-size` |
| `margin-left/right` | `margin-inline-start/end` / `margin-inline` |
| `padding-top/bottom` | `padding-block` |
| `border-left` | `border-inline-start` |
| `left` / `right` | `inset-inline-start/end` |
| `text-align: left` | `text-align: start` |

- **Inline axis**: text flow direction; **block axis**: stacking of lines/paragraphs.
- **Shorthands**: `margin-inline`, `padding-block`, `inset: block-start inline-end …`, `border-inline`.
- **Writing mode**: `writing-mode`, `direction`, `unicode-bidi`.

```css
.card {
  margin-inline: auto;
  padding-block: 1rem;
  padding-inline: 1.25rem;
  border-inline-start: 4px solid var(--accent);
  max-inline-size: 60ch;
}
```

## 💡 Examples

```css
/* Absolute pin */
.badge {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-end: 0.5rem;
}

/* RTL-friendly nav */
.nav {
  display: flex;
  gap: 1rem;
  padding-inline: 1rem;
}
.nav .icon {
  margin-inline-end: 0.5rem;
}

/* Logical borders radius (modern) */
.panel {
  border-start-start-radius: 8px;
  border-start-end-radius: 8px;
}

/* Scroll padding */
.scroller {
  scroll-padding-block-start: 4rem;
}
```

```css
/* Mixed: physical still OK for shadows/art direction */
.hero {
  background-position: right top; /* intentional art */
}
```

## ⚠️ Pitfalls

- Mixing physical and logical on the same edge is confusing — pick one system per component.
- Older browsers may lack some logical radius/inset properties — check targets.
- `left` in animations/tooling may not map 1:1 when converting — test RTL.
- Transforms like `translateX` are still physical — use logical translations carefully (`translate: auto` evolving).
- Third-party CSS often physical — isolate overrides.

## 🔗 Related

- [box_model.md](./box_model.md) — box edges
- [position.md](./position.md) — inset
- [text.md](./text.md) — alignment
- [flex.md](./flex.md) — start/end alignment
- [adaptive.md](./adaptive.md) — i18n layouts
