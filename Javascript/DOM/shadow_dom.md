# Shadow DOM

_JavaScript DOM · Reference cheat sheet_

---

## 📋 Overview

Shadow DOM attaches an encapsulated DOM tree to an element. Styles and nodes inside the shadow root stay mostly isolated from the page, enabling component CSS without global leaks. Open mode exposes `shadowRoot`; closed hides it.

## 🔧 Core concepts

- **Attach**: `el.attachShadow({ mode: "open" | "closed", delegatesFocus?, slotAssignment? })`.
- **Tree**: `shadowRoot` hosts markup; light DOM children may project via `<slot>`.
- **Style**: shadow styles don’t apply outside (mostly); page styles don’t pierce in (except inheritance of some properties / `::part` / CSS variables).
- **Events**: retargeted so `event.target` appears as the host from outside.
- **Parts**: `part="name"` + `::part(name)` from outside.
- **Slots**: default and named (`<slot name="title">`).

```js
const root = host.attachShadow({ mode: "open" });
root.innerHTML = `
  <style>:host { display: block; }</style>
  <slot></slot>
`;
```

## 💡 Examples

```js
class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host { display: block; border: 1px solid #ccc; }
        ::slotted(h2) { margin: 0; }
        button { color: var(--accent, blue); }
      </style>
      <slot name="title"></slot>
      <div class="body"><slot></slot></div>
      <button part="action">OK</button>
    `;
  }
}
customElements.define("x-card", Card);

// Light DOM usage
// <x-card><h2 slot="title">Hi</h2><p>Body</p></x-card>

// Outside styling via parts
// x-card::part(action) { font-weight: bold; }

// Manual slot assignment (imperative)
const shadow = host.attachShadow({
  mode: "open",
  slotAssignment: "manual",
});
const slot = shadow.querySelector("slot");
slot.assign(nodeA, nodeB);

// Query inside
host.shadowRoot.querySelector("button");
```

```js
// CSS variables pierce shadow
// :root { --accent: tomato; }
```

## ⚠️ Pitfalls

- Closed mode is not a security boundary — don’t store secrets there.
- `document.querySelector` won’t see shadow internals — pierce with `shadowRoot`.
- Form-associated custom elements need Extra APIs for native form participation.
- Slotted content stays in light DOM — styles with `::slotted` are limited.
- Duplicate `attachShadow` throws — only one shadow root per host.

## 🔗 Related

- [custom_elements.md](./custom_elements.md) — defining elements
- [../Html/template_slot.md](../../Html/template_slot.md) — slot HTML
- [../Html/web_components.md](../../Html/web_components.md) — stack overview
- [selectors.md](./selectors.md) — piercing limits
- [events.md](./events.md) — retargeting
