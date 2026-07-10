# Dimensions

_React Native · Reference cheat sheet_

---

## 📋 Overview

`Dimensions` and `useWindowDimensions` report screen/window size for responsive layouts. Prefer the hook so rotations and split-screen updates re-render.

## 🔧 Core concepts

- **`useWindowDimensions()`** — `{ width, height, scale, fontScale }` (recommended).
- **`Dimensions.get("window" | "screen")`** — snapshot; subscribe manually if needed.
- **Safe areas** — use `react-native-safe-area-context`, not raw status bar math alone.
- **PixelRatio** — `PixelRatio.roundToNearestPixel`, font scaling awareness.

## 💡 Examples

```tsx
import { useWindowDimensions, View, Text } from "react-native";

export function Responsive() {
  const { width } = useWindowDimensions();
  const columns = width >= 768 ? 2 : 1;
  return (
    <View style={{ flexDirection: columns === 2 ? "row" : "column" }}>
      <Text>Columns: {columns}</Text>
    </View>
  );
}
```

```tsx
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
```

## ⚠️ Pitfalls

- Caching `Dimensions.get` at module load — stale after rotate.
- Ignoring `fontScale` → clipped text for a11y users.
- Using screen size instead of window on Android with system bars / foldables.

## 🔗 Related

- [layout.md](./layout.md) — flex layouts
- [statusbar.md](./statusbar.md) — insets / bars
- [platform_specific.md](./platform_specific.md) — platform splits
- [basic_primitives.md](./basic_primitives.md) — View sizing
