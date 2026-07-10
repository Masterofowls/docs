# Widget

_React Native · Reference cheat sheet_

---

## 📋 Overview

Home-screen widgets are **native** (WidgetKit on iOS, App Widgets on Android). React Native doesn’t render them directly — share data via App Groups / a native module, or use libraries that bridge widget timelines.

## 🔧 Core concepts

- **Native UI** — SwiftUI / RemoteViews; JS updates data, not the widget tree each frame.
- **Data bridge** — UserDefaults App Group, SharedPreferences, or a small native module.
- **Expo** — config plugins / custom native code (dev client or prebuild); limited Expo Go support.
- **Update cadence** — system-controlled refresh budgets; don’t expect real-time RN re-renders.
- **Deep link** — widget taps open the app via URL scheme.

## 💡 Examples

```tsx
// Conceptual: write shared state the native widget reads
import AsyncStorage from "@react-native-async-storage/async-storage";
// Prefer a native module that writes to App Group / SharedPreferences:
// await WidgetBridge.setData({ streak: 5 });

export async function syncWidgetPayload(streak: number) {
  await AsyncStorage.setItem("widget/streak", String(streak));
  // Native side: read key and reload timelines (WidgetCenter / updateAppWidget)
}
```

```swift
// iOS sketch — TimelineProvider reads App Group
// UserDefaults(suiteName: "group.com.example.app")?.integer(forKey: "streak")
```

## ⚠️ Pitfalls

- Expecting full RN components inside the widget — not supported.
- Over-refreshing timelines → OS throttles updates.
- Missing App Group / package entitlements in Expo config plugins.

## 🔗 Related

- [deeplinking.md](./deeplinking.md) — open app from widget
- [storage.md](./storage.md) — shared data
- [Expo/plugins.md](./Expo/plugins.md) — native extensions
- [Expo/build.md](./Expo/build.md) — native builds
