# Table

_HTML · Reference cheat sheet_

---

## 📋 Overview

The `<table>` element represents **tabular data**—information arranged in rows and columns. Use tables for data relationships, not for page layout (CSS Grid/Flexbox replaced that anti-pattern). Accessible tables need captions, clear headers, and `scope` (or explicit `headers` IDs) so assistive technologies can announce cell context.

Core pieces: `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`, plus `<colgroup>` / `<col>` for column styling.

## 🔧 Core concepts

### Basic structure

```html
<table>
  <caption>Quarterly revenue (USD thousands)</caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>40</td>
    </tr>
    <tr>
      <th scope="row">Q2</th>
      <td>55</td>
    </tr>
  </tbody>
</table>
```

### Header cells and scope

| `scope` | Meaning |
|---------|---------|
| `col` | Header for the column |
| `row` | Header for the row |
| `colgroup` | Header for a column group |
| `rowgroup` | Header for a row group |

Complex tables may use `headers="id1 id2"` on `<td>` pointing to `id`s on `<th>`.

### Sections

- `<thead>` — column labels (can repeat when printing).
- `<tbody>` — main data (multiple allowed).
- `<tfoot>` — summaries; may appear before `tbody` in markup for streaming, still rendered at bottom in some cases—follow current HTML guidance and test.

### Spanning

- `colspan` — extend across columns
- `rowspan` — extend across rows  
Keep spans minimal; they complicate a11y and responsive redesigns.

### When not to use tables

Layout grids, email-only legacy layouts (sometimes unavoidable), and simple key/value pairs (consider `<dl>`) should not force data-table semantics.

## 💡 Examples

### Table with footer totals

```html
<table>
  <caption>Hardware inventory</caption>
  <thead>
    <tr>
      <th scope="col">Item</th>
      <th scope="col">Qty</th>
      <th scope="col">Unit price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Keyboard</th>
      <td>12</td>
      <td>40</td>
    </tr>
    <tr>
      <th scope="row">Mouse</th>
      <td>20</td>
      <td>25</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total units</th>
      <td colspan="2">32</td>
    </tr>
  </tfoot>
</table>
```

### Irregular headers with `headers`

```html
<table>
  <caption>Exam scores</caption>
  <tr>
    <td></td>
    <th id="mid" scope="col">Midterm</th>
    <th id="fin" scope="col">Final</th>
  </tr>
  <tr>
    <th id="ada" scope="row">Ada</th>
    <td headers="ada mid">92</td>
    <td headers="ada fin">88</td>
  </tr>
</table>
```

### Scrollable responsive wrapper

```html
<div class="table-scroll" tabindex="0" role="region" aria-label="Revenue table">
  <table>…</table>
</div>
```

```css
.table-scroll { overflow-x: auto; max-width: 100%; }
```

### Sortable header button (progressive)

```html
<th scope="col">
  <button type="button" aria-label="Sort by name ascending">
    Name
  </button>
</th>
```

Keep the `<th>` semantics; enhance with script without replacing the table with divs.

## ⚠️ Pitfalls

- **Layout tables** — Break reflow, reading order, and CSS flexibility.
- **Missing caption / headers** — Screen readers announce raw grids without context.
- **Only bold text as headers** — Use `<th>`, not styled `<td>`.
- **Empty header cells** — Provide meaningful labels or `abbr`.
- **Too many spans** — Hard to navigate linearly.
- **Clickable rows without keyboard support** — Prefer links/buttons inside cells.
- **CSS `display` changes** — Altering table `display` can destroy a11y mappings in some browsers—test.

## 🔗 Related

- [List](list.md) — alternative for non-tabular sets
- [Section](section.md) — wrapping data sections
- [Div](div.md) — scroll wrappers
- [Form](form.md) — inputs inside table cells
- [Input](input.md) — editable grids
- [Canvas](canvas.md) — charts vs data tables (provide both)
- [Style](style.md) — table layout CSS
