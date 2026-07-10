# Loops

_PowerShell · Reference cheat sheet_

---

## 📋 Overview

PowerShell provides `foreach`, `for`, `while`, `do/while`, `do/until`, and pipeline-oriented `ForEach-Object`. Prefer streaming pipelines for large collections; use `foreach` statements when you need `break`/`continue` with clearer scopes.

## 🔧 Core concepts

| Loop | Use |
| --- | --- |
| `foreach ($x in $coll)` | Iterate collection |
| `ForEach-Object` | Pipeline iteration |
| `for (;;) / for ($i=0; …)` | Index loops |
| `while` / `do` | Condition-driven |
| `break` / `continue` | Control flow |
| `return` | Exit function (not just loop) |

`%` is an alias for `ForEach-Object`; `?` for `Where-Object`. In scripts, prefer full names.

## 💡 Examples

**foreach vs pipeline:**

```powershell
foreach ($f in Get-ChildItem .\logs -File) {
  if ($f.Length -eq 0) { continue }
  $f.FullName
}

Get-ChildItem .\logs -File | ForEach-Object {
  $_.Name.ToUpper()
}
```

**for / while:**

```powershell
for ($i = 0; $i -lt 3; $i++) { $i }

$n = 0
while ($n -lt 3) { $n++; $n }
```

**do/until:**

```powershell
do {
  $r = Get-Random -Maximum 5
} until ($r -eq 0)
```

**Parallel (PS 7+):**

```powershell
1..5 | ForEach-Object -Parallel {
  Start-Sleep -Seconds 1
  $_
} -ThrottleLimit 3
```

## ⚠️ Pitfalls

- `return` inside `ForEach-Object` acts like `continue` for the scriptblock in some mental models—actually it exits the scriptblock only; use carefully inside functions.
- Modifying a collection while enumerating it throws—copy first or collect changes.
- `foreach ($x in Get-ChildItem -Recurse)` can be huge; filter early.
- Pipeline `ForEach-Object -Parallel` has session/state limits—avoid shared mutable state.
- `$foreach` automatic variable exists inside `foreach` statements—don’t overwrite casually.
- Prefer `Where-Object` before heavy `ForEach-Object` work.

## 🔗 Related

- [pipeline.md](./pipeline.md)
- [conditionals.md](./conditionals.md)
- [functions.md](./functions.md)
- [jobs.md](./jobs.md)
- [objects.md](./objects.md)
