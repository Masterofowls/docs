# Vibration

_React Native · Reference cheat sheet_

---

## 📋 Overview

`Vibration` triggers the device vibrator for tactile feedback. Simple on Android/iOS; patterns are mainly Android. For richer feedback on iOS, prefer **Expo Haptics** / native haptics APIs.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `Vibration.vibrate()` | Default buzz |
| `Vibration.vibrate(ms)` | Duration (Android) |
| `Vibration.vibrate(pattern)` | Android pattern `[wait, buzz, …]` |
| `Vibration.cancel()` | Stop |
| iOS | Duration often ignored; pattern limited |

Permissions: generally none for basic vibrate; respect user settings.

## 💡 Examples

```tsx
import { Vibration, Pressable, Text, Platform } from "react-native";

export function BuzzButton() {
  return (
    <Pressable
      onPress={() => {
        if (Platform.OS === "android") {
          Vibration.vibrate([0, 50, 40, 50]);
        } else {
          Vibration.vibrate();
        }
      }}
    >
      <Text>Buzz</Text>
    </Pressable>
  );
}
```

## ⚠️ Pitfalls

- Overusing vibration → annoying / battery drain.
- Expecting Android patterns to feel identical on iOS.
- Using Vibration when Haptics impact/selection is more appropriate.
- Not cancelling long patterns on unmount.

## 🔗 Related

- [haptics.md](./haptics.md) — Expo/iOS-quality haptics
- [pressable.md](./pressable.md) — press feedback
- [alert.md](./alert.md) — confirmations
- [platform_specific.md](./platform_specific.md) — Platform
- [accesebility.md](./accesebility.md) — reduce motion / feedback
