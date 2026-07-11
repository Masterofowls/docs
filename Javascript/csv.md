# CSV

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

CSV is comma-separated text (RFC 4180–style). JavaScript has no built-in CSV parser. For simple rows you can split carefully; for real data use a library such as **Papa Parse** (browser/Node) or **csv-parse** / **csv-stringify** (Node streams).

## 🔧 Core concepts

- **Rows / fields**: lines of records; fields separated by `,` (or `;`, `\t`).
- **Quoting**: fields with commas/newlines wrap in `"`; `""` escapes a quote.
- **Header row**: optional first line of column names.
- **Manual parse**: fine for trusted, simple files without embedded commas.
- **Libraries**: Papa Parse (`Papa.parse` / `Papa.unparse`); Node `csv-parse` + `csv-stringify`.

## 💡 Examples

```js
// Manual — only if no commas inside fields
function parseSimpleCsv(text) {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(","));
}

function toSimpleCsv(rows) {
  return rows.map((r) => r.join(",")).join("\n");
}

const rows = parseSimpleCsv("name,age\nAda,36\n");
```

```js
// Escape a field for RFC-ish output
function csvField(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function rowsToCsv(rows) {
  return rows.map((row) => row.map(csvField).join(",")).join("\n");
}
```

```js
// Papa Parse (npm: papaparse)
import Papa from "papaparse";

const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
// parsed.data → array of objects
const out = Papa.unparse(parsed.data);
```

```js
// Node csv-parse (npm: csv-parse)
import { parse } from "csv-parse/sync";
import { readFile } from "node:fs/promises";

const input = await readFile("data.csv", "utf8");
const records = parse(input, { columns: true, skip_empty_lines: true });
```

## ⚠️ Pitfalls

- Naïve `split(",")` breaks on quoted commas and newlines inside fields.
- Locale exports may use `;` as separator — do not assume `,`.
- Excel often expects UTF-8 BOM for Unicode; add `\uFEFF` when needed.
- Large files: prefer streaming parsers (`csv-parse` stream API), not full-string parse.
- Type coercion: CSV is all strings until you convert numbers/dates yourself.

## 🔗 Related

- [JSON](json.md) — structured alternative to CSV
- [fs](fs.md) — read/write CSV files in Node
- [Strings](strings.md) — split / replace helpers
- [Async](async.md) — async file + parse flows
- [fetch](fetch.md) — download CSV over HTTP
