# Picture & Source

_HTML · Reference cheat sheet_

---

## 📋 Overview

`<picture>` wraps `<source>` elements and an `<img>` fallback for **art direction** (different crops/files per condition) and format negotiation (AVIF/WebP). The browser picks the first matching `<source>`, then loads via the `<img>` for intrinsic size, `alt`, and decoding behavior.

## 🔧 Core concepts

- **Structure**: `<picture>` → zero+ `<source>` → required `<img>`.
- **`media`**: art direction queries on `<source>`.
- **`type`**: MIME type for format selection.
- **`srcset` / `sizes`**: on `<source>` or `<img>` for resolution switching.
- **Final `<img>`**: provides `alt`, `width`/`height`, `loading`, and fallback `src`.
- Not a replacement for CSS `display` — it selects which resource loads.

```html
<picture>
  <source type="image/avif" srcset="/hero.avif" />
  <source type="image/webp" srcset="/hero.webp" />
  <img src="/hero.jpg" alt="Product on a desk" width="1600" height="900" />
</picture>
```

## 💡 Examples

```html
<!-- Art direction -->
<picture>
  <source
    media="(max-width: 600px)"
    srcset="/hero-mobile.jpg"
    width="800"
    height="1200"
  />
  <source media="(min-width: 601px)" srcset="/hero-desktop.jpg" />
  <img
    src="/hero-desktop.jpg"
    alt="Wide shot of the storefront"
    width="1600"
    height="900"
    fetchpriority="high"
  />
</picture>

<!-- Format + responsive widths -->
<picture>
  <source
    type="image/avif"
    srcset="/p-400.avif 400w, /p-800.avif 800w"
    sizes="(max-width: 700px) 100vw, 700px"
  />
  <source
    type="image/webp"
    srcset="/p-400.webp 400w, /p-800.webp 800w"
    sizes="(max-width: 700px) 100vw, 700px"
  />
  <img
    src="/p-800.jpg"
    srcset="/p-400.jpg 400w, /p-800.jpg 800w"
    sizes="(max-width: 700px) 100vw, 700px"
    alt="Red sneakers"
    width="800"
    height="800"
    loading="lazy"
  />
</picture>

<!-- Dark mode asset -->
<picture>
  <source srcset="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
  <img src="/logo-light.svg" alt="Acme" width="120" height="32" />
</picture>
```

## ⚠️ Pitfalls

- Omitting `<img>` is invalid — always include it with `alt`.
- `media` on sources is for art direction; don’t confuse with CSS-only hiding of a single image.
- First matching source wins — order matters (narrow media / preferred types first as designed).
- Width/height on sources help but layout stability still depends on the chosen image’s dimensions.
- Overusing many huge variants wastes storage — keep a sensible set.

## 🔗 Related

- [images.md](./images.md) — img basics
- [video_audio.md](./video_audio.md) — media sources
- [media.md](./media.md) — media overview
- [../CSS/object_fit.md](../CSS/object_fit.md) — cropping via CSS
- [../CSS/dark_mode.md](../CSS/dark_mode.md) — theme assets
