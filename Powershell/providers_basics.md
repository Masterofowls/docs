# Providers Basics

_PowerShell · Reference cheat sheet_

---

## 📋 Overview

**Providers** expose hierarchical data stores as if they were drives: the filesystem, registry, environment variables, certificates, and more. You navigate them with familiar cmdlets like `Set-Location` and `Get-ChildItem`.

## 🔧 Core concepts

| Provider / Drive | What it surfaces |
| --- | --- |
| `FileSystem` | Disks (`C:`, `/`) |
| `Env:` | Environment variables |
| `HKLM:` / `HKCU:` | Registry (Windows) |
| `Variable:` | PowerShell variables |
| `Alias:` | Command aliases |
| `Function:` | Functions |
| `Cert:` | Certificates (Windows) |

`Get-PSProvider` and `Get-PSDrive` list what is available.

## 💡 Examples

**List providers and drives:**

```powershell
Get-PSProvider
Get-PSDrive
```

**Environment drive:**

```powershell
Set-Location Env:
Get-ChildItem | Select-Object -First 10
Get-Content PATH
Set-Location $HOME
```

**Filesystem navigation (same cmdlets):**

```powershell
Set-Location $HOME
Get-ChildItem
New-Item -ItemType Directory -Path .\ps-practice -Force
```

**Aliases drive:**

```powershell
Get-ChildItem Alias: | Where-Object Name -EQ "ls"
```

## ⚠️ Pitfalls

- Registry edits can break Windows — practice read-only first (`Get-ChildItem HKCU:\...`).
- Not every provider supports every cmdlet the same way.
- Paths like `Env:\PATH` differ from Bash `$PATH` syntax.
- Leaving yourself in `Env:` or `HKCU:` confuses later relative paths — `cd $HOME` when done.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [aliases_basics.md](./aliases_basics.md)
- [get_help.md](./get_help.md)
- [variables.md](./variables.md)
