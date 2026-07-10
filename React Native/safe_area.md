# Safe Area

_React Native · Reference cheat sheet_

---

## 📋 Overview

Safe areas avoid notches, status bars, and home indicators. Use `react-native-safe-area-context` (`SafeAreaProvider`, `SafeAreaView`, `useSafeAreaInsets`)—the built-in `SafeAreaView` is limited (iOS-focused). Wrap the app once in a provider.

## 🔧 Core concepts

- **`SafeAreaProvider`** — root wrapper.
- **`useSafeAreaInsets()`** — `{ top, right, bottom, left }`.
- **`SafeAreaView`** — applies padding edges.
- **`edges`** — choose which sides (`['top','bottom']`).
- **Headers** — native stack often handles top inset; don’t double-pad.

## 💡 Examples

```tsx
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

export function App() {
  return (
    <SafeAreaProvider>
      <Screen />
    </SafeAreaProvider>
  );
}

function Screen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.flex} edges={["top", "bottom"]}>
      <View style={[styles.fab, { bottom: insets.bottom + 16 }]}>
        <Text>FAB</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fab: {
    position: "absolute",
    right: 16,
    padding: 12,
    backgroundColor: "#111",
  },
});
```

## ⚠️ Pitfalls

- Forgetting `SafeAreaProvider` → zero insets.
- Double-counting insets with header + screen padding.
- Using legacy RN `SafeAreaView` on Android expecting notch handling.
- Absolute tab bars covering content without bottom inset.

## 🔗 Related

- [statusbar.md](./statusbar.md) — status bar style
- [navigation.md](./navigation.md) — headers
- [layout.md](./layout.md) — flex
- [dimensions.md](./dimensions.md) — screen size
- [styling.md](./styling.md) — padding
