# Cmdlets

_PowerShell · Reference cheat sheet_

---

## 📋 Overview

Cmdlets are PowerShell’s native commands: Verb-Noun names, structured objects as output, and common parameters (`-ErrorAction`, `-WhatIf`, …). Discover them with `Get-Command`, learn them with `Get-Help`, and inspect objects with `Get-Member`.

## 🔧 Core concepts

| Idea | Detail |
| --- | --- |
| Naming | Approved verbs: `Get`, `Set`, `New`, `Remove`, `Add`, … |
| Discovery | `Get-Command *item*`, `Get-Alias` |
| Help | `Get-Help cmd -Full`, `Update-Help` |
| Members | `Get-Member` / `gm` |
| Common params | `-Verbose`, `-Debug`, `-ErrorAction`, `-WhatIf`, `-Confirm` |
| Parameters | Positional or named; tab-completion helps |
| Modules | Cmdlets ship in modules (`Get-Module -ListAvailable`) |

Aliases (`gci` → `Get-ChildItem`) are fine interactively; prefer full names in scripts.

## 💡 Examples

**Discover and inspect:**

```powershell
Get-Command -Noun Process
Get-Help Get-Process -Examples
Get-Process | Get-Member
Get-Process pwsh | Select-Object Name, Id, CPU
```

**Common parameters:**

```powershell
Remove-Item .\tmp\* -Recurse -WhatIf
Copy-Item .\a.txt .\b.txt -ErrorAction Stop
Get-ChildItem -Verbose
```

**Approved verb pattern (advanced function):**

```powershell
function Get-Something {
  [CmdletBinding()]
  param([string]$Name)
  process { "Hello $Name" }
}
```

## ⚠️ Pitfalls

- External programs return strings/exit codes—not objects—unless you parse them.
- Aliases differ across platforms; scripts should use canonical cmdlet names.
- `-Confirm` / `-WhatIf` only work when the command supports `SupportsShouldProcess`.
- Parameter binding errors often mean pipeline input type mismatch—check `Get-Help -Parameter`.
- `curl` / `wget` may be aliases to `Invoke-WebRequest` on Windows PowerShell 5.1.
- Don’t assume Linux binaries exist in Windows PowerShell sessions.

## 🔗 Related

- [pipeline.md](./pipeline.md)
- [objects.md](./objects.md)
- [modules.md](./modules.md)
- [useful_commands.md](./useful_commands.md)
- [scripting.md](./scripting.md)
