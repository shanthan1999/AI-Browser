# Test script for Google ADK and Browserbase MCP Servers
# This script verifies the configuration and connectivity

Write-Host "Testing MCP Server Configuration..." -ForegroundColor Green

# Check if configuration files exist
if (Test-Path "mcp-config.json") {
    Write-Host "✓ MCP configuration file found" -ForegroundColor Green
} else {
    Write-Host "✗ MCP configuration file not found" -ForegroundColor Red
    exit 1
}

# Check if .env file exists
if (Test-Path ".env") {
    Write-Host "✓ Environment file found" -ForegroundColor Green
} else {
    Write-Host "✗ Environment file not found" -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "✓ Node.js is installed" -ForegroundColor Green
    $nodeVersion = node --version
    Write-Host "  Node.js version: $nodeVersion" -ForegroundColor Cyan
} else {
    Write-Host "✗ Node.js is not installed" -ForegroundColor Red
    exit 1
}

# Check if npm is available
if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "✓ npm is available" -ForegroundColor Green
} else {
    Write-Host "✗ npm is not available" -ForegroundColor Red
    exit 1
}

# Test Browserbase MCP Server installation
Write-Host "Testing Browserbase MCP Server..." -ForegroundColor Yellow
try {
    $browserbaseVersion = npx @browserbasehq/mcp --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Browserbase MCP Server is installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Browserbase MCP Server installation failed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Browserbase MCP Server not found. Run: npm install -g @browserbasehq/mcp" -ForegroundColor Red
}

# Test Google ADK MCP Server installation
Write-Host "Testing Google ADK MCP Server..." -ForegroundColor Yellow
try {
    $adkVersion = npx @google/adk-mcp-server --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Google ADK MCP Server is installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Google ADK MCP Server installation failed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Google ADK MCP Server not found. Run: npm install -g @google/adk-mcp-server" -ForegroundColor Red
}

# Check environment variables
Write-Host "Checking environment variables..." -ForegroundColor Yellow
$envContent = Get-Content ".env"
$googleApiKey = $envContent | Where-Object { $_ -match "GOOGLE_API_KEY=" } | ForEach-Object { $_.Split("=")[1] }
$browserbaseApiKey = $envContent | Where-Object { $_ -match "BROWSERBASE_API_KEY=" } | ForEach-Object { $_.Split("=")[1] }
$browserbaseProjectId = $envContent | Where-Object { $_ -match "BROWSERBASE_PROJECT_ID=" } | ForEach-Object { $_.Split("=")[1] }

if ($googleApiKey -and $googleApiKey -ne "your_google_api_key_here") {
    Write-Host "✓ Google API Key is configured" -ForegroundColor Green
} else {
    Write-Host "✗ Google API Key needs to be configured" -ForegroundColor Red
}

if ($browserbaseApiKey -and $browserbaseApiKey -ne "your_browserbase_api_key_here") {
    Write-Host "✓ Browserbase API Key is configured" -ForegroundColor Green
} else {
    Write-Host "✗ Browserbase API Key needs to be configured" -ForegroundColor Red
}

if ($browserbaseProjectId -and $browserbaseProjectId -ne "your_browserbase_project_id_here") {
    Write-Host "✓ Browserbase Project ID is configured" -ForegroundColor Green
} else {
    Write-Host "✗ Browserbase Project ID needs to be configured" -ForegroundColor Red
}

Write-Host "`nTest Summary:" -ForegroundColor Cyan
Write-Host "1. Configuration files: ✓" -ForegroundColor Green
Write-Host "2. Node.js and npm: ✓" -ForegroundColor Green
Write-Host "3. MCP Servers: Check individual results above" -ForegroundColor Yellow
Write-Host "4. Environment variables: Check individual results above" -ForegroundColor Yellow

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Get your Browserbase credentials from https://browserbase.com" -ForegroundColor White
Write-Host "2. Update the .env file with your actual credentials" -ForegroundColor White
Write-Host "3. Update mcp-config.json with your Browserbase credentials" -ForegroundColor White
Write-Host "4. Restart your MCP client to load the configuration" -ForegroundColor White