# Color Functions

_CSS · Reference cheat sheet_

---

## 📋 Overview

Modern CSS colors use wide-gamut spaces and functions: `oklch`, `oklab`, `color()`, relative color syntax, and alpha with `/`. Prefer perceptually uniform spaces (`oklch`) for design systems and accessible gradients. Legacy `hex`, `rgb()`, `hsl()` remain fine.

## 🔧 Core concepts

| Function | Notes |
| --- | --- |
| `oklch(L C H / A)` | lightness, chroma, hue — great for themes |
| `oklab(...)` | rectangular OKLab |
| `hsl()` / `hwb()` | classic cylindrical |
| `rgb()` / `#rrggbbaa` | sRGB |
| `color(display-p3 ...)` | wide gamut |
| `color-mix(in oklch, A, B)` | mix in a space |

- **Alpha**: `oklch(60% 0.1 250 / 0.8)` or `/ 80%`.
- **Relative**: `oklch(from var(--c) l c h)` / channel math.
- **Fallback**: provide hex/rgb before newer functions when needed.

```css
:root {
  --brand: oklch(62% 0.19 255);
  --brand-soft: color-mix(in oklch, var(--brand) 30%, white);
}
.button {
  background: var(--brand);
  color: oklch(99% 0 0);
}
```

## 💡 Examples

```css
/* Palette from one hue */
--h: 255;
--brand-1: oklch(95% 0.03 var(--h));
--brand-5: oklch(55% 0.18 var(--h));
--brand-9: oklch(30% 0.08 var(--h));

/* Relative color */
--accent: #3366ff;
--accent-dark: oklch(from var(--accent) calc(l * 0.8) c h);

/* Mix for hover */
.button:hover {
  background: color-mix(in oklch, var(--brand) 85%, black);
}

/* Gradients that don’t muddy */
background: linear-gradient(
  135deg,
  oklch(70% 0.15 30),
  oklch(65% 0.14 250)
);

/* P3 with fallback */
.hero {
  background: #ff3b00;
  background: color(display-p3 1 0.3 0);
}
```

```css
/* Contrast: still verify WCAG — oklch L helps but isn’t automatic */
```

## ⚠️ Pitfalls

- Out-of-gamut colors may map unexpectedly — check in target displays.
- Older Safari needed `-webkit` or lacked `color-mix` / relative syntax — progressive enhance.
- Mixing in sRGB often produces grayish midpoints — mix in `oklch`.
- `currentColor` and inheritance interact with computed colors carefully.
- Don’t assume L% maps 1:1 to WCAG contrast — measure.

## 🔗 Related

- [variables.md](./variables.md) — color tokens
- [gradient.md](./gradient.md) — gradients
- [dark_mode.md](./dark_mode.md) — theme palettes
- [background.md](./background.md) — backgrounds
- [filter_backdrop.md](./filter_backdrop.md) — filter color effects
