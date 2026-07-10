# AppRegistry

_React Native · Reference cheat sheet_

---

## 📋 Overview

`AppRegistry` is the JS entry that registers the root component. The native host looks up the app key and runs that component. Expo / CLI templates wire this for you.

## 🔧 Core concepts

- **`AppRegistry.registerComponent(appKey, () => Root)`** — required entry.
- **App key** — must match native (`AppDelegate` / `MainActivity` / `app.json` name).
- **`runApplication`** — used by the native side; rarely called from app code.
- **Expo** — `registerRootComponent` from `expo` wraps `AppRegistry`.

## 💡 Examples

```tsx
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
```

```tsx
// Expo
import { registerRootComponent } from "expo";
import App from "./App";

registerRootComponent(App);
```

## ⚠️ Pitfalls

- Mismatched app name between JS and native → blank screen / redbox.
- Registering twice with different roots in the same bundle.
- Forgetting the factory `() => App` (passing `App` directly is also accepted in modern RN, but factory is the classic pattern).

## 🔗 Related

- [basic_primitives.md](./basic_primitives.md) — building UI
- [Expo/filestructure.md](./Expo/filestructure.md) — Expo entry
- [Expo/config.md](./Expo/config.md) — app name / slug
- [widget.md](./widget.md) — alternate surfaces
