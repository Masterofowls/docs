# Get-Help

_PowerShell · Reference cheat sheet_

---

## 📋 Overview

`Get-Help` is the built-in manual for cmdlets, functions, and about topics. Learning to read help is faster than memorizing every parameter. Update help once so examples are available offline.

## 🔧 Core concepts

| Command | Purpose |
| --- | --- |
| `Get-Help Name` | Show help for a command |
| `Get-Help Name -Examples` | Example-focused view |
| `Get-Help Name -Full` | Complete help |
| `Get-Help Name -Online` | Open web docs |
| `Update-Help` | Download latest help files |
| `Get-Command` | Find commands by name/pattern |

Tab completion and `Get-Command *Item*` pair well with help.

## 💡 Examples

**Basic help:**

```powershell
Get-Help Get-ChildItem
Get-Help Get-ChildItem -Examples
Get-Help Get-ChildItem -Parameter Filter
```

**Discover commands then read help:**

```powershell
Get-Command *process*
Get-Help Get-Process -Full
```

**About topics (concepts):**

```powershell
Get-Help about_Pipelines
Get-Help about_Variables
Get-Help about_* | Select-Object -First 10
```

**Update help (may need admin for some scopes):**

```powershell
Update-Help -ErrorAction SilentlyContinue
```

## ⚠️ Pitfalls

- Fresh installs often have *minimal* help until `Update-Help` runs.
- Help for third-party modules only appears after the module is installed/imported.
- `-Online` needs a browser and network.
- Alias help: `Get-Help ls` works, but learning `Get-ChildItem` is clearer long-term.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [hello_world.md](./hello_world.md)
- [aliases_basics.md](./aliases_basics.md)
- [cmdlets.md](./cmdlets.md)
