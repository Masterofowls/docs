# Fastify Basics

_Node.js · Reference cheat sheet_

---

## 📋 Overview

Fastify is a high-performance Node web framework focused on schemas, plugins, and low overhead. Validation and serialization are first-class via JSON Schema.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `Fastify()` | Create instance |
| `fastify.route` / `.get` | Register routes |
| `schema` | Validate request + serialize response |
| `reply` | Response object (`send`, `code`) |
| `listen` | Bind host/port |

| Hook (examples) | When |
| --- | --- |
| `onRequest` | Early request |
| `preHandler` | Before handler |
| `onSend` | Before payload sent |
| `onError` | Error path |

## 💡 Examples

**Minimal server:**

```js
import Fastify from "fastify";

const app = Fastify({ logger: true });
app.get("/", async () => ({ ok: true }));
await app.listen({ port: 9000, host: "0.0.0.0" });
```

**Schema validation:**

```js
app.post(
  "/users",
  {
    schema: {
      body: {
        type: "object",
        required: ["email"],
        properties: { email: { type: "string", format: "email" } },
      },
    },
  },
  async (req, reply) => {
    reply.code(201);
    return req.body;
  },
);
```

**Async handler errors:**

```js
app.get("/boom", async () => {
  throw Object.assign(new Error("nope"), { statusCode: 400 });
});
```

## ⚠️ Pitfalls

- Prefer `async` handlers or call `reply.send` — don't mix both carelessly.
- Validation errors return 400 by default; customize with `setErrorHandler`.
- Plugin encapsulation means decorations are not always global — register shared plugins at the right scope.

## 🔗 Related

- [fastify_plugins.md](./fastify_plugins.md)
- [express_basics.md](./express_basics.md)
- [error_handling.md](./error_handling.md)
- [Comparisons/express_vs_fastify.md](../Comparisons/express_vs_fastify.md)
