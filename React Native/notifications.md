# Notifications

_React Native · Reference cheat sheet_

---

## 📋 Overview

Local and push notifications alert users outside the app UI. On Expo, use `expo-notifications`; bare RN often uses Firebase / Notifee.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Permissions | Request before scheduling |
| Local | Scheduled on-device |
| Push | Remote via FCM/APNs |
| Handlers | Foreground / response listeners |

## 💡 Examples

```tsx
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
```

```tsx
await Notifications.scheduleNotificationAsync({
  content: { title: 'Reminder', body: 'Ship the docs' },
  trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5 },
});
```

## ⚠️ Pitfalls

- iOS requires explicit permission; Android 13+ needs POST_NOTIFICATIONS.
- Don’t assume push tokens are stable forever.
- Handle notification taps to deep-link into the right screen.

## 🔗 Related

- [deep_linking](deep_linking.md)
- [launcher_shortcut_menu](launcher_shortcut_menu.md)
- [getting_started](getting_started.md)
