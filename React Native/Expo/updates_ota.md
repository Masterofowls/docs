# Updates (OTA)

_Expo · Reference cheat sheet_

---

## 📋 Overview

**EAS Update** delivers JavaScript/asset over-the-air updates without a full store release—when native code is unchanged. Configure `expo-updates`, publish with `eas update`, and channel/branch to builds. Native module changes still need a new binary.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Runtime version | Compatibility gate with binaries |
| Channel | Maps builds → update stream |
| Branch | Git-like update stream |
| `expo-updates` | Fetch/apply JS bundles |
| Rollback | Republish previous / serve rollback |

Policies: check on launch, reload when appropriate.

## 💡 Examples

```json
// app.json (excerpt)
{
  "expo": {
    "runtimeVersion": { "policy": "appVersion" },
    "updates": {
      "url": "https://u.expo.dev/<project-id>"
    },
    "extra": {
      "eas": { "projectId": "<project-id>" }
    }
  }
}
```

```bash
eas update --branch production --message "Fix checkout copy"
eas update:list --branch production
```

```tsx
import * as Updates from "expo-updates";
import { useEffect } from "react";

export function useApplyUpdate() {
  useEffect(() => {
    (async () => {
      if (__DEV__) return;
      const result = await Updates.checkForUpdateAsync();
      if (result.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    })();
  }, []);
}
```

## ⚠️ Pitfalls

- Shipping native changes via OTA—won't load; binary required.
- Mismatched `runtimeVersion` → updates ignored.
- Forcing reload mid-checkout without UX.
- Testing only in dev (Updates disabled in `__DEV__`).

## 🔗 Related

- [build.md](./build.md) — binaries
- [config.md](./config.md) — updates URL
- [eas_submit.md](./eas_submit.md) — store submit
- [commands.md](./commands.md) — EAS CLI
- [plugins.md](./plugins.md) — native config
