# Content Methods

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

Read and write element content with `textContent`, `innerHTML`, `innerText`, and modern helpers like `insertAdjacentHTML`. Prefer `textContent` for untrusted strings; use HTML APIs only with sanitized markup.

## 🔧 Core concepts

- **`textContent`**: all descendant text; no HTML parsing; fast and safe for plain text.
- **`innerHTML`**: get/set HTML markup; parses and replaces children.
- **`innerText`**: layout-aware visible text (triggers reflow); respects CSS.
- **`outerHTML`**: includes the element itself.
- **Adjacent**: `insertAdjacentHTML/Text/Element(position, ...)`.
- **Positions**: `beforebegin`, `afterbegin`, `beforeend`, `afterend`.

```js
el.textContent = userInput; // safe plain text
el.insertAdjacentHTML("beforeend", trustedHtml);
```

## 💡 Examples

```js
const box = document.querySelector("#box");

box.textContent = "Hello";
box.innerHTML = "<strong>Hello</strong>";

// Append HTML without wiping siblings' listeners on whole parent
box.insertAdjacentHTML("beforeend", "<li>Item</li>");
box.insertAdjacentText("afterbegin", "Note: ");

// Build with elements instead of HTML strings
const li = document.createElement("li");
li.textContent = item.name;
box.append(li);

// Read
const visible = box.innerText;
const all = box.textContent;

// Clear
box.replaceChildren(); // modern clear
// box.innerHTML = "";
```

```js
// Template + sanitize strategy: never assign raw user HTML
function renderComment(el, text) {
  el.textContent = "";
  const p = document.createElement("p");
  p.textContent = text;
  el.append(p);
}
```

```js
// insertAdjacentElement keeps node identity / listeners
const note = document.createElement("aside");
note.textContent = "Tip";
box.insertAdjacentElement("afterend", note);

console.log(box.outerHTML.slice(0, 40));
```

## ⚠️ Pitfalls

- Assigning `innerHTML` with user data is an XSS risk.
- Setting `innerHTML` destroys existing child nodes and their listeners.
- `innerText` is slower and style-dependent — prefer `textContent` for logic.
- `outerHTML` replacement can detach the element reference you hold.
- HTML parsing may normalize/fix markup unexpectedly.

## 🔗 Related

- [create_add_remove.md](./create_add_remove.md) — node creation
- [mutation_methods.md](./mutation_methods.md) — append/replace
- [attributes.md](./attributes.md) — attributes vs content
- [selectors.md](./selectors.md) — finding targets
- [../strings.md](../strings.md) — escaping text
- [../encode.md](../encode.md) — encoding
