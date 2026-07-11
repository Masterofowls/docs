# Glossary

_Tailwind · Reference cheat sheet_

---

## 📋 Overview

Alphabetical glossary of Tailwind CSS utility-first and configuration terms.

## 🔧 Core concepts

| Term | Definition |
| --- | --- |
| Arbitrary value | Bracket syntax like `w-[14ch]` for one-off CSS values. |
| Content paths | Glob list of files Tailwind scans for class names. |
| Core plugin | Built-in feature group that can be disabled. |
| Design token | Named theme value for spacing, color, font, etc. |
| JIT | Just-in-time generation of only used utilities. |
| Modifier / variant | Prefix such as `hover:`, `md:`, `dark:`. |
| Preflight | Tailwind’s base/reset styles. |
| Purge (legacy) | Old name for removing unused CSS; replaced by content scan. |
| Safelist | Explicit classes always included in the CSS output. |
| Theme | Config object defining design scales. |
| Utility | Single-purpose class mapping to one CSS declaration set. |
| `@apply` | Directive to inline utilities inside custom CSS. |
| `@layer` | Places custom CSS into base/components/utilities layers. |

## 💡 Examples

**Variant stack:**

```html
<button class="bg-zinc-900 hover:bg-zinc-700 md:px-6 dark:bg-zinc-100">
  OK
</button>
```

**Safelist sketch:**

```js
export default {
  safelist: ["bg-red-500", "bg-green-500"],
};
```

## ⚠️ Pitfalls

- Dynamic class construction often breaks scanning — prefer complete strings.
- `@apply` can recreate the specificity fights utilities were meant to avoid.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [utility_classes.md](./utility_classes.md)
- [custom_config.md](./custom_config.md)
- [README.md](./README.md)
