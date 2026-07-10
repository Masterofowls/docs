# Web Components

_HTML · Reference cheat sheet_

---

## 📋 Overview

Web Components combine Custom Elements, Shadow DOM, and HTML templates/slots into reusable, framework-agnostic widgets. Define a class, register a tag with a hyphenated name, encapsulate markup/styles in a shadow root, and project content with slots.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Custom Elements | `customElements.define("x-el", Class)` |
| Shadow DOM | style/DOM encapsulation |
| `<template>` / `<slot>` | markup reuse & projection |
| CSS `::part` / vars | controlled theming |
| ES modules | load component definitions |

- Lifecycle: `constructor`, `connectedCallback`, `disconnectedCallback`, `attributeChangedCallback`.
- Form-associated custom elements can participate in forms (ElementInternals).
- Progressive enhancement: unknown elements render light DOM children until upgraded.

```html
<script type="module">
  class CoolBadge extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" }).innerHTML = `
        <style>:host{display:inline-pad;padding:.2em .5em;background:var(--badge-bg, #eee)}</style>
        <slot></slot>
      `;
    }
  }
  customElements.define("cool-badge", CoolBadge);
</script>
<cool-badge>Beta</cool-badge>
```

## 💡 Examples

```html
<template id="tooltip-tpl">
  <style>
    :host {
      position: relative;
    }
    .tip {
      display: none;
      position: absolute;
      ...;
    }
    :host(:hover) .tip,
    :host(:focus-within) .tip {
      display: block;
    }
  </style>
  <slot></slot>
  <div class="tip" part="tip"><slot name="tip"></slot></div>
</template>

<script type="module">
  const tpl = document.getElementById("tooltip-tpl");
  class XTooltip extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" }).append(tpl.content.cloneNode(true));
    }
  }
  customElements.define("x-tooltip", XTooltip);
</script>

<!-- Theming from outside -->
<style>
  x-tooltip {
    --badge-bg: #224;
  }
  x-tooltip::part(tip) {
    border-radius: 6px;
  }
</style>
```

```js
await customElements.whenDefined("cool-badge");
```

## ⚠️ Pitfalls

- Customized built-ins (`is="..."`) lack full cross-browser support — prefer autonomous elements.
- Closed shadow roots aren’t secure — don’t hide secrets there.
- Slotted content is styled with limited `::slotted` — complex styling may need parts/vars.
- SSR/hydration needs care — unknown elements flash unstyled without declarative shadow DOM strategies.
- Avoid huge shadow trees for simple static HTML — semantics first.

## 🔗 Related

- [template_slot.md](./template_slot.md) — template & slot
- [../Javascript/DOM/custom_elements.md](../Javascript/DOM/custom_elements.md) — element API
- [../Javascript/DOM/shadow_dom.md](../Javascript/DOM/shadow_dom.md) — shadow API
- [accessibility.md](./accessibility.md) — a11y in components
- [aria.md](./aria.md) — ARIA when needed
