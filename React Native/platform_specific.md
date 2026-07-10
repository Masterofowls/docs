# Platform-specific

_React Native · Reference cheat sheet_

---

## 📋 Overview

Branch behavior and files per OS with `Platform`, `.ios.tsx` / `.android.tsx` extensions, and platform select helpers. Keep shared logic in common modules.

## 🔧 Core concepts

- **`Platform.OS`** — `"ios" | "android" | "web" | …`.
- **`Platform.select({ ios, android, default })`**.
- **`Platform.Version`** — API level / iOS version.
- **Extensions** — `Button.ios.tsx`, `Button.android.tsx` resolved by Metro.
- **Expo** — `Platform` still applies; also check Constants for store client vs standalone.

## 💡 Examples

```tsx
import { Platform, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: 4 },
    default: {},
  }),
});

export function Hint() {
  return (
    <Text>
      {Platform.OS === "ios" ? "Swipe from left to go back" : "Use the back button"}
    </Text>
  );
}
```

```text
components/
  Map.tsx          # shared types / re-export
  Map.ios.tsx
  Map.android.tsx
```

## ⚠️ Pitfalls

- Duplicating large components instead of small platform branches.
- Assuming `Platform.OS === "ios"` covers iPad idioms — check size classes too.
- Forgetting web when using React Native Web.

## 🔗 Related

- [layout.md](./layout.md) — shared layout
- [statusbar.md](./statusbar.md) — bar styles differ
- [keyboard.md](./keyboard.md) — avoiding behavior
- [Expo/config.md](./Expo/config.md) — platform config blocks
