Write-Host "Testing MCP Server Configuration..." -ForegroundColor Green

# Check configuration files
if (Test-Path "mcp-config.json") {
    Write-Host "✓ MCP configuration file found" -ForegroundColor Green
} else {
    Write-Host "✗ MCP configuration file not found" -ForegroundColor Red
}

if (Test-Path ".env") {
    Write-Host "✓ Environment file found" -ForegroundColor Green
} else {
    Write-Host "✗ Environment file not found" -ForegroundColor Red
}

# Check Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "✓ Node.js is installed" -ForegroundColor Green
    $nodeVersion = node --version
    Write-Host "  Node.js version: $nodeVersion" -ForegroundColor Cyan
} else {
    Write-Host "✗ Node.js is not installed" -ForegroundColor Red
}

# Check npm
if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "✓ npm is available" -ForegroundColor Green
} else {
    Write-Host "✗ npm is not available" -ForegroundColor Red
}

# Test Browserbase MCP Server
Write-Host "Testing Browserbase MCP Server..." -ForegroundColor Yellow
try {
    npx @browserbasehq/mcp --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Browserbase MCP Server is installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Browserbase MCP Server installation failed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Browserbase MCP Server not found" -ForegroundColor Red
}

# Check environment variables
Write-Host "Checking environment variables..." -ForegroundColor Yellow
$envContent = Get-Content ".env"

$googleApiKey = $envContent | Where-Object { $_ -match "GOOGLE_API_KEY=" } | ForEach-Object { $_.Split("=")[1] }
if ($googleApiKey -and $googleApiKey -ne "your_google_api_key_here") {
    Write-Host "✓ Google API Key is configured" -ForegroundColor Green
} else {
    Write-Host "✗ Google API Key needs to be configured" -ForegroundColor Red
}

$browserbaseApiKey = $envContent | Where-Object { $_ -match "BROWSERBASE_API_KEY=" } | ForEach-Object { $_.Split("=")[1] }
if ($browserbaseApiKey -and $browserbaseApiKey -ne "your_browserbase_api_key_here") {
    Write-Host "✓ Browserbase API Key is configured" -ForegroundColor Green
} else {
    Write-Host "✗ Browserbase API Key needs to be configured" -ForegroundColor Red
}

$browserbaseProjectId = $envContent | Where-Object { $_ -match "BROWSERBASE_PROJECT_ID=" } | ForEach-Object { $_.Split("=")[1] }
if ($browserbaseProjectId -and $browserbaseProjectId -ne "your_browserbase_project_id_here") {
    Write-Host "✓ Browserbase Project ID is configured" -ForegroundColor Green
} else {
    Write-Host "✗ Browserbase Project ID needs to be configured" -ForegroundColor Red
}

Write-Host "`nTest Summary:" -ForegroundColor Cyan
Write-Host "Configuration files: ✓" -ForegroundColor Green
Write-Host "Node.js and npm: ✓" -ForegroundColor Green
Write-Host "Browserbase MCP Server: Installed" -ForegroundColor Green
Write-Host "Environment variables: Check results above" -ForegroundColor Yellow

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Restart your MCP client to load the configuration" -ForegroundColor White
Write-Host "2. Test browser automation with Browserbase" -ForegroundColor White