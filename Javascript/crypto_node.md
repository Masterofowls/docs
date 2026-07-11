# Crypto

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Node.js `node:crypto` provides hashing, HMAC, random bytes, UUIDs, and more (ciphers, key derivation). Prefer the built-in module over ad-hoc hashing. For passwords use a dedicated KDF (`scrypt`, `pbkdf2`, or `argon2` via libs) — not raw `createHash`.

```js
import crypto from "node:crypto";
```

## 🔧 Core concepts

- **`createHash(algo)`**: one-way digest (`sha256`, `sha512`, `md5`…). Chain `.update().digest()`.
- **`randomUUID()`**: RFC 4122 v4 UUID string (cryptographically strong).
- **`randomBytes(n)`**: `n` cryptographically strong random bytes (`Buffer`); sync or callback/promise forms.
- **`createHmac(algo, key)`**: keyed hash for integrity with a secret.
- **Timing-safe compare**: `timingSafeEqual(a, b)` for secrets/hashes (same length required).

## 💡 Examples

```js
import crypto from "node:crypto";

const hash = crypto.createHash("sha256").update("hello", "utf8").digest("hex");

const id = crypto.randomUUID(); // '3b9f…'

const buf = crypto.randomBytes(16);
const token = buf.toString("hex");

const hmac = crypto
  .createHmac("sha256", process.env.SECRET ?? "dev")
  .update("payload")
  .digest("hex");

// Promise API (Node 15+)
import { randomBytes, randomUUID } from "node:crypto";
const bytes = await randomBytes(32);

function sha256FileBuffer(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

// Compare digests safely
const a = Buffer.from(hash, "hex");
const b = Buffer.from(hash, "hex");
crypto.timingSafeEqual(a, b); // true
```

```js
// Password hashing sketch — prefer scrypt
const salt = crypto.randomBytes(16);
const key = crypto.scryptSync("password", salt, 64);
```

## ⚠️ Pitfalls

- `md5` / `sha1` are broken for security — use only for checksums if required.
- Never store passwords as plain `sha256(password)`; use salted slow KDFs.
- `timingSafeEqual` throws if lengths differ — check length first or pad carefully.
- `Math.random()` is not crypto-safe; use `randomBytes` / `randomUUID`.
- Streaming large inputs: call `.update()` multiple times, then `.digest()` once.

## 🔗 Related

- [Buffer](buffer.md) — digests and random bytes as Buffers
- [fs](fs.md) — hash file contents
- [process](process.md) — secrets via `process.env`
- [Stream](stream.md) — hash while piping
- [encode](encode.md) — encoding helpers adjacent to hex/base64
