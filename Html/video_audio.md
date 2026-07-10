# Video & Audio

_HTML · Reference cheat sheet_

---

## 📋 Overview

`<video>` and `<audio>` embed media with native controls, multiple `<source>` fallbacks, tracks for captions, and a rich DOM API. Prefer native elements for accessibility and performance; use `controls`, captions, and sensible preload defaults.

## 🔧 Core concepts

| Attribute | Role |
| --- | --- |
| `src` / `<source>` | media URL(s) |
| `controls` | show UA controls |
| `autoplay` | may play muted only |
| `muted` `loop` `playsinline` | playback flags |
| `preload` | `none` `metadata` `auto` |
| `poster` | video placeholder image |
| `width` `height` | video layout |
| `crossorigin` | CORS for WebGL/canvas |

- **Tracks**: `<track kind="captions" srclang="en" src="..." default>`.
- **API**: `play()`, `pause()`, `currentTime`, `volume`, events `play` `pause` `ended` `error`.
- **Formats**: provide multiple sources (e.g. MP4 + WebM) when needed.

```html
<video controls playsinline poster="/poster.jpg" width="1280" height="720">
  <source src="/demo.webm" type="video/webm" />
  <source src="/demo.mp4" type="video/mp4" />
  <track kind="captions" srclang="en" src="/demo.vtt" label="English" default />
  Download the <a href="/demo.mp4">video</a>.
</video>
```

## 💡 Examples

```html
<audio controls preload="metadata">
  <source src="/episode.mp3" type="audio/mpeg" />
  <source src="/episode.ogg" type="audio/ogg" />
</audio>

<video
  controls
  muted
  loop
  autoplay
  playsinline
  aria-label="Product animation"
>
  <source src="/loop.mp4" type="video/mp4" />
</video>

<script>
  const v = document.querySelector("video");
  btn.onclick = async () => {
    try {
      await v.play();
    } catch {
      /* autoplay blocked */
    }
  };
  v.addEventListener("error", () => console.error(v.error));
</script>
```

```html
<!-- Picture-in-picture / fullscreen via controls or JS APIs -->
```

## ⚠️ Pitfalls

- Autoplay with sound is blocked — mute or require a gesture.
- Missing captions fails accessibility for dialogue-heavy video.
- `preload="auto"` can waste bandwidth — prefer `metadata`/`none` on listing pages.
- Cross-origin media without CORS taints canvas draws.
- Don’t rely on Flash-era embeds — use native or modern players built on these elements.

## 🔗 Related

- [media.md](./media.md) — media overview
- [picture_source.md](./picture_source.md) — source selection
- [iframe.md](./iframe.md) — third-party players
- [accessibility.md](./accessibility.md) — captions
- [../CSS/object_fit.md](../CSS/object_fit.md) — cover/contain
