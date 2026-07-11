# Open Graph & Social Meta

_HTML · Reference cheat sheet_

---

## 📋 Overview

`og:*` and Twitter meta tags control link previews. Pair with canonical URLs and a dedicated OG image.

## 🔧 Core concepts

| Tag | Role |
| --- | --- |
| `og:title` / `og:description` | Preview text |
| `og:image` | Share image |
| `og:url` | Canonical share URL |
| `twitter:card` | Card type |

## 💡 Examples

```html
<head>
  <link rel="canonical" href="https://example.com/docs/html/open-graph/" />
  <meta property="og:title" content="Open Graph & Social Meta" />
  <meta property="og:description" content="Meta tags for link previews." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://example.com/docs/html/open-graph/" />
  <meta property="og:image" content="https://example.com/og/docs/html/open-graph.png" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
```

## ⚠️ Pitfalls

- Absolute image URLs required for most scrapers.
- Cache: platforms cache previews — use debuggers after changes.

## 🔗 Related

- [Meta](meta.md)
- [Head](head.md)
