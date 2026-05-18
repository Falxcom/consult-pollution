# Run AFTER AdSense approval. Example:
#   .\scripts\set-adsense-vercel.ps1 -Client "ca-pub-XXXX" -SlotTop "123" -SlotResult "456"

param(
  [Parameter(Mandatory = $true)][string]$Client,
  [Parameter(Mandatory = $true)][string]$SlotTop,
  [Parameter(Mandatory = $true)][string]$SlotResult
)

$ErrorActionPreference = "Stop"
$env:Path = "C:\Program Files\nodejs;" + $env:Path
Set-Location (Resolve-Path (Join-Path $PSScriptRoot ".."))

$Client | npx vercel@latest env add NEXT_PUBLIC_ADSENSE_CLIENT production --yes
$SlotTop | npx vercel@latest env add NEXT_PUBLIC_AD_SLOT_TOP production --yes
$SlotResult | npx vercel@latest env add NEXT_PUBLIC_AD_SLOT_RESULT production --yes

$pub = "pub-$($Client.Replace('ca-pub-',''))"
$pub | npx vercel@latest env add ADSENSE_PUBLISHER_ID production --yes

npx vercel@latest deploy --prod --yes
Write-Host "Done. Check https://consult-pollution.vercel.app"
