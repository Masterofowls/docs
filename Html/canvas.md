# Canvas

_HTML · Reference cheat sheet_

---

## 📋 Overview

The `<canvas>` element provides a blank bitmap drawing surface for 2D graphics, animations, charts, and games via the Canvas API (`CanvasRenderingContext2D`) or WebGL (`WebGLRenderingContext` / `WebGL2RenderingContext`). Markup alone draws nothing—JavaScript obtains a context and paints pixels.

Canvas is a **replaced element**: it has intrinsic width/height attributes (default 300×150 CSS pixels) that define the **bitmap resolution**, separate from CSS display size. Prefer canvas for dynamic, pixel-level drawing; prefer SVG for scalable, DOM-accessible vector graphics.

Accessibility: a canvas is opaque to assistive tech by default. Provide fallback content inside the element, expose meaning with `aria-*` / `role`, or mirror critical UI in the DOM.

## 🔧 Core concepts

### Markup and sizing

```html
<canvas id="chart" width="640" height="360" role="img" aria-label="Sales chart">
  Chart unavailable. Sales rose 12% this quarter.
</canvas>
```

- `width` / `height` attributes set the **backing store** in CSS pixels (not CSS `width`/`height`).
- Scaling with CSS without matching attributes blurs the bitmap—multiply by `devicePixelRatio` for sharp retina output.
- Fallback text or HTML between tags shows when canvas is unsupported or for AT.

### Getting a context

```js
const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d"); // or "webgl", "webgl2", "bitmaprenderer"
if (!ctx) {
  // Fallback UI
}
```

Common 2D operations: `fillRect`, `stroke`, `fillText`, `drawImage`, paths (`beginPath`, `arc`, `lineTo`), transforms, and `requestAnimationFrame` loops.

### Hit testing and interaction

Canvas has no DOM nodes for shapes. Track geometry yourself (bounding boxes, path `isPointInPath`) or use libraries. Keyboard focus requires `tabindex="0"` and custom key handlers.

### Offscreen and workers

`OffscreenCanvas` and `createImageBitmap` move heavy drawing off the main thread. Transfer a canvas with `transferControlToOffscreen()` when supported.

### When not to use canvas

| Need | Prefer |
|------|--------|
| Semantic text / links | HTML |
| Scalable icons / diagrams | SVG |
| Form controls | Native inputs |
| SEO-critical content | Real DOM text |

## 💡 Examples

### Basic 2D drawing

```html
<canvas id="box" width="200" height="100" aria-label="Blue rectangle"></canvas>
<script>
  const ctx = document.getElementById("box").getContext("2d");
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(20, 20, 160, 60);
</script>
```

### High-DPI setup

```html
<canvas id="hi" role="img" aria-label="Sharp circle"></canvas>
<script>
  const canvas = document.getElementById("hi");
  const dpr = window.devicePixelRatio || 1;
  const cssW = 300;
  const cssH = 150;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.beginPath();
  ctx.arc(150, 75, 40, 0, Math.PI * 2);
  ctx.fillStyle = "#0f766e";
  ctx.fill();
</script>
```

### Accessible chart pattern

```html
<figure>
  <canvas id="sales" width="480" height="240"
    role="img"
    aria-labelledby="sales-caption"
    aria-describedby="sales-desc"></canvas>
  <figcaption id="sales-caption">Q1–Q4 revenue</figcaption>
  <p id="sales-desc" class="visually-hidden">
    Q1 40k, Q2 55k, Q3 48k, Q4 70k. Peak in Q4.
  </p>
  <table class="visually-hidden">
    <caption>Same data as the chart</caption>
    <thead><tr><th>Quarter</th><th>Revenue</th></tr></thead>
    <tbody>
      <tr><td>Q1</td><td>40000</td></tr>
      <tr><td>Q2</td><td>55000</td></tr>
    </tbody>
  </table>
</figure>
```

### Animation loop sketch

```html
<canvas id="anim" width="320" height="180" aria-hidden="true"></canvas>
<script>
  const c = document.getElementById("anim");
  const ctx = c.getContext("2d");
  let x = 0;
  function frame(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(x % 320, 80, 40, 40);
    x += 2;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
</script>
```

## ⚠️ Pitfalls

- **CSS size ≠ bitmap size** — Stretching a 300×150 canvas to full viewport without resetting `width`/`height` causes blurry drawing and wrong mouse coordinates.
- **Forgotten `clearRect`** — Animation trails accumulate unless you clear or redraw the full frame.
- **Security / tainted canvas** — Cross-origin images without CORS taint the canvas; `toDataURL` / `getImageData` then throw.
- **No built-in a11y** — Screen readers ignore drawn text; always provide a text alternative or live DOM summary.
- **Memory** — Large canvases (especially × DPR) are expensive; dispose contexts and avoid unbounded offscreen buffers.
- **`getContext` once** — Calling with a different type after the first successful call returns `null`.

## 🔗 Related

- [Media](media.md) — `<img>`, `<video>`, `<audio>` as drawable sources
- [Script](script.md) — loading drawing code
- [Style](style.md) — CSS sizing vs canvas attributes
- [Div](div.md) — layout wrappers around canvas
- [Section](section.md) — structuring figure/chart regions
- [URL](url.md) — blob/object URLs for exports
