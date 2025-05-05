Set-Location -Path ($PSScriptRoot)

$cepDirectory = "C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\Plug-ins\CEP"
$appDomain = "com.meeseeks-box.cep"
$sourceArchivePath = "..\dist\zxp"
$sevenZip = "7z"

$archiveName = "$appDomain.zxp"

$sourceArchive = Join-Path (Join-Path (Get-Location) $sourceArchivePath) $archiveName
$destinationArchive = Join-Path $cepDirectory $archiveName
$targetDirectory = Join-Path $cepDirectory $appDomain

if (-not (Get-Command $sevenZip -ErrorAction SilentlyContinue)) {
    Write-Host "Error: 7-Zip command '$sevenZip' not found in PATH"
    exit 1
}

if (-not (Test-Path $sourceArchive)) {
    Write-Host "Error: File $sourceArchive not found" -ForegroundColor Red
    exit 1
}

Copy-Item -Path $sourceArchive -Destination $destinationArchive -Force
Write-Host "Success: Copied $sourceArchive to $destinationArchive" -ForegroundColor Green

if (Test-Path $targetDirectory) {
    Remove-Item -Recurse -Force $targetDirectory
    Write-Host "Warning: Deleted old version at $targetDirectory" -ForegroundColor Yellow
}

& "$sevenZip" -o"`"$targetDirectory`"" x "`"$destinationArchive`""

if ($LASTEXITCODE -eq 0) {
    Write-Host "Success: Extension unpacked to $targetDirectory" -ForegroundColor Green
} else {
    Write-Host "Error: Failed to unpack using 7-Zip." -ForegroundColor Red
}
