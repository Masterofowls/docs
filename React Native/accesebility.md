# Accessibility

_React Native · Reference cheat sheet_

---

## 📋 Overview

Make screens usable with VoiceOver / TalkBack via accessibility props on native views. Test with real screen readers; labels and roles matter more than visual-only cues.

## 🔧 Core concepts

- **`accessible`** — groups children into one focusable element.
- **`accessibilityLabel` / `accessibilityHint`** — what is read aloud.
- **`accessibilityRole`** — `button`, `header`, `link`, `image`, `adjustable`, …
- **`accessibilityState`** — `{ disabled, selected, checked, busy, expanded }`.
- **`accessibilityActions` / `onAccessibilityAction`** — custom actions.

## 💡 Examples

```tsx
import { Pressable, Text } from "react-native";

export function IconButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Double tap to activate"
    >
      <Text>★</Text>
    </Pressable>
  );
}
```

```tsx
<View
  accessible
  accessibilityRole="header"
  accessibilityLabel="Account settings"
>
  <Text>Settings</Text>
</View>
```

## ⚠️ Pitfalls

- Icon-only buttons without `accessibilityLabel`.
- Nesting multiple `accessible` views that trap focus incorrectly.
- Relying on placeholder text as the only label for inputs — set explicit labels.

## 🔗 Related

- [touchable.md](./touchable.md) — press targets
- [basic_primitives.md](./basic_primitives.md) — Text / View
- [gesture.md](./gesture.md) — gestures vs a11y
- [Expo/plugins.md](./Expo/plugins.md) — native config
