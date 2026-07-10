# PowerShell vs Bash

_PowerShell · Reference cheat sheet_

---

## 📋 Overview

Bash pipelines text; PowerShell pipelines objects. Bash is ubiquitous on Unix; PowerShell is cross-platform (pwsh) with deep .NET integration. Choose based on environment and data shape—many teams use both.

## 🔧 Core concepts

| Topic | Bash | PowerShell |
| --- | --- | --- |
| Pipeline | Text streams | Objects |
| Variables | `$x`, strings | `$x`, typed objects |
| Compare | `[[ ]]`, `=` | `-eq`, `-lt`, … |
| Errors | Exit codes | Error records + exit codes |
| Lists | Arrays / IFS | Object collections |
| JSON | `jq` | `ConvertFrom-Json` |
| Common filter | `grep`/`awk` | `Where-Object` / `Select-String` |
| Script ext | `.sh` | `.ps1` |

Interop: call bash from pwsh and vice versa when tools are installed.

## 💡 Examples

**Same task:**

```bash
# bash
ls -1 *.log | wc -l
cat file.json | jq '.name'
```

```powershell
# PowerShell
@(Get-ChildItem *.log).Count
(Get-Content -Raw file.json | ConvertFrom-Json).name
```

**Call the other shell:**

```powershell
bash -lc 'grep -R TODO .'
```

```bash
pwsh -NoProfile -Command 'Get-ChildItem | Select-Object Name'
```

**Environment vars:**

```bash
export PORT=8080
```

```powershell
$env:PORT = '8080'
```

## ⚠️ Pitfalls

- Assuming `curl` means the same thing (alias vs binary) across shells.
- Quoting rules differ—don’t paste bash snippets into PowerShell unchanged.
- Exit codes: bash `set -e` vs PowerShell `$ErrorActionPreference`.
- Line endings and shebangs matter when sharing scripts across OSes.
- Performance: spawning many external processes from either shell is costly—batch work.
- Object formatting in PowerShell can look like “broken text” when piped to bash tools—convert explicitly.

## 🔗 Related

- [pipeline.md](./pipeline.md)
- [variables.md](./variables.md)
- [useful_commands.md](./useful_commands.md)
- [scripting.md](./scripting.md)
- [cmdlets.md](./cmdlets.md)
