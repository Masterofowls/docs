# BackHandler

_React Native · Reference cheat sheet_

---

## 📋 Overview

`BackHandler` listens for the Android hardware back button (and some back gestures). iOS has no system back button — use navigation stack gestures instead.

## 🔧 Core concepts

- **`BackHandler.addEventListener("hardwareBackPress", handler)`**.
- **Return `true`** — you handled it; **`false`** — let default (exit / pop) proceed.
- **Cleanup** — remove the subscription in effect cleanup.
- **React Navigation** — prefer `beforeRemove` / stack options over raw BackHandler when using a navigator.

## 💡 Examples

```tsx
import { useEffect } from "react";
import { BackHandler, Alert } from "react-native";

export function useConfirmExit(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert("Exit?", "Leave the screen?", [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    });
    return () => sub.remove();
  }, [enabled]);
}
```

## ⚠️ Pitfalls

- Stacking multiple listeners without cleanup → unpredictable back behavior.
- Handling back on iOS unnecessarily — no-op or wrong UX.
- Calling `exitApp()` casually — poor UX; prefer navigating away.

## 🔗 Related

- [deeplinking.md](./deeplinking.md) — navigation entry
- [drawer.md](./drawer.md) — drawer back behavior
- [modal.md](./modal.md) — dismiss on back
- [gesture.md](./gesture.md) — gesture navigation
