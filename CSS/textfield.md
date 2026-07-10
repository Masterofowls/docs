# Text fields

_CSS · Reference cheat sheet_

---

## 📋 Overview

Text field styling covers `<input>` (text-like types), `<textarea>`, and contenteditable surfaces. Native controls inherit inconsistently across browsers, so production UIs usually apply a shared reset: font inheritance, explicit padding, borders, and focus styles. Prioritize visible labels, `:focus-visible` rings, error states, and comfortable touch targets over purely decorative chrome.

Use logical padding and `min-block-size` so fields scale with user font settings.

## 🔧 Core concepts

### Elements & types

| Control | Notes |
| --- | --- |
| `input[type="text"|email|url|search|password|tel|number]` | Single-line fields |
| `textarea` | Multi-line; style `resize` |
| `input[type="file"]` | Limited styling; often wrapped |
| `::placeholder` | Hint text; never replace a label |
| `::selection` | Selected text colors |

### Useful properties

| Property | Role |
| --- | --- |
| `font: inherit` | Match UI typography |
| `appearance` / `-webkit-appearance` | Reduce native look where needed |
| `caret-color` | Caret theming |
| `field-sizing` | `fixed` \| `content` (modern auto-size inputs/areas) |
| `resize` | `none` \| `vertical` \| `both` on textareas |
| `accent-color` | Some controls’ accent (checkboxes, etc.) |

### State selectors

| Selector | Use |
| --- | --- |
| `:focus-visible` | Keyboard-friendly focus ring |
| `:user-invalid` / `:invalid` | Validation styling (prefer user-interacted) |
| `:disabled` / `:read-only` | Non-editable affordances |
| `:placeholder-shown` | Empty field styling |

## 💡 Examples

### Baseline field

```css
.field {
  display: grid;
  gap: 0.35rem;
}

.field__input {
  font: inherit;
  line-height: 1.4;
  padding: 0.625rem 0.75rem;
  min-block-size: 2.5rem;
  border: 1px solid color-mix(in oklab, CanvasText 20%, transparent);
  border-radius: 0.5rem;
  background: Canvas;
  color: CanvasText;
  inline-size: 100%;
}

.field__input::placeholder {
  color: color-mix(in oklab, CanvasText 45%, transparent);
}

.field__input:focus-visible {
  outline: 2px solid oklch(0.65 0.15 250);
  outline-offset: 2px;
  border-color: transparent;
}
```

### Textarea

```css
.field__input--area {
  min-block-size: 6rem;
  resize: vertical;
  field-sizing: content; /* progressive enhancement */
}
```

### Error state

```css
.field__input[aria-invalid="true"] {
  border-color: oklch(0.55 0.2 25);
}

.field__error {
  color: oklch(0.5 0.18 25);
  font-size: 0.875rem;
}
```

### Search with icon padding

```css
.input-search {
  padding-inline-start: 2.25rem;
  background-image: url("/icons/search.svg");
  background-repeat: no-repeat;
  background-position: left 0.65rem center;
  background-size: 1rem;
}

[dir="rtl"] .input-search {
  background-position: right 0.65rem center;
  padding-inline-start: 0.75rem;
  padding-inline-end: 2.25rem;
}
```

## ⚠️ Pitfalls

- Removing focus outlines without a strong `:focus-visible` replacement.
- Using placeholder text as the only label—placeholders disappear and hurt accessibility.
- Styling `:invalid` from page load (before user input), which marks empty required fields red immediately—prefer `:user-invalid` where supported.
- Forbidding `resize` on large textareas without another way to grow the control.
- Setting fixed `height` in `px` that clips descenders or breaks zoomed text.

## 🔗 Related

- [Buttons](button.md)
- [Text](text.md)
- [Fonts](font.md)
- [Cursor](cursor.md)
