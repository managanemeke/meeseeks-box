# meeseeks-box

## developer

### configure

run powershell with admin rights...

#### approve execute

```shell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### install 7z

```powershell
winget install --id 7zip.7zip
```

#### add 7z to path

```powershell
setx /M path "%path%;C:\Program Files\7-Zip\"
```

#### install node

```powershell
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"
```

```shell
choco install nodejs-lts --version="22"
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
