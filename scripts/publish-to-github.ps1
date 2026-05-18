# Usage (run in project root; do NOT paste token in chat):
#   $env:GH_TOKEN = "ghp_xxxxxxxx"
#   .\scripts\publish-to-github.ps1
#
# Or: .\scripts\publish-to-github.ps1 -Token "ghp_xxxxxxxx"

param(
  [string]$Token = $env:GH_TOKEN,
  [string]$RepoName = "consult-pollution",
  [ValidateSet("public", "private")]
  [string]$Visibility = "public"
)

$ErrorActionPreference = "Stop"
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;C:\Program Files\nodejs;" + $env:Path

Set-Location (Resolve-Path (Join-Path $PSScriptRoot ".."))

if (-not $Token) {
  Write-Host "GH_TOKEN is not set. Create a token at https://github.com/settings/tokens"
  Write-Host "Scopes: repo (classic) OR fine-grained: Contents + Metadata (read/write)"
  exit 1
}

$Token | gh auth login --with-token
gh auth status

git branch -M main 2>$null

$exists = gh repo view $RepoName 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Host "Repository $RepoName already exists. Pushing..."
  git remote remove origin 2>$null
  gh repo sync 2>$null
  $remote = (gh repo view $RepoName --json url -q .url)
  git remote add origin "$remote.git"
} else {
  gh repo create $RepoName `
    --$Visibility `
    --source . `
    --remote origin `
    --description "Mass-produced consultant pollution diagnosis quiz (Next.js)" `
    --push
}

git push -u origin main
Write-Host ""
Write-Host "Done. Repository:"
gh repo view $RepoName --web 2>$null
gh repo view $RepoName --json url -q .url
