# fs

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Node.js filesystem APIs live in `node:fs`. Prefer `node:fs/promises` for async/await. Sync methods (`readFileSync`) block the event loop — fine for CLIs/startup, risky in servers.

```js
import fs from "node:fs/promises";
import { readFileSync } from "node:fs";
```

## 🔧 Core concepts

- **`readFile(path, encoding?)`**: returns `Buffer` by default; pass `"utf8"` for a string.
- **`writeFile(path, data, options?)`**: creates/overwrites; `{ flag: "a" }` to append.
- **`mkdir(path, { recursive: true })`**: create nested directories.
- **`readdir(path, { withFileTypes: true })`**: list entries; Dirent has `isFile()` / `isDirectory()`.
- **`rm(path, { recursive, force })`**: delete files or trees (replaces older `rmdir`/`unlink` combos).
- **Sync vs async**: `*Sync` blocks; promises/`fs.callbacks` do not.

## 💡 Examples

```js
import fs from "node:fs/promises";
import path from "node:path";

const text = await fs.readFile("notes.txt", "utf8");
await fs.writeFile("out.txt", text, "utf8");

await fs.mkdir(path.join("data", "cache"), { recursive: true });

const entries = await fs.readdir("data", { withFileTypes: true });
for (const ent of entries) {
  console.log(ent.name, ent.isDirectory() ? "dir" : "file");
}

await fs.rm("tmp/build", { recursive: true, force: true });

// Copy / rename
await fs.copyFile("a.json", "b.json");
await fs.rename("b.json", "c.json");

// Sync (scripts / one-shot tools)
import { readFileSync, writeFileSync } from "node:fs";
const cfg = readFileSync("config.json", "utf8");
writeFileSync("config.bak.json", cfg);
```

```js
// Ensure parent dir before write
async function writeSafe(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data, "utf8");
}
```

## ⚠️ Pitfalls

- Forgetting encoding yields a `Buffer`, not a string.
- `writeFile` truncates by default — use append flag or read-modify-write carefully.
- `readdir` without `withFileTypes` returns names only; you need `stat` for type.
- Race conditions: check-then-write can fail; prefer `wx` flag or atomic rename patterns.
- Sync APIs in request handlers stall other connections.

## 🔗 Related

- [Path](path.md) — join / resolve paths safely
- [Async](async.md) — async/await with promises
- [Promise](promise.md) — promise basics
- [Buffer](buffer.md) — binary file contents
- [JSON](json.md) — parse config after `readFile`
- [Stream](stream.md) — large files without loading all
