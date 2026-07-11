# HTTP Server (node:http)

_Node.js · Reference cheat sheet_

---

## 📋 Overview

`node:http` (and `node:https`) provide low-level servers and clients. Frameworks like Express/Fastify wrap these primitives.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `http.createServer` | Create server |
| `IncomingMessage` (`req`) | Request stream + headers |
| `ServerResponse` (`res`) | Writable response |
| `server.listen` | Bind port/host |
| `http.request` / `fetch` | Outbound HTTP |

| Header tip | Detail |
| --- | --- |
| Set before body | Call `writeHead` or `setHeader` early |
| `Content-Type` | Required for correct client parsing |
| Keep-alive | Default in modern Node |

## 💡 Examples

**Plain text server:**

```js
import http from "node:http";

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ path: req.url }));
  })
  .listen(9000, "0.0.0.0");
```

**Read POST body:**

```js
async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return Buffer.concat(chunks).toString("utf8");
}
```

**Global fetch (Node 18+):**

```js
const res = await fetch("https://example.com");
const text = await res.text();
```

## ⚠️ Pitfalls

- Forgetting to `end()` the response leaves the client hanging.
- Unbounded body reads enable memory DoS — enforce size limits.
- `req.url` includes query string; parse with `URL` + host header carefully.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [express_basics.md](./express_basics.md)
- [fastify_basics.md](./fastify_basics.md)
- [error_handling.md](./error_handling.md)
