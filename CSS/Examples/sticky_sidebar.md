# Sticky Sidebar

_CSS · Example / how-to_

---

## 📋 Overview

Two-column docs layout: scrolling main column, sticky "On this page" sidebar.

## 🔧 Core concepts

| Property | Role |
| --- | --- |
| `position: sticky` | Stick within parent |
| `top` | Offset under header |
| Grid/flex | Column structure |

## 💡 Examples

```css
.docs {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 14rem;
  gap: 2rem;
}

.toc {
  position: sticky;
  top: 5rem;
  align-self: start;
  max-height: calc(100vh - 6rem);
  overflow: auto;
}

@media (max-width: 800px) {
  .docs { grid-template-columns: 1fr; }
  .toc { position: static; max-height: none; }
}
```

## ⚠️ Pitfalls

- Sticky fails if any ancestor has `overflow: hidden`.
- Parent must be taller than the sticky element.

## 🔗 Related

- [Sticky](../sticky.md)
- [Grid](../grid.md)
- [Position](../position.md)
