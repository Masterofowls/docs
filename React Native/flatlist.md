# FlatList

_React Native · Reference cheat sheet_

---

## 📋 Overview

`FlatList` efficiently renders long scrolling lists by virtualizing off-screen rows. Provide `data`, `renderItem`, and a stable `keyExtractor`. For sectioned data use `SectionList`; for very large lists consider FlashList.

## 🔧 Core concepts

| Prop | Role |
| --- | --- |
| `data` | Array of items |
| `renderItem` | Row renderer |
| `keyExtractor` | Stable keys |
| `ItemSeparatorComponent` | Dividers |
| `ListHeaderComponent` / `Footer` | Chrome |
| `onEndReached` | Infinite scroll |
| `refreshing` / `onRefresh` | Pull to refresh |
| `getItemLayout` | Skip measure if fixed height |
| `windowSize` / `initialNumToRender` | Tuning |

Avoid anonymous inline components that remount every parent render—extract `Row`.

## 💡 Examples

```tsx
import { FlatList, Text, View, StyleSheet } from "react-native";

type Item = { id: string; title: string };

export function Feed({ items }: { items: Item[] }) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text>{item.title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      onEndReachedThreshold={0.4}
      onEndReached={() => {
        /* load more */
      }}
    />
  );
}

const styles = StyleSheet.create({
  row: { padding: 16 },
  sep: { height: 1, backgroundColor: "#eee" },
});
```

## ⚠️ Pitfalls

- Using `ScrollView` + `.map` for huge lists.
- Inline `renderItem={() => ...}` creating new types + unstable handlers without care.
- Missing keys / using index when reordering.
- Nesting VirtualizedLists (FlatList inside ScrollView) without care.
- Heavy rows—memoize row components.

## 🔗 Related

- [sectionlist.md](./sectionlist.md) — sections
- [scrollview.md](./scrollview.md) — non-virtualized
- [refresh_control.md](./refresh_control.md) — pull to refresh
- [performance](../React/performance.md) — list perf
- [keys_lists](../React/keys_lists.md) — identity
