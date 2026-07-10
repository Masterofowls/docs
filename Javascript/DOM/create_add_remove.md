# Create, Add, Remove

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

Build DOM trees with `createElement`, `createTextNode`, and modern insertion methods (`append`, `prepend`, `before`, `after`, `replaceWith`, `remove`). Prefer these over legacy `parentNode.appendChild` when you can.

## 🔧 Core concepts

- **Create**: `document.createElement(tag)`, `createElementNS`, `createTextNode`, `cloneNode(deep)`.
- **Insert**: `append`, `prepend`, `before`, `after`, `insertBefore`.
- **Replace / remove**: `replaceWith`, `replaceChildren`, `remove`, `replaceChild`.
- **DocumentFragment**: batch insert with one reflow.
- **Template**: `<template>` → `template.content.cloneNode(true)`.

```js
const el = document.createElement("button");
el.textContent = "Save";
parent.append(el);
```

## 💡 Examples

```js
const list = document.querySelector("#list");

const li = document.createElement("li");
li.className = "item";
li.textContent = "New item";
list.append(li);

// Multiple nodes
list.prepend(document.createTextNode("Header"), li.cloneNode(true));

// Fragment batching
const frag = document.createDocumentFragment();
for (const name of names) {
  const item = document.createElement("li");
  item.textContent = name;
  frag.append(item);
}
list.append(frag);

// Template
const tpl = document.querySelector("#row");
const row = tpl.content.cloneNode(true);
row.querySelector(".name").textContent = user.name;
list.append(row);

// Move existing node (reparent)
list.append(existingLi); // moves if already in DOM

// Remove
li.remove();
list.replaceChildren(); // clear all
```

```js
// Range createContextualFragment (HTML string → nodes)
const range = document.createRange();
const nodes = range.createContextualFragment("<span>Hi</span>");
parent.append(nodes);
```

## ⚠️ Pitfalls

- `appendChild` returns the node; `append` can take strings (as text) and multiple args.
- Cloning with `cloneNode(true)` does **not** copy event listeners (unless you rebind).
- Inserting a node already in the tree **moves** it — it is not copied.
- Creating thousands of nodes one-by-one without a fragment causes layout thrash.
- `innerHTML += ...` re-parses the whole subtree — avoid in loops.

## 🔗 Related

- [mutation_methods.md](./mutation_methods.md) — mutation details
- [content_methods.md](./content_methods.md) — text/HTML content
- [selectors.md](./selectors.md) — locating parents
- [document_methods.md](./document_methods.md) — document factories
- [range.md](./range.md) — Range fragments
- [../strings.md](../strings.md) — text nodes
