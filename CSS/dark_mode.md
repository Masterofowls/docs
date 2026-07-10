# Dark Mode

_CSS · Reference cheat sheet_

---

## 📋 Overview

Dark mode adapts UI colors for low-light preference or explicit theme toggles. Combine `prefers-color-scheme` with a class/`data-theme` override, CSS variables for tokens, and `color-scheme` for native form controls scrollbars.

## 🔧 Core concepts

- **System**: `@media (prefers-color-scheme: dark)`.
- **Override**: `html[data-theme="dark"]` or `.dark` class (user choice).
- **`color-scheme: light dark`**: hints UA widgets.
- **Tokens**: redefine `--bg`, `--text`, `--border` per theme.
- **Images**: `picture` / CSS filters / separate assets for dark.
- **Meta**: `<meta name="color-scheme" content="light dark">`.

```css
:root {
  color-scheme: light dark;
  --bg: #fff;
  --text: #111;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #121212;
    --text: #f2f2f2;
  }
}
html[data-theme="dark"] {
  --bg: #121212;
  --text: #f2f2f2;
}
body {
  background: var(--bg);
  color: var(--text);
}
```

## 💡 Examples

```css
/* Explicit light lock */
html[data-theme="light"] {
  color-scheme: light;
  --bg: #fff;
  --text: #111;
}

/* Soft surfaces */
:root {
  --surface: color-mix(in oklch, var(--bg) 92%, var(--text));
}

/* Avoid pure #000/#fff if harsh — use near-black */
html[data-theme="dark"] {
  --bg: oklch(18% 0.02 260);
  --text: oklch(95% 0.01 260);
  --accent: oklch(75% 0.14 250);
}

/* Dim images slightly in dark */
html[data-theme="dark"] img:not([data-keep]) {
  opacity: 0.92;
}
```

```js
const root = document.documentElement;
const stored = localStorage.getItem("theme");
if (stored) root.dataset.theme = stored;
toggle.onclick = () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
};
```

## ⚠️ Pitfalls

- Flash of wrong theme — set theme early (inline script in `<head>`).
- Shadows and borders need retuning — light shadows disappear on dark bg.
- Don’t invert entire pages with `filter: invert()` — breaks images/videos.
- Contrast still must meet WCAG — dark gray on black often fails.
- Third-party embeds may stay light — plan letterboxing.

## 🔗 Related

- [variables.md](./variables.md) — tokens
- [color_functions.md](./color_functions.md) — oklch palettes
- [media_queries.md](./media_queries.md) — prefers-*
- [../Javascript/DOM/media_query_list.md](../Javascript/DOM/media_query_list.md) — matchMedia
- [print.md](./print.md) — force light for print
