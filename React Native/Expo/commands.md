# Commands

_Expo · Reference cheat sheet_

---

## 📋 Overview

Day-to-day Expo CLI / EAS commands for local dev, prebuild, installs, and cloud builds. Prefer `npx expo` / `npx eas-cli` for pinned versions.

## 🔧 Core concepts

- **Dev server** — `npx expo start` (tunnel / LAN / USB).
- **Platform run** — `npx expo run:android` / `run:ios` (dev client / bare).
- **Install** — `npx expo install <pkg>` aligns SDK-compatible versions.
- **Prebuild** — `npx expo prebuild` generates `ios/` / `android/`.
- **EAS** — `eas build`, `eas submit`, `eas update`, `eas credentials`.

## 💡 Examples

```bash
# Create & run
npx create-expo-app@latest MyApp
cd MyApp
npx expo start
npx expo start --tunnel

# Dependency aligned to SDK
npx expo install react-native-reanimated expo-secure-store

# Native projects + local run
npx expo prebuild
npx expo run:android
npx expo run:ios

# EAS
npx eas-cli build -p all --profile preview
npx eas-cli update --branch production --message "Fix crash"
npx eas-cli credentials
```

```bash
# Doctor / info
npx expo-doctor
npx expo config --type public
```

## ⚠️ Pitfalls

- `npm install` of Expo modules without `expo install` → version mismatches.
- Editing native folders then running prebuild without a strategy → overwrites (use plugins / CNG).
- Confusing Expo Go limits with what a **dev client** build can do.

## 🔗 Related

- [build.md](./build.md) — EAS Build
- [config.md](./config.md) — configuration
- [filestructure.md](./filestructure.md) — project layout
- [plugins.md](./plugins.md) — native config
