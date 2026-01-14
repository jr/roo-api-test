# Roo API Test

A VS Code extension for testing and demonstrating the Roo Code extension API. This extension provides examples of how to programmatically interact with Roo Code's API to configure profiles, manage settings, and integrate AI capabilities into your own extensions.

## Overview

This extension demonstrates how to:
- Access the Roo Code extension API
- Create and manage API configuration profiles
- Configure different AI providers (Anthropic, OpenRouter, etc.)
- Get and set the active profile
- Interact with Roo Code programmatically

## Prerequisites

Before using this extension, you must have:
- [Roo Code](https://marketplace.visualstudio.com/items?itemName=rooveterinaryinc.roo-cline) extension installed and activated
- VS Code version 1.99.1 or higher

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/jr/roo-api-test.git
   cd roo-api-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the extension:
   ```bash
   npm run compile
   ```

4. Press `F5` in VS Code to launch the Extension Development Host

## Usage

Once installed, you can test the Roo Code API:

1. Open the Command Palette (`Cmd+Shift+P` on macOS or `Ctrl+Shift+P` on Windows/Linux)
2. Run the command: `Configure Roo Code`
3. The extension will:
   - Display the current active profile
   - Create/update two example profiles:
     - `human`: Uses the human-relay provider
     - `or`: Uses OpenRouter with Claude 3.7 Sonnet
   - Show a confirmation message

## API Examples

### Accessing the Roo Code API

```typescript
import * as vscode from 'vscode';
import { RooCodeAPI } from './roo-code';

const rooExtension = vscode.extensions.getExtension<RooCodeAPI>('rooveterinaryinc.roo-cline');
if (rooExtension?.isActive) {
    const api = rooExtension.exports;
    // Use the API...
}
```

### Creating/Updating Profiles

```typescript
import { ProviderSettings } from './roo-code';

// Human relay provider
const humanProvider: ProviderSettings = {
    apiProvider: "human-relay"
};

await api.upsertProfile("human", humanProvider);

// OpenRouter provider
const openRouterProvider: ProviderSettings = {
    apiProvider: "openrouter",
    openRouterApiKey: "YOUR_API_KEY",
    openRouterModelId: "anthropic/claude-3.7-sonnet",
};

await api.upsertProfile("my-openrouter", openRouterProvider);
```

### Getting Profile Information

```typescript
// Get the active profile name
const profileName = api.getActiveProfile();

// Get a specific profile's settings
const settings = await api.getProfile("my-openrouter");
console.log("Provider settings:", settings);

// Get all profile names
const profiles = api.getProfiles();
console.log("Available profiles:", profiles);
```

### Switching Profiles

```typescript
await api.setActiveProfile("my-openrouter");
```

## Supported Providers

The Roo Code API supports many AI providers including:

- **anthropic** - Anthropic Claude API
- **openrouter** - OpenRouter (access to multiple models)
- **bedrock** - AWS Bedrock
- **vertex** - Google Vertex AI
- **openai** - OpenAI API
- **ollama** - Local Ollama models
- **gemini** - Google Gemini
- **mistral** - Mistral AI
- **deepseek** - DeepSeek
- **xai** - xAI (Grok)
- **groq** - Groq
- **human-relay** - Human-in-the-loop testing
- And many more...

See [`src/roo-code.d.ts`](./src/roo-code.d.ts) for the complete TypeScript definitions and available configuration options.

## Development

### Project Structure

```
roo-api-test/
├── src/
│   ├── extension.ts      # Main extension code
│   ├── roo-code.d.ts     # TypeScript definitions for Roo Code API
│   └── test/             # Test files
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Available Scripts

- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run pretest` - Compile and lint before testing

### Building

To build the extension:

```bash
npm run compile
```

The compiled output will be in the `out/` directory.

### Testing

Run the test suite:

```bash
npm test
```

## Configuration

To use the OpenRouter example, edit [`src/extension.ts`](./src/extension.ts) and add your API key:

```typescript
const openRouterProvider: ProviderSettings = {
    apiProvider: "openrouter",
    openRouterApiKey: "YOUR_OPENROUTER_API_KEY", // Replace with your key
    openRouterModelId: "anthropic/claude-3.7-sonnet",
};
```

## API Reference

For complete API documentation, see the TypeScript definitions in [`src/roo-code.d.ts`](./src/roo-code.d.ts), which includes:

- `RooCodeAPI` - Main API interface
- `ProviderSettings` - Configuration for AI providers
- `GlobalSettings` - Global Roo Code settings
- `RooCodeEvents` - Event system for monitoring tasks
- Type definitions for messages, tokens, and more

## Contributing

Contributions are welcome! This is a test extension primarily for demonstrating the Roo Code API, but improvements to documentation and examples are appreciated.

## License

See the repository for license information.

## Resources

- [Roo Code Extension](https://marketplace.visualstudio.com/items?itemName=rooveterinaryinc.roo-cline)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript](https://www.typescriptlang.org/)
