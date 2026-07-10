# Images

_CSS · Reference cheat sheet_

---

## 📋 Overview

CSS for images covers how replaced elements (`<img>`, `<picture>`, `object-fit` containers, and background images) size, crop, and align. Content images belong in HTML (`<img>` / `<picture>`) for semantics, alt text, and lazy loading; CSS then controls layout fit. Use `object-fit` and `object-position` for consistent crops in fixed frames, and modern formats (`avif`, `webp`) via `<picture>` or `image-set()`.

Always reserve space (width/height attributes or aspect-ratio) to reduce layout shift.

## 🔧 Core concepts

### Sizing & fitting

| Property | Role |
| --- | --- |
| `max-inline-size: 100%` | Prevent overflow in fluid layouts |
| `block-size: auto` | Preserve intrinsic ratio with width |
| `aspect-ratio` | Explicit box ratio before load |
| `object-fit` | `fill` \| `contain` \| `cover` \| `none` \| `scale-down` |
| `object-position` | Crop anchor (`center`, `top`, percentages) |
| `image-rendering` | `auto` \| `crisp-edges` \| `pixelated` |

### Responsive sources (HTML + CSS)

| Tool | Use |
| --- | --- |
| `srcset` + `sizes` | Resolution / width switching |
| `<picture>` + `<source>` | Art direction / format |
| `image-set()` | CSS background candidates |

### Decorative vs content

| Kind | Approach |
| --- | --- |
| Content | `<img alt="…">` |
| Decorative | Empty `alt` or CSS background; don’t rely on background for meaning |

## 💡 Examples

### Fluid content image

```css
.content img {
  max-inline-size: 100%;
  block-size: auto;
  border-radius: 0.5rem;
}
```

### Cover crop in a fixed frame

```css
.avatar {
  inline-size: 3rem;
  block-size: 3rem;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  object-position: center;
}
```

### Aspect-ratio placeholder

```css
.media-frame {
  aspect-ratio: 16 / 9;
  background: color-mix(in oklab, CanvasText 6%, Canvas);
}

.media-frame > img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}
```

### Picture art direction (markup)

```html
<picture>
  <source media="(min-width: 64rem)" srcset="/hero-wide.avif" type="image/avif" />
  <source media="(min-width: 64rem)" srcset="/hero-wide.webp" type="image/webp" />
  <img src="/hero-square.jpg" width="800" height="800" alt="Product on a desk" />
</picture>
```

## ⚠️ Pitfalls

- Omitting width/height or `aspect-ratio`, causing Cumulative Layout Shift as images load.
- Using `background-image` for meaningful pictures—no alt text, harder to print/save.
- Applying `object-fit: cover` without controlling `object-position`, cropping faces badly.
- Setting only `width: 100%` with a fixed height and default `object-fit: fill`, which distorts.
- Serving huge desktop assets to mobile without `srcset`/`sizes` or compressed formats.

## 🔗 Related

- [Background](background.md)
- [Icons](icon.md)
- [Scale](scale.md)
- [Effects](effects.md)
