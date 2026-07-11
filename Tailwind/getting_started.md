# Getting Started with Tailwind CSS

_Tailwind · Reference cheat sheet_

---

## 📋 Overview

Tailwind CSS is a utility-first framework: you compose small classes (`flex`, `p-4`, `text-sm`) in markup instead of writing bespoke CSS for every component.

## 🔧 Core concepts

| Idea | Meaning |
| --- | --- |
| Utility class | Single-purpose class (`mt-4`, `bg-blue-600`) |
| Design tokens | Spacing, colors, fonts from the theme |
| Variants | Prefixes like `hover:`, `md:`, `dark:` |
| Content scan | Tailwind finds class names in template files |
| `@tailwind` / `@import` | CSS entry depending on v3 vs v4 |

**Install (v3 typical):**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 💡 Examples

**HTML utilities:**

```html
<button class="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700">
  Save
</button>
```

**`tailwind.config.js` content paths:**

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**CSS entry (v3):**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## ⚠️ Pitfalls

- If classes are built via string concatenation, the scanner may miss them — use complete class names or safelist.
- Missing `content` paths → empty CSS output.
- Mixing Tailwind versions (v3 PostCSS vs v4 Vite plugin) without matching docs causes broken builds.

## 🔗 Related

- [utility_classes.md](./utility_classes.md)
- [responsive.md](./responsive.md)
- [custom_config.md](./custom_config.md)
- [Comparisons/tailwind_vs_css.md](../Comparisons/tailwind_vs_css.md)
