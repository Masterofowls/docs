# Getting Started with HTML

_HTML · Reference cheat sheet_

---

## 📋 Overview

HTML (HyperText Markup Language) describes the **structure** of a web page: headings, paragraphs, links, images, forms. Browsers parse HTML into the DOM. CSS styles it; JavaScript makes it interactive.

## 🔧 Core concepts

| Idea | Meaning |
| --- | --- |
| Element | A piece of structure: `<p>text</p>` |
| Tag | The `<p>` / `</p>` markers |
| Attribute | Extra info on a tag: `href`, `src`, `alt` |
| Document | A full page starting with `<!DOCTYPE html>` |
| Nesting | Elements inside elements form a tree |

Files use the `.html` extension. Double-click or serve them locally to view in a browser.

## 💡 Examples

**Minimal page:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, HTML</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

**Save as `index.html` and open in a browser.**

**Common early tags:**

```html
<h1>Title</h1>
<p>Paragraph with a <a href="https://example.com">link</a>.</p>
<img src="photo.jpg" alt="A descriptive alt text" width="300" />
<ul>
  <li>One</li>
  <li>Two</li>
</ul>
```

**Validate structure mentally:** open tags should close (except void elements like `<img>`).

## ⚠️ Pitfalls

- Skipping `alt` on images hurts accessibility.
- Invalid nesting (`<p><div></div></p>`) confuses browsers.
- Viewing via `file://` is fine for basics; some APIs need a local server.
- HTML is not a programming language — logic lives in JavaScript.

## 🔗 Related

- [hello_world.md](./hello_world.md)
- [elements_basics.md](./elements_basics.md)
- [attributes_basics.md](./attributes_basics.md)
- [semantic.md](./semantic.md)
