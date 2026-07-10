# Pressable

_React Native · Reference cheat sheet_

---

## 📋 Overview

`Pressable` is the modern press handler—prefer it over `TouchableOpacity` / `TouchableHighlight`. Style from press state, configure hit slop, and set accessibility roles. See also [touchable.md](./touchable.md) for legacy touchables.

## 🔧 Core concepts

- **Events** — `onPress`, `onLongPress`, `onPressIn` / `Out`.
- **State style** — `style={({ pressed }) => ...}`.
- **`hitSlop`** — expand touch target.
- **`android_ripple`** — Material ripple.
- **`disabled`** — block interaction + a11y state.
- **Delay** — `delayLongPress`.

## 💡 Examples

```tsx
import { Pressable, Text, StyleSheet } from "react-native";

export function Button({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      hitSlop={8}
      android_ripple={{ color: "#ffffff55" }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#111",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.4 },
  label: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
```

## ⚠️ Pitfalls

- Touch targets under ~44×44 pt.
- Nested Pressables competing for gestures.
- Using Touchable* in new code without reason.
- Missing `accessibilityRole="button"`.

## 🔗 Related

- [touchable.md](./touchable.md) — legacy touchables
- [gesture.md](./gesture.md) — advanced gestures
- [haptics.md](./haptics.md) — feedback
- [accesebility.md](./accesebility.md) — roles
- [animation.md](./animation.md) — press animations
