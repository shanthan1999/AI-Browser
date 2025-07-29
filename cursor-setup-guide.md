# Cursor MCP Server Setup Guide

## 🎯 Setup Steps for Browserbase MCP Server in Cursor

### Step 1: Locate Cursor's MCP Configuration File

**Windows:**
```
%APPDATA%\Cursor\User\globalStorage\cursor.mcp\mcp-config.json
```

**macOS:**
```
~/Library/Application Support/Cursor/User/globalStorage/cursor.mcp/mcp-config.json
```

**Linux:**
```
~/.config/Cursor/User/globalStorage/cursor.mcp/mcp-config.json
```

### Step 2: Create or Update MCP Configuration

1. **Open the MCP configuration file** in Cursor or your preferred editor
2. **Replace or add** the following configuration:

```json
{
  "mcpServers": {
    "browserbase": {
      "command": "npx",
      "args": ["@browserbasehq/mcp"],
      "env": {
        "BROWSERBASE_API_KEY": "bb_live_LZAV2LDuLqaj4EVAdE6FBufzXTU",
        "BROWSERBASE_PROJECT_ID": "b19c6a46-3132-4b9f-9d06-07fefdb565ec",
        "GEMINI_API_KEY": "AIzaSyBMsx5gxpulYYjJfoL3bejVoY2ueVVykjY"
      }
    }
  }
}
```

### Step 3: Alternative Setup Method (Recommended)

1. **Open Cursor**
2. **Go to Settings** (Ctrl/Cmd + ,)
3. **Search for "MCP"** in the settings search bar
4. **Find "MCP Servers"** section
5. **Add the Browserbase server configuration** manually

### Step 4: Verify Installation

1. **Restart Cursor** completely
2. **Open Command Palette** (Ctrl/Cmd + Shift + P)
3. **Type "MCP"** to see available MCP commands
4. **Check for Browserbase tools** in the command list

### Step 5: Test the Setup

1. **Open a new chat** in Cursor
2. **Try a browser automation command** like:
   ```
   Navigate to https://example.com and take a screenshot
   ```

### Troubleshooting

#### If MCP configuration file doesn't exist:
1. Create the directory structure:
   ```powershell
   # Windows
   mkdir -p "$env:APPDATA\Cursor\User\globalStorage\cursor.mcp"
   ```

2. Create the `mcp-config.json` file with the configuration above

#### If Browserbase MCP server isn't working:
1. **Check Node.js installation:**
   ```powershell
   node --version
   npm --version
   ```

2. **Install Browserbase MCP server globally:**
   ```powershell
   npm install -g @browserbasehq/mcp
   ```

3. **Verify installation:**
   ```powershell
   npx @browserbasehq/mcp --version
   ```

#### If you get permission errors:
1. **Run Cursor as Administrator** (Windows)
2. **Check file permissions** on the MCP configuration directory
3. **Ensure npm has proper permissions**

### Advanced Configuration Options

You can add additional flags to the Browserbase configuration:

```json
{
  "mcpServers": {
    "browserbase": {
      "command": "npx",
      "args": [
        "@browserbasehq/mcp",
        "--proxies",
        "--browserWidth", "1920",
        "--browserHeight", "1080"
      ],
      "env": {
        "BROWSERBASE_API_KEY": "bb_live_LZAV2LDuLqaj4EVAdE6FBufzXTU",
        "BROWSERBASE_PROJECT_ID": "b19c6a46-3132-4b9f-9d06-07fefdb565ec",
        "GEMINI_API_KEY": "AIzaSyBMsx5gxpulYYjJfoL3bejVoY2ueVVykjY"
      }
    }
  }
}
```

### Available Browserbase Flags:
- `--proxies`: Enable Browserbase proxies
- `--advancedStealth`: Enable advanced stealth (Scale Plan only)
- `--contextId <id>`: Specify Browserbase Context ID
- `--persist [boolean]`: Persist browser context (default: true)
- `--browserWidth <width>`: Browser viewport width (default: 1024)
- `--browserHeight <height>`: Browser viewport height (default: 768)
- `--modelName <model>`: AI model for Stagehand (default: google/gemini-2.0-flash)
- `--modelApiKey <key>`: API key for custom model provider

### Quick Test Commands

Once set up, try these commands in Cursor:

1. **Basic navigation:**
   ```
   Navigate to https://google.com and take a screenshot
   ```

2. **Data extraction:**
   ```
   Go to https://news.ycombinator.com and extract all article titles
   ```

3. **Form interaction:**
   ```
   Navigate to https://httpbin.org/forms/post and fill the form with test data
   ```

### Success Indicators

✅ **Setup is working if you can:**
- See Browserbase tools in Cursor's command palette
- Execute browser automation commands
- Get responses from the MCP server
- See screenshots or extracted data

❌ **Setup needs fixing if:**
- Commands return errors
- MCP server doesn't respond
- Browserbase tools don't appear in command palette

---

**Need help?** Check the [Browserbase MCP documentation](https://mcpservers.org/servers/browserbase/mcp-server-browserbase) for more details.