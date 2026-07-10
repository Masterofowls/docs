# Embedding

_HTML · Reference cheat sheet_

---

## 📋 Overview

HTML offers several ways to embed external or nested content: `<iframe>`, `<embed>`, `<object>`, and media elements. Prefer modern, specific elements (`iframe` for documents, `video`/`audio`/`img` for media). Treat embeds as a security and performance boundary — sandbox and size them deliberately.

## 🔧 Core concepts

| Element | Typical use |
| --- | --- |
| `iframe` | HTML documents, apps, maps, PDFs (browser-dependent) |
| `embed` | Plugin-like resources (PDF/legacy); limited API |
| `object` | Fallback-capable embed with nested content |
| `img` / `picture` | images |
| `video` / `audio` | media |
| `fencedframe` | privacy-bounded ads (emerging) |

- **Fallback**: nested content inside `<object>` shows if embedding fails.
- **Security**: `sandbox`, CSP `frame-src`, Permissions Policy `allow`.
- **A11y**: provide `title` / text fallback links.

```html
<iframe title="Terms PDF" src="/terms.pdf" width="100%" height="600"></iframe>

<object data="/diagram.svg" type="image/svg+xml" role="img" aria-label="Architecture diagram">
  <p><a href="/diagram.svg">Download diagram</a></p>
</object>
```

## 💡 Examples

```html
<!-- object with fallback -->
<object data="/poster.pdf" type="application/pdf" width="800" height="600">
  <p>PDF unavailable. <a href="/poster.pdf">Download</a>.</p>
</object>

<!-- embed (simple) -->
<embed src="/clip.swf" />
<!-- prefer video nowadays -->

<!-- Responsive iframe -->
<div style="aspect-ratio: 16 / 9">
  <iframe
    title="Demo"
    src="/embed/demo"
    style="width: 100%; height: 100%; border: 0"
    loading="lazy"
    sandbox="allow-scripts allow-same-origin"
  ></iframe>
</div>

<!-- Inline SVG often better than object for icons -->
```

```html
<!-- Prefer -->
<video src="/a.mp4" controls></video>
<!-- Over generic embed for video -->
```

## ⚠️ Pitfalls

- `embed`/`object` for video/audio are outdated — use dedicated media elements.
- Combining `sandbox` tokens `allow-scripts` + `allow-same-origin` can allow sandbox escape.
- PDFs in iframes vary by browser/OS — always offer a download link.
- Each embed costs memory/threads — lazy-load offscreen content.
- Accessibility: unlabeled frames fail audits — set `title`.

## 🔗 Related

- [iframe.md](./iframe.md) — iframe deep dive
- [video_audio.md](./video_audio.md) — media elements
- [images.md](./images.md) — images
- [svg_inline.md](./svg_inline.md) — inline SVG
- [accessibility.md](./accessibility.md) — titles/fallbacks
