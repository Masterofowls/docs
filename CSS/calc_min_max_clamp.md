# calc, min, max, clamp

_CSS · Reference cheat sheet_

---

## 📋 Overview

CSS math functions compute lengths and numbers: `calc()` for expressions, `min()`/`max()` for bounds, and `clamp(min, preferred, max)` for fluid sizing. Essential for responsive type, gutters, and hybrid fixed/fluid layouts without many breakpoints.

## 🔧 Core concepts

- **`calc(a + b)`**: `+`/`-` need spaces; `*`/`/` don’t mix incompatible units blindly.
- **`min(a, b, …)`**: smallest value; **`max`**: largest.
- **`clamp(MIN, VAL, MAX)`**: equivalent to `max(MIN, min(VAL, MAX))`.
- **Units**: mix `%`, `rem`, `vw`, `vh` inside calc carefully (browser resolves).
- **Nested**: functions can nest; variables welcome.
- **Also**: `abs()`, `round()`, `sin()`… in modern CSS (support varies).

```css
width: calc(100% - 2rem);
font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem);
padding-inline: max(1rem, 3vw);
```

## 💡 Examples

```css
/* Fluid type */
:root {
  --step-0: clamp(1rem, 0.9rem + 0.4vw, 1.125rem);
}

/* Full-bleed breakout */
.full {
  width: 100vw;
  margin-inline: calc(50% - 50vw);
}

/* Sidebar layout */
.main {
  width: min(100%, 70rem);
  margin-inline: auto;
  padding-inline: max(1rem, calc((100% - 70rem) / 2));
}

/* Gap with vars */
.grid {
  gap: calc(var(--space, 0.5rem) * 2);
}

/* Prefer clamp over media queries for simple scales */
.hero-title {
  font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
}

/* Keep readable measure */
.prose {
  max-width: min(65ch, 100%);
}
```

```css
/* Safe area */
padding-bottom: max(1rem, env(safe-area-inset-bottom));
```

## ⚠️ Pitfalls

- `calc(100% - 2)` is invalid — units required on both sides of `+`/`-`.
- Division by zero / invalid units make the declaration dropped.
- `clamp` preferred value can be written so min > max — browsers may swap or fail; keep MIN ≤ MAX.
- Mixing `vh` with mobile browser chrome causes jumpiness — consider `dvh`/`svh`.
- Don’t over-fluidize — extreme `vw` type harms zoom/a11y; prefer rem-based clamps.

## 🔗 Related

- [variables.md](./variables.md) — tokens in calc
- [media_queries.md](./media_queries.md) — when math isn’t enough
- [adaptive.md](./adaptive.md) — responsive patterns
- [box_model.md](./box_model.md) — width math
- [font.md](./font.md) — fluid type
