# Deep linking

_React Native · Reference cheat sheet_

---

## 📋 Overview

Deep links open a specific screen from a URL (`myapp://path`, HTTPS universal / app links). Configure native intent filters / associated domains, then map URLs in your navigator.

## 🔧 Core concepts

- **Schemes** — custom (`myapp://`) vs HTTPS app links / universal links.
- **React Navigation** — `linking` config: `prefixes` + `config.screens`.
- **Expo** — `scheme` in `app.json` / `app.config`; `expo-linking`, `npx uri-scheme`.
- **Cold start** — read initial URL; also subscribe to URL events while running.

## 💡 Examples

```tsx
import { NavigationContainer } from "@react-navigation/native";

const linking = {
  prefixes: ["myapp://", "https://myapp.example.com"],
  config: {
    screens: {
      Home: "home",
      User: "users/:id",
    },
  },
};

export function RootNav() {
  return (
    <NavigationContainer linking={linking}>
      {/* navigators */}
    </NavigationContainer>
  );
}
```

```tsx
import * as Linking from "expo-linking";

const url = Linking.createURL("users/42");
// e.g. myapp://users/42
```

## ⚠️ Pitfalls

- Native config missing → links open browser or do nothing.
- Mismatched path params vs screen names.
- Not handling the case when the app is already open (`url` event).

## 🔗 Related

- [Expo/config.md](./Expo/config.md) — scheme config
- [backhandler.md](./backhandler.md) — Android back
- [notification.md](./notification.md) — notification deep links
- [request.md](./request.md) — API after open
