# meeseeks-box

## developer

### configure

run powershell with admin rights...

#### approve execute

```shell
Set-ExecutionPolicy Bypass -Force
```

#### install 7z

```powershell
winget install --id 7zip.7zip
```

#### add 7z to path

```powershell
$oldPath = [Environment]::GetEnvironmentVariable('PATH', 'Machine')
$newPath = $oldPath + ';' + 'C:\Program Files\7-Zip\'
[Environment]::SetEnvironmentVariable('PATH', $newPath, 'Machine')
```

#### install node

```powershell
winget install --id=OpenJS.NodeJS -v "22.17.1" -e --source winget
```

#### check dependencies

```shell
node -v
```

```shell
npm -v
```

```powershell
(7z | Select-String -Pattern "7-Zip (\d+\.\d+)").Matches.Groups[1].Value
```

#### update npm to latest

```shell
npm install -g npm@latest
```

#### install node modules

```shell
npm install
```

#### define cep directory path

Set cep directory path inside [scripts/extract-zxp-locally.ps1](scripts/extract-zxp-locally.ps1)

```powershell
$cepDirectory = "C:\Program Files\Adobe\Adobe After Effects 2025\Support Files\Plug-ins\CEP"
```

### deploy locally

```shell
npm run deploy-locally
```

#### reload extension inside aeft

1. uncheck Window->Extensions->"Meeseeks Box"
2. check Window->Extensions->"Meeseeks Box"
