# Tables

_CSS · Reference cheat sheet_

---

## 📋 Overview

CSS table styling covers the table layout model (`display: table*` or real `<table>` markup) plus borders, spacing, and alignment of cells. Use semantic HTML tables for tabular data; use Grid/Flex for non-data layouts that merely look like tables. Modern CSS can make tables responsive with wrappers, `display` switches, or prioritized columns—but accessibility of real tables remains the priority.

Control fixed vs automatic layout with `table-layout`, and borders with `border-collapse`.

## 🔧 Core concepts

### Table-related properties

| Property | Role |
| --- | --- |
| `table-layout` | `auto` (content-based) \| `fixed` (equal/col widths more predictable) |
| `border-collapse` | `separate` \| `collapse` |
| `border-spacing` | Gap when `separate` |
| `empty-cells` | `show` \| `hide` |
| `caption-side` | `top` \| `bottom` \| logical variants where supported |
| `vertical-align` | Cell content alignment (`top`, `middle`, `baseline`) |

### Display values (for completeness)

`table`, `table-row`, `table-cell`, `table-column`, `table-column-group`, `table-header-group`, `table-footer-group`, `table-row-group`, `inline-table`. Prefer real elements (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`).

### Styling patterns

| Pattern | Technique |
| --- | --- |
| Zebra rows | `tbody tr:nth-child(even)` |
| Sticky header | `th { position: sticky; top: 0; }` inside overflow wrapper |
| Numeric columns | `font-variant-numeric: tabular-nums; text-align: end` |
| Compact density | Reduce cell padding tokens |

## 💡 Examples

### Clean data table

```css
.table {
  inline-size: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.table th,
.table td {
  padding: 0.625rem 0.75rem;
  border-block-end: 1px solid color-mix(in oklab, CanvasText 12%, transparent);
  text-align: start;
}

.table th {
  font-weight: 600;
  background: color-mix(in oklab, CanvasText 4%, Canvas);
}

.table tbody tr:nth-child(even) {
  background: color-mix(in oklab, CanvasText 3%, Canvas);
}

.table .num {
  text-align: end;
  font-variant-numeric: tabular-nums;
}
```

### Fixed layout for predictable columns

```css
.table--fixed {
  table-layout: fixed;
}

.table--fixed th:nth-child(1) { width: 40%; }
.table--fixed th:nth-child(2) { width: 30%; }
.table--fixed th:nth-child(3) { width: 30%; }

.table--fixed td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### Scroll wrapper with sticky head

```css
.table-scroll {
  max-block-size: 20rem;
  overflow: auto;
}

.table-scroll th {
  position: sticky;
  inset-block-start: 0;
  z-index: 1;
  background: Canvas;
}
```

### Caption

```css
.table caption {
  caption-side: bottom;
  padding-block: 0.5rem;
  color: color-mix(in oklab, CanvasText 65%, transparent);
  text-align: start;
}
```

## ⚠️ Pitfalls

- Building “tables” from divs for data, losing row/column semantics for assistive tech.
- Mixing `border-collapse: collapse` with `border-radius` expectations—radius often won’t apply as on separate boxes.
- Letting wide tables overflow the viewport without a scroll wrapper or responsive strategy.
- Sticky headers failing because a parent uses `overflow: hidden`.
- Aligning numbers to the start, which makes columns hard to scan—use end alignment + tabular nums.

## 🔗 Related

- [Text](text.md)
- [Scroll](scroll.md)
- [CSS Grid](grid.md)
- [Fonts](font.md)
