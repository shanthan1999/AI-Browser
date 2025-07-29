# Browserbase MCP Server Troubleshooting Guide

## 🔍 Issue: MCP Server Running but Prompts Not Working

### ✅ Configuration Status
- **MCP Config File:** ✅ Found at `C:\Users\mihir\.cursor\mcp.json`
- **Browserbase API Key:** ✅ Configured
- **Project ID:** ✅ Configured
- **Google API Key:** ✅ Configured

### 🛠️ Troubleshooting Steps

#### Step 1: Verify MCP Server Installation
```powershell
npx @browserbasehq/mcp --version
```
**Expected Output:** `Version 2.0.0`

#### Step 2: Check Cursor MCP Settings
1. **Open Cursor Settings** (`Ctrl + ,`)
2. **Search for "MCP"**
3. **Verify MCP is enabled**
4. **Check if Browserbase appears in the MCP servers list**

#### Step 3: Test MCP Server Connection
1. **Open Command Palette** (`Ctrl + Shift + P`)
2. **Type "MCP"** to see available commands
3. **Look for Browserbase-related commands**

#### Step 4: Check Cursor Logs
1. **Open Developer Tools** (`Ctrl + Shift + I`)
2. **Go to Console tab**
3. **Look for MCP-related errors**

#### Step 5: Test with Different Prompts

Try these exact prompts in Cursor's chat:

**Basic Navigation:**
```
Navigate to https://google.com and take a screenshot
```

**Data Extraction:**
```
Go to https://news.ycombinator.com and extract all article titles
```

**Simple Command:**
```
Take a screenshot of https://example.com
```

### 🔧 Common Issues and Solutions

#### Issue 1: "Command not found" errors
**Solution:**
```powershell
npm install -g @browserbasehq/mcp
```

#### Issue 2: API Key errors
**Solution:** Verify your API key is active at https://browserbase.com

#### Issue 3: MCP server not responding
**Solution:**
1. Restart Cursor completely
2. Check if Node.js is properly installed
3. Verify network connectivity

#### Issue 4: Permission errors
**Solution:**
1. Run Cursor as Administrator
2. Check npm permissions

### 🎯 How to Test Properly

1. **Open a new chat** in Cursor
2. **Type the command exactly** as shown above
3. **Wait for response** - it may take a few seconds
4. **Check for error messages** in the response

### 📋 Debugging Commands

Run these in PowerShell to verify setup:

```powershell
# Check Node.js
node --version

# Check npm
npm --version

# Check Browserbase MCP
npx @browserbasehq/mcp --version

# Check configuration
Get-Content "$env:USERPROFILE\.cursor\mcp.json"
```

### 🚨 If Still Not Working

1. **Check Cursor version** - ensure you're using the latest version
2. **Try a different MCP client** to isolate the issue
3. **Contact Browserbase support** if API issues persist
4. **Check Cursor's MCP documentation** for specific requirements

### 📞 Next Steps

If the above doesn't work:
1. Share any error messages you see
2. Try the debugging commands above
3. Check if other MCP servers work in Cursor
4. Consider reinstalling the Browserbase MCP server

---

**Configuration File Location:** `C:\Users\mihir\.cursor\mcp.json`
**API Key:** `bb_live_LZAV2LDuLqaj4EVAdE6FBufzXTU`
**Project ID:** `b19c6a46-3132-4b9f-9d06-07fefdb565ec`