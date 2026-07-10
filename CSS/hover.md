# Hover

_CSS · Reference cheat sheet_

---

## 📋 Overview

Hover styles respond when a pointing device is over an element (`:hover`). They provide previews, affordance, and progressive disclosure—but they are unreliable on touchscreens and unavailable to keyboard-only users unless mirrored with `:focus-visible` / `:focus-within`. Use hover for enhancement, not for the only path to critical UI.

Feature-query with `@media (hover: hover)` when hover-only behavior would confuse touch users.

## 🔧 Core concepts

### Selectors & companions

| Selector | Role |
| --- | --- |
| `:hover` | Pointer over element |
| `:focus-visible` | Keyboard-style focus |
| `:focus-within` | Focus inside a parent (menus, cards) |
| `:active` | Pressed state |
| `@media (hover: hover)` | Primary input can hover |
| `@media (pointer: fine)` | Precise pointer (mouse) |

### Typical properties to change

| Category | Examples |
| --- | --- |
| Color | `color`, `background-color`, `border-color` |
| Elevation | `box-shadow`, `translate` |
| Emphasis | `opacity`, `filter`, `text-decoration` |
| Motion | `transform`, `transition` |

Keep transitions short (100–200ms) for UI chrome; longer for decorative motion.

### Safe pattern

```css
.card {
  transition: transform 160ms ease, box-shadow 160ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
  }
}

.card:focus-within {
  outline: 2px solid Highlight;
  outline-offset: 2px;
}
```

## 💡 Examples

### Link underline reveal

```css
.prose a {
  color: inherit;
  text-decoration-color: transparent;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 150ms ease;
}

.prose a:hover,
.prose a:focus-visible {
  text-decoration-color: currentColor;
}
```

### Icon button feedback

```css
.icon-btn {
  background: transparent;
  border-radius: 0.5rem;
  transition: background-color 120ms ease;
}

.icon-btn:hover {
  background: color-mix(in oklab, CanvasText 8%, transparent);
}

.icon-btn:active {
  background: color-mix(in oklab, CanvasText 14%, transparent);
}
```

### Show action affordances on card

```css
.card .actions {
  opacity: 0;
  transition: opacity 150ms ease;
}

.card:hover .actions,
.card:focus-within .actions {
  opacity: 1;
}
```

### Disable sticky-hover traps on touch

```css
@media (hover: none) {
  .tooltip[data-show-on-hover] {
    display: none;
  }
}
```

## ⚠️ Pitfalls

- Hiding essential controls only behind `:hover` so touch and keyboard users never see them.
- Leaving “stuck” hover styles on touch devices after tap—gate with `(hover: hover)`.
- Animating expensive properties (`width`, `top`, large `filter`) on every hover.
- Removing focus outlines and only styling `:hover`, which fails keyboard navigation.
- Nesting hover rules that fight (`parent:hover child` vs `child:hover`) and cause flicker.

## 🔗 Related

- [Buttons](button.md)
- [Cursor](cursor.md)
- [Animation](animation.md)
- [Effects](effects.md)
