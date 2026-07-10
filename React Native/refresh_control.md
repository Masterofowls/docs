# RefreshControl

_React Native · Reference cheat sheet_

---

## 📋 Overview

`RefreshControl` adds pull-to-refresh to `ScrollView` or `FlatList`. Drive it with controlled `refreshing` boolean and `onRefresh` that loads data then clears the flag.

## 🔧 Core concepts

- **`refreshing`** — spinner visibility.
- **`onRefresh`** — start async reload.
- **Colors** — `tintColor` (iOS), `colors` (Android).
- **Progress view** — Android `progressViewOffset`.
- **Pair** — often with React Query `refetch`.

## 💡 Examples

```tsx
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text } from "react-native";

export function Feed({
  items,
  reload,
}: {
  items: { id: string; title: string }[];
  reload: () => Promise<void>;
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await reload();
    } finally {
      setRefreshing(false);
    }
  }, [reload]);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
```

## ⚠️ Pitfalls

- Leaving `refreshing` true on error—use `try/finally`.
- Triggering refresh on mount unintentionally.
- Nested scrollables fighting the gesture.
- Not awaiting the fetch before clearing state.

## 🔗 Related

- [flatlist.md](./flatlist.md) — lists
- [scrollview.md](./scrollview.md) — scroll
- [networking.md](./networking.md) — fetch
- [request.md](./request.md) — HTTP helpers
- [activity_indicator.md](./activity_indicator.md) — spinners
