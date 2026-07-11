# Utility Classes

_Tailwind · Reference cheat sheet_

---

## 📋 Overview

Utilities map to CSS properties. Compose many utilities on one element; extract components only when repetition hurts readability.

## 🔧 Core concepts

| Category | Examples |
| --- | --- |
| Layout | `block`, `flex`, `grid`, `hidden` |
| Spacing | `p-4`, `px-2`, `mt-6`, `gap-3` |
| Sizing | `w-full`, `h-10`, `max-w-lg`, `min-h-screen` |
| Typography | `text-sm`, `font-medium`, `leading-6`, `truncate` |
| Color | `text-red-600`, `bg-zinc-100`, `border-slate-300` |
| Border | `border`, `rounded-md`, `ring-2` |
| Effects | `shadow`, `opacity-50`, `blur` |

| Pattern | Example |
| --- | --- |
| State variant | `hover:bg-blue-600` |
| Important | `!flex` (escape hatch) |
| Arbitrary value | `w-[320px]`, `top-[var(--header)]` |

## 💡 Examples

**Card-ish layout without a “card” abstraction:**

```html
<article class="max-w-md rounded-xl border border-zinc-200 p-6 shadow-sm">
  <h2 class="text-lg font-semibold text-zinc-900">Title</h2>
  <p class="mt-2 text-sm text-zinc-600">Body copy</p>
</article>
```

**Arbitrary property:**

```html
<div class="[mask-image:linear-gradient(black,transparent)]"></div>
```

**Space between children:**

```html
<ul class="space-y-2">
  <li>One</li>
  <li>Two</li>
</ul>
```

## ⚠️ Pitfalls

- Extremely long `class` attributes — extract a component or `@apply` sparingly.
- Conflicting utilities: later rules in generated CSS win, not necessarily left-to-right in the attribute.
- Inline styles still override utilities depending on specificity.

## 🔗 Related

- [spacing_sizing.md](./spacing_sizing.md)
- [typography.md](./typography.md)
- [colors.md](./colors.md)
- [layout_flex_grid.md](./layout_flex_grid.md)
