# Middleware

_Next.js · Reference cheat sheet_

---

## 📋 Overview

Middleware runs on the Edge before a request is completed. Use it for redirects, rewrites, auth gates, A/B headers, and geo-based routing — not heavy business logic.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `middleware.ts` | File at project root or `src/` |
| `NextRequest` | Incoming request |
| `NextResponse.next()` | Continue |
| `NextResponse.redirect()` | Redirect |
| `NextResponse.rewrite()` | Internal rewrite |
| `matcher` | Limit which paths run middleware |

| Runtime | Notes |
| --- | --- |
| Edge | Default; limited Node APIs |
| Node (experimental options) | Check current Next.js docs for support |

## 💡 Examples

**Redirect unauthenticated users:**

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

**Rewrite:**

```ts
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/old") {
    return NextResponse.rewrite(new URL("/new", req.url));
  }
  return NextResponse.next();
}
```

**Set a header:**

```ts
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("x-pathname", req.nextUrl.pathname);
  return res;
}
```

## ⚠️ Pitfalls

- Middleware runs on many requests — keep it fast and matcher-scoped.
- Avoid DB calls and large dependency graphs in Edge middleware.
- Infinite redirect loops are easy if login ↔ protected matchers overlap badly.

## 🔗 Related

- [route_handlers.md](./route_handlers.md)
- [env.md](./env.md)
- [app_router.md](./app_router.md)
- [deployment.md](./deployment.md)
