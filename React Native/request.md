# Request

_React Native · Reference cheat sheet_

---

## 📋 Overview

Centralize HTTP requests: base URL, auth headers, error mapping, retries. Keep UI hooks thin; put transport in a small `api` / `request` module.

## 🔧 Core concepts

- **Wrapper** — `request(path, options)` over `fetch`.
- **Interceptors** — inject tokens; refresh on 401.
- **Errors** — typed API errors with status + body.
- **Timeouts** — `AbortController` + `setTimeout`.
- **Caching** — React Query / SWR for GET dedupe.

## 💡 Examples

```ts
const BASE = "https://api.example.com";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body: unknown,
  ) {
    super(message);
  }
}

export async function request<T>(
  path: string,
  init: RequestInit & { token?: string; timeoutMs?: number } = {},
): Promise<T> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), init.timeoutMs ?? 15000);
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      signal: ctrl.signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
        ...init.headers,
      },
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new ApiError("Request failed", res.status, body);
    return body as T;
  } finally {
    clearTimeout(t);
  }
}
```

```ts
export const getProfile = (token: string) =>
  request<{ name: string }>("/me", { token });
```

## ⚠️ Pitfalls

- Duplicating fetch logic in every screen.
- Swallowing errors without user feedback.
- Hardcoding secrets in the client — use backend for privileged calls.

## 🔗 Related

- [networking.md](./networking.md) — transport basics
- [storage.md](./storage.md) — token persistence
- [settings.md](./settings.md) — env / config flags
- [deeplinking.md](./deeplinking.md) — post-auth routes
