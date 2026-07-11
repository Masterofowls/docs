# Error Handling

_Node.js · Reference cheat sheet_

---

## 📋 Overview

Robust Node services distinguish operational errors (expected failures) from programmer bugs, return safe HTTP responses, and log details server-side.

## 🔧 Core concepts

| Layer | Approach |
| --- | --- |
| Sync throw | Caught by try/catch or framework |
| Async rejection | Must be handled or process warns/crashes |
| HTTP mapping | Map errors → status codes |
| Process hooks | `uncaughtException` / `unhandledRejection` (last resort) |

| Status | Typical meaning |
| --- | --- |
| 400 | Bad input |
| 401 / 403 | Auth / forbidden |
| 404 | Missing resource |
| 409 | Conflict |
| 500 | Unexpected server failure |

## 💡 Examples

**Express async wrapper:**

```js
const wrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/user/:id", wrap(async (req, res) => {
  const user = await db.find(req.params.id);
  if (!user) {
    const err = new Error("Not found");
    err.status = 404;
    throw err;
  }
  res.json(user);
}));
```

**Central error middleware:**

```js
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    error: status >= 500 ? "Internal error" : err.message,
  });
});
```

**Fastify setErrorHandler:**

```js
fastify.setErrorHandler((err, req, reply) => {
  reply.status(err.statusCode || 500).send({ error: err.message });
});
```

## ⚠️ Pitfalls

- Leaking stack traces to clients exposes internals.
- Swallowing errors (`catch (e) {}`) hides outages.
- `uncaughtException` handlers that continue serving are unsafe — shut down and restart.

## 🔗 Related

- [express_middleware.md](./express_middleware.md)
- [fastify_basics.md](./fastify_basics.md)
- [http_server.md](./http_server.md)
- [env_config.md](./env_config.md)
