# SectionList

_React Native · Reference cheat sheet_

---

## 📋 Overview

`SectionList` is a virtualized list of sections, each with a title and `data` array. Use for alphabetical contacts, grouped settings, or day-bucketed feeds. Same performance rules as `FlatList`.

## 🔧 Core concepts

| Prop | Role |
| --- | --- |
| `sections` | `{ title, data }[]` |
| `renderItem` | Row |
| `renderSectionHeader` | Section title |
| `keyExtractor` | Item keys |
| `stickySectionHeadersEnabled` | Sticky headers (iOS default) |

Shape: `SectionListData<ItemT>`.

## 💡 Examples

```tsx
import { SectionList, Text, StyleSheet } from "react-native";

type Item = { id: string; name: string };
type Section = { title: string; data: Item[] };

export function Contacts({ sections }: { sections: Section[] }) {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text style={styles.row}>{item.name}</Text>}
      renderSectionHeader={({ section }) => (
        <Text style={styles.header}>{section.title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "700",
    padding: 8,
    backgroundColor: "#f2f2f2",
  },
  row: { padding: 12 },
});
```

## ⚠️ Pitfalls

- Empty `data` arrays still rendering awkward headers—filter sections.
- Unstable section object identities causing rerenders.
- Nesting inside ScrollView.
- Using SectionList for a single flat list—use FlatList.

## 🔗 Related

- [flatlist.md](./flatlist.md) — flat virtualization
- [scrollview.md](./scrollview.md) — short content
- [refresh_control.md](./refresh_control.md) — pull to refresh
- [styling.md](./styling.md) — headers
- [keys_lists](../React/keys_lists.md) — keys
