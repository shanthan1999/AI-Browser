# MCP Server Setup Script for Google ADK and Browserbase
# This script installs and configures both MCP servers

Write-Host "Setting up Google ADK and Browserbase MCP Servers..." -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is available
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm is not available. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install Browserbase MCP Server
Write-Host "Installing Browserbase MCP Server..." -ForegroundColor Yellow
npm install -g @browserbasehq/mcp

# Install Google ADK MCP Server (if available)
Write-Host "Installing Google ADK MCP Server..." -ForegroundColor Yellow
npm install -g @google/adk-mcp-server

# Create environment file for Browserbase
Write-Host "Creating environment configuration..." -ForegroundColor Yellow

# Check if .env file exists and update it
if (Test-Path ".env") {
    Write-Host ".env file already exists. Please add your Browserbase credentials:" -ForegroundColor Cyan
    Write-Host "BROWSERBASE_API_KEY=your_browserbase_api_key" -ForegroundColor Cyan
    Write-Host "BROWSERBASE_PROJECT_ID=your_browserbase_project_id" -ForegroundColor Cyan
} else {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
GOOGLE_API_KEY=AIzaSyBMsx5gxpulYYjJfoL3bejVoY2ueVVykjY
BROWSERBASE_API_KEY=your_browserbase_api_key_here
BROWSERBASE_PROJECT_ID=your_browserbase_project_id_here
"@ | Out-File -FilePath ".env" -Encoding UTF8
}

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Get your Browserbase API key from https://browserbase.com" -ForegroundColor White
Write-Host "2. Update the .env file with your Browserbase credentials" -ForegroundColor White
Write-Host "3. Update mcp-config.json with your Browserbase credentials" -ForegroundColor White
Write-Host "4. Restart your MCP client to load the new configuration" -ForegroundColor White