# fetch vs axios

_Comparisons · Reference cheat sheet_

---

## 📋 Overview

**fetch** is the web-standard HTTP client (also in Node 18+). **axios** is a popular library with richer ergonomics (interceptors, automatic JSON, better older-browser story historically).

## 🔧 Core concepts

| Dimension | fetch | axios |
| --- | --- | --- |
| Availability | Built-in | `npm install axios` |
| JSON body | Manual `res.json()` | Auto-parsed `response.data` |
| HTTP errors | Only network fail rejects; 404 is OK | Rejects on non-2xx by default |
| Interceptors | DIY wrappers | First-class |
| Upload progress | Limited | Easier (`onUploadProgress`) |
| Timeouts | `AbortController` | `timeout` option |

**When to use fetch:** browser-native, Next.js/edge, zero deps, Request/Response compatibility.

**When to use axios:** interceptors, uniform error handling, upload progress, large existing axios codebases.

## 💡 Examples

**fetch:**

```js
const res = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ada" }),
});
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
```

**axios:**

```js
import axios from "axios";

const { data } = await axios.post("/api/users", { name: "Ada" });
```

## ⚠️ Pitfalls

- fetch does not throw on 404/500 — always check `res.ok`.
- axios throws — wrap in try/catch or check `validateStatus`.
- Credentials/cookies: fetch needs `credentials: 'include'`; axios uses `withCredentials`.

## 🔗 Related

- [Javascript/fetch.md](../Javascript/fetch.md)
- [Node/getting_started.md](../Node/getting_started.md)
- [README.md](./README.md)
