# Getting Started with Node.js

_Node.js · Reference cheat sheet_

---

## 📋 Overview

Node.js is a JavaScript runtime built on V8 for building servers, CLIs, and tooling outside the browser. Packages are managed with npm, pnpm, or yarn.

## 🔧 Core concepts

| Idea | Meaning |
| --- | --- |
| Runtime | Executes JS with Node APIs (`fs`, `http`, `process`) |
| Module | CommonJS (`require`) or ESM (`import`) unit |
| npm | Default package manager + registry client |
| Event loop | Schedules async I/O callbacks |
| LTS | Long-term support release line (prefer for prod) |

**Check install:**

```bash
node --version
npm --version
```

| Command | Purpose |
| --- | --- |
| `node app.js` | Run a script |
| `npm init -y` | Create `package.json` |
| `npm install express` | Add dependency |
| `node --watch app.js` | Restart on file changes (Node 18+) |

## 💡 Examples

**Hello server:**

```js
import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello Node\n");
});

server.listen(9000, () => console.log("http://localhost:9000"));
```

**`package.json` type module:**

```json
{
  "name": "demo",
  "type": "module",
  "scripts": { "start": "node index.js" }
}
```

## ⚠️ Pitfalls

- Mixing CJS and ESM without clear `"type"` / extensions causes cryptic import errors.
- Global `npm install -g` tools can conflict across projects — prefer local + `npx`.
- Blocking the event loop with heavy sync CPU work starves all requests.

## 🔗 Related

- [http_server.md](./http_server.md)
- [express_basics.md](./express_basics.md)
- [env_config.md](./env_config.md)
- [packaging.md](./packaging.md)
- [glossary.md](./glossary.md)
