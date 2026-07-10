# Scroll Snap

_CSS · Reference cheat sheet_

---

## 📋 Overview

CSS scroll snap aligns a scroll container’s viewport to snap positions on children — carousels, paginated strips, and section snapping — without heavy JS. Configure snap on the container and snap alignment on items.

## 🔧 Core concepts

| Property | Where | Values |
| --- | --- | --- |
| `scroll-snap-type` | container | `x`/`y`/`both` + `mandatory`/`proximity` |
| `scroll-snap-align` | items | `start` `center` `end` `none` |
| `scroll-snap-stop` | items | `normal` `always` |
| `scroll-padding` | container | inset for sticky headers |
| `scroll-margin` | items | snap area outset |

- **Mandatory**: always settle on a snap point; **proximity**: only if close.
- Works with overflow scrollers (`overflow-x: auto`).
- Pair with `scroll-behavior: smooth` carefully (a11y).

```css
.scroller {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
}
.scroller > * {
  flex: 0 0 80%;
  scroll-snap-align: center;
}
```

## 💡 Examples

```css
/* Full-page sections */
html {
  scroll-snap-type: y proximity;
}
section {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Padding for fixed header */
.scroller {
  scroll-padding-inline: 1rem;
  scroll-padding-block-start: 4rem;
}

/* Stop skipping cards */
.card {
  scroll-snap-stop: always;
}

/* Vertical story */
.stories {
  height: 100dvh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}
.stories > article {
  height: 100dvh;
  scroll-snap-align: start;
}
```

```css
@media (prefers-reduced-motion: reduce) {
  .scroller {
    scroll-snap-type: none;
  }
}
```

## ⚠️ Pitfalls

- `mandatory` can trap users on small viewports — test keyboard and screen zoom.
- Nested scrollers with snap fight each other — snap one axis/level.
- Images loading late shift snap positions — reserve sizes (`aspect-ratio`, width/height).
- Snap ≠ carousel accessibility — still provide buttons and focus management.
- iOS/Android quirks with momentum — prefer `proximity` when unsure.

## 🔗 Related

- [scroll.md](./scroll.md) — overflow scroll
- [overflow.md](./overflow.md) — scroll containers
- [sticky.md](./sticky.md) — scroll-padding with sticky
- [media_queries.md](./media_queries.md) — reduced motion
- [flex.md](./flex.md) — horizontal strips
