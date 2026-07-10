# Blur

_React Native · Reference cheat sheet_

---

## 📋 Overview

Blurred glass effects use platform views: Expo `@react-native-community/blur` alternatives or **`expo-blur`** (`BlurView`). Common for headers, tab bars, and modal scrims. Performance varies—avoid huge animated blurs on low-end Android.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `BlurView` | Blurs content behind the view |
| `intensity` | Blur strength (Expo) |
| `tint` | light / dark / default |
| Fallback | Solid translucent color when unsupported |

Blur only affects views **behind** it in the native hierarchy—not React siblings painted later without proper ordering.

## 💡 Examples

```tsx
import { BlurView } from "expo-blur";
import { StyleSheet, Text, View } from "react-native";

export function FrostedHeader({ title }: { title: string }) {
  return (
    <View style={styles.wrap}>
      <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  title: { fontSize: 17, fontWeight: "600" },
});
```

**Config plugin (Expo):** ensure `expo-blur` is installed; prebuild if needed.

## ⚠️ Pitfalls

- Expecting BlurView to blur its own children—it blurs what’s behind.
- Heavy blur + frequent re-renders → jank on Android.
- Missing fallback UI on web/unsupported targets.
- Stacking multiple full-screen blurs.

## 🔗 Related

- [styling.md](./styling.md) — translucent UI
- [modal.md](./modal.md) — overlays
- [navigation.md](./navigation.md) — translucent headers
- [Expo config](./Expo/config.md) — plugins
- [animation.md](./animation.md) — animated opacity
