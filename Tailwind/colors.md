# Colors

_Tailwind · Reference cheat sheet_

---

## 📋 Overview

Tailwind ships a palette of named colors with numeric shades. Apply via `text-*`, `bg-*`, `border-*`, `ring-*`, `fill-*`, and `stroke-*`.

## 🔧 Core concepts

| Prefix | Applies to |
| --- | --- |
| `text-{color}-{shade}` | color |
| `bg-{color}-{shade}` | background-color |
| `border-{color}-{shade}` | border-color |
| `ring-{color}-{shade}` | box-shadow ring |
| `from-*` / `via-*` / `to-*` | gradients |

| Shade | Typical use |
| --- | --- |
| 50–200 | Backgrounds, subtle borders |
| 400–600 | Accents, interactive |
| 700–950 | Text, strong emphasis |
| `white` / `black` / `transparent` | Special keywords |

## 💡 Examples

**Palette usage:**

```html
<div class="bg-sky-50 text-sky-950 border border-sky-200">Info</div>
<button class="bg-emerald-600 hover:bg-emerald-500 text-white">Go</button>
```

**Gradient:**

```html
<div class="bg-gradient-to-r from-orange-400 to-rose-500"></div>
```

**Opacity modifier:**

```html
<div class="bg-black/50 text-white">Overlay</div>
```

## ⚠️ Pitfalls

- Low-contrast text fails a11y — check `text-*` on `bg-*` pairs.
- Custom brand colors belong in `theme.extend.colors`, not one-off arbitrary hex everywhere.
- Printing / forced-colors modes may need extra CSS beyond utilities.

## 🔗 Related

- [dark_mode.md](./dark_mode.md)
- [typography.md](./typography.md)
- [custom_config.md](./custom_config.md)
- [utility_classes.md](./utility_classes.md)
