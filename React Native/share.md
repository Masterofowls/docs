# Share

_React Native · Reference cheat sheet_

---

## 📋 Overview

`Share` opens the platform share sheet for text/URLs (and files via community modules). Use it for invite links, exports, and content sharing.

## 🔧 Core concepts

- **`Share.share({ message, url, title })`** — core API.
- **Result** — `sharedAction` | `dismissedAction` (iOS mainly).
- **Files** — `expo-sharing` / `react-native-share` for images/PDFs.
- **Permissions** — writing to cache before sharing files.

## 💡 Examples

```tsx
import { Share, Pressable, Text, Platform } from "react-native";

export function ShareLink({ url }: { url: string }) {
  async function onShare() {
    try {
      await Share.share(
        Platform.OS === "ios"
          ? { url, message: "Check this out" }
          : { message: `Check this out ${url}` },
      );
    } catch {
      // user-facing error optional
    }
  }
  return (
    <Pressable onPress={onShare} accessibilityRole="button">
      <Text>Share</Text>
    </Pressable>
  );
}
```

```tsx
import * as Sharing from "expo-sharing";

async function shareFile(uri: string) {
  if (!(await Sharing.isAvailableAsync())) return;
  await Sharing.shareAsync(uri);
}
```

## ⚠️ Pitfalls

- Android often wants the URL inside `message`, not `url`.
- Assuming share succeeded when the sheet merely opened.
- Sharing huge files from remote URIs without downloading first.

## 🔗 Related

- [clipboard.md](./clipboard.md) — copy instead of share
- [storage.md](./storage.md) — temp files
- [permissions.md](./permissions.md) — media access
- [networking.md](./networking.md) — download then share
