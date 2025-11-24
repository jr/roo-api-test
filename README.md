# Roo API Test Extension

A VS Code extension for testing and monitoring the Roo Code extension API.

## Features

- **Configure Roo Code**: Set up API profiles for different providers
- **Ping Roo Extension**: Test connectivity and retrieve status information
- **Status Bar Indicator**: Real-time status display of Roo extension
- **Detailed Diagnostics**: Output channel with comprehensive logs
- **JSON Export**: Export ping results for automation and debugging

## Commands

### Configure Roo Code
Sets up API configuration profiles for the Roo extension.

**Usage:**
- Command Palette: `Roo Test: Configure Roo Code`

### Ping Roo Extension
Tests the connection and status of the Roo extension with comprehensive diagnostics.

**Usage:**
- Command Palette: `Roo Test: Ping Roo Extension`
- Keyboard Shortcut: `Ctrl+Shift+P, Ctrl+Shift+R` (Mac: `Cmd+Shift+P, Cmd+Shift+R`)
- Status Bar: Click the Roo status indicator

**Response includes:**
- Extension installation status and version
- API availability and readiness
- Active profile and configuration
- Available profiles list
- Task stack information
- Enabled capabilities (MCP, Browser tools, etc.)
- Language and telemetry settings

**Output Options:**
- Quick notification with summary
- Detailed output channel view (`Roo API Test` channel)
- JSON export for automation

### Quick Ping (Silent)
Performs a silent ping that only updates the status bar indicator.

**Usage:**
- Command Palette: `Roo Test: Quick Ping (Silent)`
- Automatically runs on extension activation

## Status Bar

The extension adds a status bar item that shows the current Roo extension status:
- 🟢 Active and ready
- 🟡 Not ready
- ⚠️ Installed but inactive
- ❌ Not installed or error

Click the status bar item to run a full ping diagnostic.

## Output Channel

View detailed logs in the `Roo API Test` output channel:
1. Open Output panel (`View > Output`)
2. Select `Roo API Test` from the dropdown

## Development

This extension is designed for testing and debugging the Roo Code extension API integration.

### Requirements
- VS Code version 1.99.1 or higher
- Roo Code extension (`rooveterinaryinc.roo-cline`)

### Building
```bash
npm install
npm run compile
```

### Testing
```bash
npm test
```