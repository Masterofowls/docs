# Template & Slot

_HTML · Reference cheat sheet_

---

## 📋 Overview

`<template>` holds inert DOM that isn’t rendered until cloned with script. `<slot>` (inside Shadow DOM) projects light-DOM children into shadow trees. Together they power Web Components and client-side rendering patterns without displaying markup prematurely.

## 🔧 Core concepts

- **`<template>`**: `template.content` is a `DocumentFragment`; clone with `cloneNode(true)`.
- **Inert**: scripts/styles/images inside don’t run until adopted into a live document.
- **`<slot>`**: placeholder in shadow root; default content inside slot shows if nothing assigned.
- **Named slots**: `<slot name="title">` ↔ `slot="title"` on light children.
- **Assignment**: automatic or `slotAssignment: "manual"` + `slot.assign()`.
- **`slotchange` event**: fires when assigned nodes change.

```html
<template id="row">
  <li class="row"><span class="name"></span></li>
</template>

<script>
  const tpl = document.getElementById("row");
  const node = tpl.content.cloneNode(true);
  node.querySelector(".name").textContent = "Ada";
  list.append(node);
</script>
```

## 💡 Examples

```html
<!-- Component with slots -->
<script>
  class UserCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" }).innerHTML = `
        <style>::slotted(img){width:48px;border-radius:50%}</style>
        <slot name="avatar"></slot>
        <h2><slot name="name">Anonymous</slot></h2>
        <div><slot></slot></div>
      `;
    }
  }
  customElements.define("user-card", UserCard);
</script>

<user-card>
  <img slot="avatar" src="/a.jpg" alt="" />
  <span slot="name">Ada Lovelace</span>
  <p>Mathematician</p>
</user-card>

<!-- Manual assignment -->
<script>
  const shadow = host.attachShadow({ mode: "open", slotAssignment: "manual" });
  shadow.innerHTML = `<slot></slot>`;
  shadow.querySelector("slot").assign(...host.children);
</script>

<!-- slotchange -->
<script>
  shadow.querySelector("slot").addEventListener("slotchange", (e) => {
    console.log(e.target.assignedNodes());
  });
</script>
```

```html
<!-- Clone for each list item; never append template.content directly -->
```

## ⚠️ Pitfalls

- Forgetting `cloneNode(true)` and moving `template.content` empties the template after first use — always clone.
- Slots only work in Shadow DOM — not in light DOM alone.
- Fallback slot content is not light DOM — don’t expect to query it as children of the host.
- Scripts inside live-cloned templates will run — sanitize untrusted HTML.
- Named slot mismatch leaves content unprojected (still in light DOM).

## 🔗 Related

- [web_components.md](./web_components.md) — full stack
- [../Javascript/DOM/shadow_dom.md](../Javascript/DOM/shadow_dom.md) — shadow trees
- [../Javascript/DOM/custom_elements.md](../Javascript/DOM/custom_elements.md) — custom elements
- [script.md](./script.md) — script loading
- [semantic.md](./semantic.md) — light DOM structure
