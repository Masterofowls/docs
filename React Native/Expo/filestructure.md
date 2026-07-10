# File structure

_Expo · Reference cheat sheet_

---

## 📋 Overview

Expo apps are mostly JS/TS under the project root (or `src/`), with config at the top level. Native `ios/` / `android/` appear after **prebuild** or in bare workflows; prefer Continuous Native Generation + plugins over hand-editing when possible.

## 🔧 Core concepts

- **Entry** — `package.json` `"main"` → `expo-router/entry` or `node_modules/expo/AppEntry.js`.
- **Router** — Expo Router uses `app/` file-based routes.
- **Assets** — `assets/` for icons, splash, fonts.
- **Config** — `app.config.ts`, `eas.json`, `babel.config.js`, `metro.config.js`.
- **Native** — generated `ios/`, `android/` (gitignore in managed CNG setups).

## 💡 Examples

```text
MyApp/
  app/                 # Expo Router screens
    _layout.tsx
    index.tsx
    settings.tsx
  assets/
    icon.png
    splash.png
  src/
    components/
    lib/
  app.config.ts
  eas.json
  package.json
  tsconfig.json
  # after prebuild:
  ios/
  android/
```

```json
// package.json (Router)
{
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios"
  }
}
```

## ⚠️ Pitfalls

- Committing generated native projects while also relying on prebuild — pick a workflow.
- Putting screens outside `app/` when using Expo Router without registering them.
- Huge `assets/` without compression → install size.

## 🔗 Related

- [config.md](./config.md) — app config
- [commands.md](./commands.md) — prebuild / start
- [plugins.md](./plugins.md) — native customization
- [build.md](./build.md) — CI builds
