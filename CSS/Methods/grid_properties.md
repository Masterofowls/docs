# Grid Properties

_CSS · Methods reference_

---

## 📋 Overview

CSS Grid container and item properties including subgrid.

## 🔧 Methods

### Container

| Property | Description |
| --- | --- |
| `display: grid | inline-grid` | Grid formatting context |
| `grid-template-columns` / `rows` | Track sizes (fr, minmax, repeat) |
| `grid-template-areas` | Named area layout |
| `grid-template` | Shorthand for above |
| `grid-auto-columns` / `auto-rows` | Implicit track sizes |
| `grid-auto-flow` | row | column | dense |
| `gap` / `row-gap` / `column-gap` | Grid gutters |
| `justify-items` / `align-items` | Align items in cells |
| `justify-content` / `align-content` | Align grid in container |
| `place-items` / `place-content` | Shorthands |

### Items

| Property | Description |
| --- | --- |
| `grid-column` / `grid-row` | Placement (start / span) |
| `grid-area` | Named area or row/col shorthand |
| `justify-self` / `align-self` | Single cell alignment |
| `grid-template-rows: subgrid` | Inherit parent tracks (subgrid) |

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return `None` in Python — do not chain `sort()` / `reverse()` expecting a new list.
- Default JS `sort()` compares strings — pass `(a,b) => a-b` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django `QuerySet.update()` skips `save()` signals and auto `auto_now` fields on models.

## 🔗 Related

- [Grid](../grid.md)
- [Subgrid](../subgrid.md)
