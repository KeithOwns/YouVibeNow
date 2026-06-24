<#
.SYNOPSIS
Initializes the Vibe Coding global baseline.

.DESCRIPTION
This script establishes Tier 1 of the 3-Tier Hierarchy by automatically creating
the global AI configuration files (GEMINI.md or CLAUDE.md) in the user's home directory.
It ensures that the "Always backup files" safety rule is globally enforced.
#>

$host.UI.RawUI.WindowTitle = "YouVibeNow - Global Initialization"
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " YouVibeNow: Global Baseline Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "This script will establish your Application-Level safety baseline."

$choice = Read-Host "Which AI interface are you primarily using? (1 for Gemini/Antigravity, 2 for Claude Code)"

$globalRule = @"
# Global Safety Baseline

- **File Integrity:** NEVER modify or overwrite a local file without first backing it up to the `Archive/` directory.
"@

if ($choice -eq '1') {
    $targetDir = Join-Path $HOME ".gemini"
    $targetFile = Join-Path $targetDir "GEMINI.md"
} elseif ($choice -eq '2') {
    $targetDir = Join-Path $HOME ".claude"
    $targetFile = Join-Path $targetDir "CLAUDE.md"
} else {
    Write-Host "Invalid choice. Exiting." -ForegroundColor Red
    exit
}

if (-Not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

if (Test-Path $targetFile) {
    Write-Host "Warning: $targetFile already exists. Appending rule instead of overwriting." -ForegroundColor Yellow
    Add-Content -Path $targetFile -Value "`n$globalRule"
} else {
    Set-Content -Path $targetFile -Value $globalRule
    Write-Host "Success! Created global baseline at: $targetFile" -ForegroundColor Green
}

Write-Host "Tier 1 Initialization Complete. You are ready to Vibe Code." -ForegroundColor Cyan
Pause
