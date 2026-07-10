# Pipeline

_PowerShell · Reference cheat sheet_

---

## 📋 Overview

The PowerShell pipeline passes **objects** (not text) between commands. ByValue and ByPropertyName binding decide how properties map to the next cmdlet’s parameters. Use `ForEach-Object`, `Where-Object`, and `Select-Object` as the core filters.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `\|` | Send objects downstream |
| ByValue | Entire object matches parameter type |
| ByPropertyName | Property name matches parameter name |
| `$_` / `$PSItem` | Current pipeline object |
| `ForEach-Object` (`%`) | Per-object script |
| `Where-Object` (`?`) | Filter |
| `Select-Object` | Project / expand properties |
| `Tee-Object` | Copy to variable/file and continue |

Begin/Process/End blocks in advanced functions enable true streaming.

## 💡 Examples

**Filter and project:**

```powershell
Get-ChildItem .\logs -File |
  Where-Object { $_.Length -gt 1MB } |
  Select-Object Name, Length, LastWriteTime |
  Sort-Object Length -Descending
```

**ForEach and Tee:**

```powershell
Get-Service |
  Where-Object Status -eq 'Running' |
  ForEach-Object { $_.Name } |
  Tee-Object -Variable names
```

**Property binding:**

```powershell
# Stop-Process binds -Id ByPropertyName
Get-Process notepad -ErrorAction SilentlyContinue |
  Stop-Process -WhatIf
```

**Collect vs stream:**

```powershell
# Parentheses collect all output first
(Get-ChildItem -Recurse).Count
```

## ⚠️ Pitfalls

- Wrapping a pipeline in `(…)` buffers everything—can exhaust memory on large sets.
- Native executables receive text; format may break object pipelines.
- `Format-*` cmdlets emit formatting objects—don’t pipe them to exporters; use `Select-Object` first.
- `ForEach-Object` vs `foreach` statement: the statement doesn’t stream in the same way.
- Nulls in the pipeline can surprise `-eq` filters; be explicit.
- Pipeline-bound parameters need correct attributes in custom functions.

## 🔗 Related

- [cmdlets.md](./cmdlets.md)
- [objects.md](./objects.md)
- [loops.md](./loops.md)
- [functions.md](./functions.md)
- [vs_bash.md](./vs_bash.md)
