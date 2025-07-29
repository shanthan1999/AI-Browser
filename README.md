# 🚀 Web Automation & Android Testing Suite

A comprehensive automation platform that combines browser automation with Android device testing, powered by MCP (Model Context Protocol) servers. This project provides a modern web interface, powerful automation capabilities, and extensive testing tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-%3E%3D16.0.0-brightgreen.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

## ✨ Features

### 🌐 Browser Automation (Browserbase)
- **Cloud Browser Control**: Control browsers in the cloud via Browserbase
- **Data Extraction**: Extract structured data from webpages
- **Web Interaction**: Navigate, click, and fill forms programmatically
- **Screenshots**: Capture full-page and element screenshots
- **Vision Support**: Use AI-powered vision for complex DOM interactions
- **Session Management**: Create, manage, and close browser sessions
- **Multi-Session**: Run multiple browser sessions in parallel
- **Stealth Mode**: Advanced stealth capabilities for web scraping

### 📱 Android Testing (Google ADK)
- **Device Management**: List and manage connected Android devices
- **App Installation**: Install and manage Android applications
- **Log Access**: Access device logs and debugging information
- **File Transfer**: Transfer files to and from Android devices
- **Screenshots**: Capture device screenshots
- **Device Info**: Get detailed device information
- **Automated Testing**: Run automated tests on Android devices

### 🎨 Modern Web Interface
- **Real-time Status**: Monitor API configurations and connections
- **Interactive Forms**: Easy-to-use forms for automation tasks
- **Responsive Design**: Works on desktop and mobile devices
- **Live Feedback**: Real-time status updates and results
- **Beautiful UI**: Modern gradient design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- Google API Key
- Browserbase API Key and Project ID
- Android SDK (for Android testing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/web-automation-android-suite.git
   cd web-automation-android-suite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.template .env
   # Edit .env with your API keys
   ```

4. **Run the setup script:**
   ```bash
   npm run setup
   ```

5. **Start the demo server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables (.env)
```env
# Google API Configuration
GOOGLE_API_KEY=your_google_api_key_here

# Browserbase Configuration
BROWSERBASE_API_KEY=your_browserbase_api_key_here
BROWSERBASE_PROJECT_ID=your_browserbase_project_id_here

# Gemini API Key (for advanced AI features)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Advanced Configuration
BROWSERBASE_CONTEXT_ID=your_context_id_here
BROWSERBASE_PROXY_ENABLED=false
BROWSERBASE_STEALTH_MODE=false
```

### MCP Configuration (mcp-config.json)
```json
{
  "mcpServers": {
    "browserbase": {
      "command": "npx",
      "args": ["@browserbasehq/mcp"],
      "env": {
        "BROWSERBASE_API_KEY": "${BROWSERBASE_API_KEY}",
        "BROWSERBASE_PROJECT_ID": "${BROWSERBASE_PROJECT_ID}",
        "GEMINI_API_KEY": "${GEMINI_API_KEY}"
      }
    },
    "google-adk": {
      "command": "npx",
      "args": ["@google/adk-mcp-server"],
      "env": {
        "GOOGLE_API_KEY": "${GOOGLE_API_KEY}"
      }
    }
  }
}
```

## 📚 Usage Examples

### Browser Automation

1. **Navigate and Screenshot:**
   ```javascript
   // Navigate to a website and take a screenshot
   const browser = new BrowserAutomation();
   await browser.navigate('https://google.com');
   await browser.takeScreenshot('google-homepage.png');
   ```

2. **Extract Data:**
   ```javascript
   // Extract product information from an e-commerce site
   const scraper = new WebScraper();
   const products = await scraper.scrapeEcommerceProducts('https://example-store.com');
   console.log(products);
   ```

3. **Fill Forms:**
   ```javascript
   // Automate form filling
   await browser.fillForm({
     'input[name="email"]': 'user@example.com',
     'input[name="password"]': 'password123'
   });
   ```

### Android Testing

1. **List Devices:**
   ```javascript
   const tester = new AndroidTester();
   const devices = await tester.getConnectedDevices();
   console.log(devices);
   ```

2. **Install App:**
   ```javascript
   await tester.selectDevice();
   await tester.installApp('./app.apk');
   ```

3. **Take Screenshot:**
   ```javascript
   await tester.takeScreenshot('device-screenshot.png');
   ```

## 🛠️ Available Scripts

```bash
# Setup and testing
npm run setup          # Run MCP setup script
npm run test           # Run comprehensive tests
npm run quick-test     # Run quick functionality test
npm run setup-cursor   # Setup for Cursor IDE

# Development
npm run dev            # Start demo server
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 📁 Project Structure

```
web-automation-android-suite/
├── 📄 README.md                 # This file
├── 📄 package.json              # Project dependencies and scripts
├── 📄 mcp-config.json          # MCP server configuration
├── 📄 .env.template            # Environment variables template
├── 📁 examples/                # Example scripts and demos
│   ├── 📄 demo-server.js       # Express demo server
│   ├── 📄 web-scraper.js       # Web scraping examples
│   └── 📄 android-tester.js    # Android testing examples
├── 📁 public/                  # Web interface files
│   └── 📄 index.html           # Main web interface
├── 📁 scripts/                 # PowerShell setup scripts
│   ├── 📄 setup-mcp.ps1        # MCP setup
│   ├── 📄 test-mcp.ps1         # MCP testing
│   └── 📄 quick-test.ps1       # Quick tests
└── 📁 docs/                    # Documentation
    ├── 📄 setup-guide.md       # Detailed setup guide
    └── 📄 troubleshooting.md    # Troubleshooting guide
```

## 🔑 Getting API Keys

### Google API Key
1. Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing one
3. Enable the APIs you need
4. Create credentials (API Key)
5. Copy the API key to your `.env` file

### Browserbase Credentials
1. Visit [Browserbase](https://browserbase.com)
2. Sign up for an account
3. Get your API key and project ID from the dashboard
4. Add them to your `.env` file

### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

## 🚨 Security Best Practices

- ✅ **Never commit API keys** to version control
- ✅ **Use environment variables** for sensitive data
- ✅ **Keep your `.env` file** in `.gitignore`
- ✅ **Use the `.env.template`** as a reference
- ✅ **Rotate API keys** regularly
- ✅ **Monitor usage** of your API keys

## 🐛 Troubleshooting

### Common Issues

1. **Browserbase API Key Error:**
   - Ensure your API key is correct
   - Check that your project ID is valid
   - Verify your Browserbase account is active

2. **Google ADK Connection Issues:**
   - Ensure Android device is connected via USB
   - Enable USB debugging on the device
   - Install ADB drivers if needed

3. **MCP Client Issues:**
   - Restart your MCP client after configuration changes
   - Check that the configuration JSON is valid
   - Verify all environment variables are set

### Getting Help

- 📖 [Browserbase Documentation](https://docs.browserbase.com)
- 📖 [MCP Specification](https://modelcontextprotocol.io)
- 📖 [Google ADK Documentation](https://developer.android.com/studio/command-line/adb)
- 🐛 [Create an Issue](https://github.com/yourusername/web-automation-android-suite/issues)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Browserbase](https://browserbase.com) for cloud browser automation
- [Google ADK](https://developer.android.com/studio/command-line/adb) for Android testing
- [MCP](https://modelcontextprotocol.io) for the protocol specification
- [Express.js](https://expressjs.com) for the web server
- [Font Awesome](https://fontawesome.com) for the icons

---

**Made with ❤️ for the automation community**