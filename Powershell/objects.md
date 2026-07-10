# Objects

_PowerShell · Reference cheat sheet_

---

## 📋 Overview

Almost everything in PowerShell is a .NET object with properties and methods. Pipelines pass objects; formatting is a display concern. Use `Select-Object`, `Add-Member`, and custom `PSCustomObject` for shaping data.

## 🔧 Core concepts

| Tool | Use |
| --- | --- |
| `Get-Member` | Discover properties/methods |
| `.Property` | Access property |
| `.Method()` | Call method |
| `Select-Object` | Calculated properties |
| `[pscustomobject]@{…}` | Ad-hoc objects |
| `ConvertTo-Json` | Serialize |
| ETS | Extended type system / adapters |

Common types: `String`, `Int32`, `DateTime`, `Hashtable`, `Array`, `PSCustomObject`, file/process/service objects from cmdlets.

## 💡 Examples

**Inspect and select:**

```powershell
Get-ChildItem | Get-Member -MemberType Property
Get-Process |
  Select-Object Name, Id, @{N='MemMB';E={[math]::Round($_.WS/1MB,1)}}
```

**Create objects:**

```powershell
$user = [pscustomobject]@{
  Name = 'Ada'
  Roles = @('admin', 'dev')
}
$user | Add-Member -NotePropertyName Active -NotePropertyValue $true
```

**Hashtable vs object:**

```powershell
$map = @{ a = 1; b = 2 }          # unordered dictionary
$obj = [pscustomobject]$map       # note: key order may vary pre-PS6
```

**Methods:**

```powershell
'hello'.ToUpper()
(Get-Date).AddDays(7)
```

## ⚠️ Pitfalls

- Hashtables are not `PSCustomObject`—property access and JSON shape differ.
- `Format-Table` output is not the original object—don’t pipe formats to `Export-Csv`.
- Value types vs references: arrays/hashtables are reference-like when passed around.
- `Select-Object -ExpandProperty` unwraps; without it you get objects with one property.
- Comparing objects with `-eq` often compares references or limited members—compare properties explicitly.
- Remote/serialized objects may be “deserialized” (methods stripped)—check `Get-Member`.

## 🔗 Related

- [pipeline.md](./pipeline.md)
- [json_csv.md](./json_csv.md)
- [cmdlets.md](./cmdlets.md)
- [variables.md](./variables.md)
- [remoting.md](./remoting.md)
