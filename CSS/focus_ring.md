# Focus Ring

_CSS · Reference cheat sheet_

---

## 📋 Overview

Visible focus styles are required for keyboard users. Prefer `:focus-visible` so mouse users aren't stuck with heavy outlines while keyboard users still see them.

## 🔧 Core concepts

| Selector | When |
| --- | --- |
| `:focus` | Any focus |
| `:focus-visible` | Keyboard-ish focus |
| `:focus-within` | Descendant focused |
| `outline` / `box-shadow` | Draw the ring |

## 💡 Examples

```css
:focus {
  outline: none; /* only if you replace it */
}

:focus-visible {
  outline: 2px solid CanvasText;
  outline-offset: 2px;
}

.button:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in oklab, CanvasText 30%, transparent);
}
```

## ⚠️ Pitfalls

- Never remove outlines without a clear replacement.
- High-contrast mode: keep `outline` — don't rely only on color.

## 🔗 Related

- [Pseudo classes](pseudo_classes.md)
- [Button](button.md)
- [Pseudo elements](pseudo_elements.md)
