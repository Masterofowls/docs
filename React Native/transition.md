# Transition

_React Native · Reference cheat sheet_

---

## 📋 Overview

Transitions animate between UI states or screens. Use navigator transition configs, `Animated` / Reanimated shared element patterns, or simple mount/unmount fades.

## 🔧 Core concepts

- **Stack transitions** — slide, fade, modal presentation (React Navigation / native stack).
- **LayoutAnimation** — animate flex layout changes after state updates.
- **Shared values** — Reanimated for interactive, interruptible transitions.
- **Presence** — delay unmount until exit animation finishes.
- **Native stack** — best performance; limited custom interpolation vs JS stack.

## 💡 Examples

```tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ animation: "fade_from_bottom", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
```

```tsx
import { LayoutAnimation, Platform, UIManager, Pressable } from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function toggle(setOpen: (fn: (v: boolean) => boolean) => void) {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  setOpen((v) => !v);
}
```

## ⚠️ Pitfalls

- Heavy JS transitions dropping frames — prefer native stack / Reanimated.
- Animating during rapid navigation spam without cancellation.
- Forgetting Android LayoutAnimation experimental flag on older RN.

## 🔗 Related

- [animation.md](./animation.md) — Animated / Reanimated
- [drawer.md](./drawer.md) — drawer motion
- [modal.md](./modal.md) — modal presentation
- [gesture.md](./gesture.md) — interactive pops
