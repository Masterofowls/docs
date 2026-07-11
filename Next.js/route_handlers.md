# Route Handlers

_Next.js · Reference cheat sheet_

---

## 📋 Overview

Route Handlers live in `app/**/route.ts` (or `.js`) and export HTTP method functions. They replace many `pages/api` use cases in the App Router.

## 🔧 Core concepts

| Export | HTTP method |
| --- | --- |
| `GET` | Read |
| `POST` | Create / submit |
| `PUT` / `PATCH` | Update |
| `DELETE` | Delete |
| `HEAD` / `OPTIONS` | Meta / CORS |

| Helper | Use |
| --- | --- |
| `NextRequest` | Extended Request (cookies, `nextUrl`) |
| `NextResponse` | JSON, redirects, cookies |
| `params` | Dynamic segment values |

## 💡 Examples

**JSON GET:**

```ts
// app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "hi" });
}
```

**POST with body:**

```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ received: body }, { status: 201 });
}
```

**Dynamic segment:**

```ts
// app/api/users/[id]/route.ts
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  return Response.json({ id });
}
```

## ⚠️ Pitfalls

- Don't export a `page.tsx` and `route.ts` for the same path segment.
- Default caching of `GET` can surprise you — set `export const dynamic = 'force-dynamic'` when needed.
- Large file uploads need streaming/`FormData` care; don't assume unlimited body size.

## 🔗 Related

- [app_router.md](./app_router.md)
- [middleware.md](./middleware.md)
- [caching.md](./caching.md)
- [pages_router.md](./pages_router.md)
