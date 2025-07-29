const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/status', (req, res) => {
  const status = {
    browserbase: {
      apiKey: process.env.BROWSERBASE_API_KEY ? 'Configured' : 'Not configured',
      projectId: process.env.BROWSERBASE_PROJECT_ID ? 'Configured' : 'Not configured'
    },
    google: {
      apiKey: process.env.GOOGLE_API_KEY ? 'Configured' : 'Not configured'
    },
    gemini: {
      apiKey: process.env.GEMINI_API_KEY ? 'Configured' : 'Not configured'
    }
  };
  res.json(status);
});

app.post('/api/automation/browser', async (req, res) => {
  try {
    const { action, url, selector } = req.body;
    
    // This would integrate with the actual MCP servers
    // For demo purposes, we'll return a mock response
    const result = {
      success: true,
      action: action,
      url: url,
      timestamp: new Date().toISOString(),
      message: `Successfully performed ${action} on ${url}`
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/automation/android', async (req, res) => {
  try {
    const { action, deviceId } = req.body;
    
    const result = {
      success: true,
      action: action,
      deviceId: deviceId,
      timestamp: new Date().toISOString(),
      message: `Successfully performed ${action} on device ${deviceId}`
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Web Automation Suite Demo Server running on http://localhost:${PORT}`);
  console.log(`📊 Status API: http://localhost:${PORT}/api/status`);
  console.log(`🔧 Make sure to configure your .env file with your API keys!`);
});