# Hello World

_HTML · Reference cheat sheet_

---

## 📋 Overview

An HTML Hello World is a complete minimal document that shows a heading or paragraph in the browser. It confirms your file is saved correctly and the browser can render markup.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `<!DOCTYPE html>` | Tells the browser to use standards mode |
| `<html>` | Root element |
| `<head>` | Metadata (title, charset, CSS links) |
| `<body>` | Visible content |
| `<h1>` / `<p>` | Heading and paragraph |

Always set `lang` on `<html>` and `charset` in `<head>`.

## 💡 Examples

**Classic hello page:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

**Hello with a paragraph and link:**

```html
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to <strong>HTML</strong>.</p>
  <p><a href="https://developer.mozilla.org/">Learn more on MDN</a></p>
</body>
```

**Inline emphasis:**

```html
<p>Hello, <em>World</em>!</p>
```

**Comment in HTML:**

```html
<!-- This is not shown on the page -->
<p>Hello, World!</p>
```

## ⚠️ Pitfalls

- Saving as `.txt` may open as plain text — use `.html`.
- Forgetting `</h1>` can make the rest of the page inherit heading styles.
- Using multiple `<h1>` without thought hurts document outline clarity.
- Fancy Word-processor HTML is messy — write markup in a code editor.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [elements_basics.md](./elements_basics.md)
- [attributes_basics.md](./attributes_basics.md)
- [links.md](./links.md)
