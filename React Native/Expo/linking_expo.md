# Linking (Expo)

_Expo · Reference cheat sheet_

---

## 📋 Overview

Expo linking builds on RN `Linking` with **`expo-linking`** helpers and Expo Router path integration. Set `scheme` in app config; use universal links / app links for https. Create URLs with `Linking.createURL` for consistent env behavior.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `scheme` | Custom URL scheme in config |
| `createURL` | Build deep link for current env |
| `parse` | Parse path/query |
| Expo Router | File paths map to URLs |
| Universal links | `associatedDomains` / intent filters |

Dev client / Go vs production URLs differ—`createURL` helps.

## 💡 Examples

```tsx
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { router } from "expo-router";

const prefix = Linking.createURL("/");

export function useDeepLinks() {
  useEffect(() => {
    function handle(url: string) {
      const { path, queryParams } = Linking.parse(url);
      if (path?.startsWith("post/")) {
        router.push(`/post/${queryParams?.id ?? ""}`);
      }
    }
    Linking.getInitialURL().then((url) => url && handle(url));
    const sub = Linking.addEventListener("url", ({ url }) => handle(url));
    return () => sub.remove();
  }, []);
}

export function shareLink(id: string) {
  return Linking.createURL(`/post/${id}`);
}
```

```json
{
  "expo": {
    "scheme": "myapp",
    "ios": { "associatedDomains": ["applinks:example.com"] },
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [{ "scheme": "https", "host": "example.com", "pathPrefix": "/" }],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

## ⚠️ Pitfalls

- Hardcoding `myapp://` without `createURL` (breaks in Expo Go).
- Missing AASA / assetlinks verification for https links.
- Not testing cold start (`getInitialURL`).
- Scheme typos between config and marketing links.

## 🔗 Related

- [router.md](./router.md) — Expo Router
- [config.md](./config.md) — scheme
- [../linking.md](../linking.md) — RN Linking
- [../deeplinking.md](../deeplinking.md) — deep links
- [../navigation.md](../navigation.md) — navigation linking
