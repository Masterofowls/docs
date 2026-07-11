# Express Basics

_Node.js · Reference cheat sheet_

---

## 📋 Overview

Express is a minimal Node HTTP framework: an app, middleware stack, and route handlers. Widely used and flexible; you wire most pieces yourself.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `express()` | Create app |
| `app.get/post/...` | Register route + method |
| `app.use` | Mount middleware or sub-app |
| `req` / `res` | Incoming request / outgoing response |
| `next` | Pass control to next middleware |

| `res` helper | Effect |
| --- | --- |
| `res.send` | Send string/Buffer/object |
| `res.json` | JSON + content-type |
| `res.status` | Set status code (chainable) |
| `res.redirect` | 3xx redirect |

## 💡 Examples

**Minimal app:**

```js
import express from "express";

const app = express();
app.get("/", (req, res) => res.json({ ok: true }));
app.listen(9000);
```

**JSON body parsing:**

```js
app.use(express.json());

app.post("/users", (req, res) => {
  res.status(201).json(req.body);
});
```

**404 fallback:**

```js
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});
```

## ⚠️ Pitfalls

- Forgetting `express.json()` leaves `req.body` undefined for JSON POSTs.
- Error-handling middleware must have 4 args `(err, req, res, next)` or Express skips it.
- Listening on a port already in use crashes at startup — check availability (9000+).

## 🔗 Related

- [express_middleware.md](./express_middleware.md)
- [express_routing.md](./express_routing.md)
- [error_handling.md](./error_handling.md)
- [Comparisons/express_vs_fastify.md](../Comparisons/express_vs_fastify.md)
