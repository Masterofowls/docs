# Images

_HTML · Reference cheat sheet_

---

## 📋 Overview

The `<img>` element embeds images. Always provide meaningful `alt` (or empty `alt=""` for decorative). Use `width`/`height` or CSS aspect-ratio to reduce layout shift, and `srcset`/`sizes` for responsive resolution switching. For art direction, prefer `<picture>`.

## 🔧 Core concepts

| Attribute | Role |
| --- | --- |
| `src` | image URL |
| `alt` | text alternative |
| `width` / `height` | intrinsic layout hints |
| `srcset` | candidate URLs with density/width descriptors |
| `sizes` | layout width for `w` descriptors |
| `loading` | `lazy` / `eager` |
| `decoding` | `async` / `sync` / `auto` |
| `fetchpriority` | `high` / `low` / `auto` |
| `crossorigin` | CORS for canvas use |

```html
<img
  src="/hero.jpg"
  alt="Team collaborating at a whiteboard"
  width="1200"
  height="800"
  loading="lazy"
  decoding="async"
/>
```

## 💡 Examples

```html
<!-- Decorative -->
<img src="/divider.svg" alt="" role="presentation" />

<!-- Responsive density -->
<img
  src="/logo.png"
  srcset="/logo.png 1x, /logo@2x.png 2x"
  alt="Acme"
  width="120"
  height="40"
/>

<!-- Width descriptors -->
<img
  src="/photo-800.jpg"
  srcset="/photo-400.jpg 400w, /photo-800.jpg 800w, /photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 600px"
  alt="Mountain lake at dawn"
  width="1200"
  height="800"
  loading="lazy"
/>

<!-- LCP hero: eager + high priority -->
<img
  src="/hero.avif"
  alt="Product screenshot"
  width="1600"
  height="900"
  fetchpriority="high"
/>

<!-- Map -->
<img src="/map.png" alt="Campus map" usemap="#campus" width="600" height="400" />
```

```html
<!-- Always pair with CSS max-width -->
<!-- img { max-width: 100%; height: auto; } -->
```

## ⚠️ Pitfalls

- Missing `alt` is worse than empty decorative `alt=""` — decide intentionally.
- Lazy-loading the LCP image hurts performance — keep heroes eager.
- Wrong `sizes` picks huge or tiny candidates — match real CSS layout.
- Hotlinking / missing CORS breaks canvas `getImageData`.
- Putting text only in images harms a11y and SEO — use real text.

## 🔗 Related

- [picture_source.md](./picture_source.md) — art direction
- [svg_inline.md](./svg_inline.md) — SVG
- [media.md](./media.md) — media overview
- [../CSS/object_fit.md](../CSS/object_fit.md) — fitting
- [accessibility.md](./accessibility.md) — alt text
