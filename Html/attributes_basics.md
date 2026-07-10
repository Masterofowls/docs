# Attributes Basics

_HTML · Reference cheat sheet_

---

## 📋 Overview

**Attributes** add information to elements: where a link goes, which image to load, an id for CSS/JS, accessibility labels, and more. They appear in the opening tag as `name="value"`.

## 🔧 Core concepts

| Attribute | Common on | Purpose |
| --- | --- | --- |
| `id` | Most | Unique identifier in the page |
| `class` | Most | Styling / scripting hooks (reusable) |
| `href` | `a`, `link` | URL target |
| `src` / `alt` | `img` | Image URL and accessible description |
| `lang` | `html` | Document language |
| `type` | `script`, `input` | Variant / input kind |
| Boolean attrs | `disabled`, `checked`, `required` | Presence means true |

Prefer double quotes around values. One `id` per document; classes can repeat.

## 💡 Examples

**Links and images:**

```html
<a href="https://example.com" title="Example site">Visit example</a>
<img src="dog.png" alt="A dog in a park" width="400" height="300" />
```

**id and class:**

```html
<p id="intro" class="lead highlight">Welcome</p>
<button class="btn btn-primary" type="button">Save</button>
```

**Form-related attributes:**

```html
<label for="email">Email</label>
<input
  id="email"
  name="email"
  type="email"
  placeholder="you@example.com"
  required
/>
```

**Boolean attributes:**

```html
<input type="checkbox" checked disabled />
<!-- checked and disabled are true because they are present -->
```

## ⚠️ Pitfalls

- Duplicate `id` values break `getElementById` and fragment links.
- Missing `alt` on meaningful images fails accessibility.
- `class` is not `Class` / `CLASS` in XHTML-like tooling — use lowercase in HTML.
- Putting raw `&` in attribute URLs should be escaped as `&amp;` in HTML text.

## 🔗 Related

- [elements_basics.md](./elements_basics.md)
- [hello_world.md](./hello_world.md)
- [links.md](./links.md)
- [data_attributes.md](./data_attributes.md)
