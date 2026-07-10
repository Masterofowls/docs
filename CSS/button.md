# Buttons

_CSS · Reference cheat sheet_

---

## 📋 Overview

Button styling covers native `<button>`, `[type="submit"]`, and link-buttons that must look and behave like controls. Good button CSS balances affordance (clear hit target, focus, hover/active), accessibility (contrast, keyboard focus), and consistency across variants (primary, secondary, ghost, danger). Prefer styling the real `<button>` element over clickable `<div>`s.

Use logical properties, relative units, and `:focus-visible` so mouse and keyboard users both get appropriate feedback.

## 🔧 Core concepts

### Baseline reset & structure

| Concern | Recommendation |
| --- | --- |
| Font | `font: inherit` so buttons match surrounding type |
| Cursor | `cursor: pointer` on enabled controls |
| Sizing | Min hit area ≈ 44×44 CSS px on touch UIs |
| Alignment | `inline-flex` + `align-items` / `justify-content` for icon+label |
| Disabled | `disabled` attribute + `:disabled` styles; don’t rely on opacity alone |

### Interactive pseudo-classes

| Selector | When it applies |
| --- | --- |
| `:hover` | Pointer over control (may be false on touch) |
| `:active` | During press |
| `:focus-visible` | Keyboard (or UA-determined) focus ring |
| `:disabled` / `[aria-disabled="true"]` | Non-interactive |
| `:focus-within` | Rarely needed on the button itself |

### Design tokens (typical)

| Token | Example role |
| --- | --- |
| `--btn-bg` / `--btn-fg` | Fill and label |
| `--btn-radius` | Corner radius |
| `--btn-pad-x` / `--btn-pad-y` | Internal spacing |
| `--btn-border` | Outline / ghost borders |

## 💡 Examples

### Solid primary button

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  font: inherit;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  background: oklch(0.55 0.18 250);
  color: white;
  transition: background-color 150ms ease, transform 100ms ease;
}

.btn:hover { background: oklch(0.48 0.18 250); }
.btn:active { transform: translateY(1px); }

.btn:focus-visible {
  outline: 2px solid oklch(0.7 0.15 250);
  outline-offset: 2px;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

### Ghost / secondary variants

```css
.btn--ghost {
  background: transparent;
  color: oklch(0.4 0.12 250);
  border-color: color-mix(in oklab, currentColor 35%, transparent);
}

.btn--ghost:hover {
  background: color-mix(in oklab, currentColor 8%, transparent);
}
```

### Icon + label markup

```html
<button type="button" class="btn">
  <svg class="btn__icon" aria-hidden="true" focusable="false">…</svg>
  Save
</button>
```

```css
.btn__icon {
  inline-size: 1.125rem;
  block-size: 1.125rem;
  flex-shrink: 0;
}
```

### Full-width on small containers

```css
.btn--block {
  display: flex;
  inline-size: 100%;
}
```

## ⚠️ Pitfalls

- Removing `outline` without providing an equivalent `:focus-visible` style breaks keyboard users.
- Using `<a>` styled as a button for actions that don’t navigate—prefer `<button type="button">`.
- Setting only `opacity` on disabled buttons without `pointer-events` / `disabled`, so clicks still fire.
- Tiny tap targets (`padding: 2px 4px`) that fail mobile accessibility guidelines.
- Animating layout on press (`height` changes) instead of lightweight `transform` / color shifts.

## 🔗 Related

- [Hover](hover.md)
- [Cursor](cursor.md)
- [Icons](icon.md)
- [Text fields](textfield.md)
