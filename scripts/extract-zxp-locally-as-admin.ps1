$scriptPath = Join-Path -Path $PSScriptRoot -ChildPath "extract-zxp-locally.ps1"

if (-not (Test-Path $scriptPath)) {
    Write-Host "Error: File $scriptPath not found" -ForegroundColor Red
    exit 1
}

Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy Bypass -File `"$scriptPath`"" -Verb RunAs
