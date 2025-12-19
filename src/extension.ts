// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ProviderSettings, RooCodeAPI } from './roo-code';

// Output channel for logging profile information
let outputChannel: vscode.OutputChannel;

// Sensitive field patterns to mask in output
const SENSITIVE_PATTERNS = [
	/key$/i,
	/token$/i,
	/secret$/i,
	/password$/i,
	/credentials$/i,
];

/**
 * Masks sensitive values in provider settings
 */
function maskSensitiveValues(settings: ProviderSettings): Record<string, unknown> {
	const masked: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(settings)) {
		if (value === undefined) {
			continue;
		}
		const isSensitive = SENSITIVE_PATTERNS.some(pattern => pattern.test(key));
		masked[key] = isSensitive && typeof value === 'string' ? '***' : value;
	}
	return masked;
}

/**
 * Gets the Roo Code API if available
 */
async function getRooCodeAPI(): Promise<RooCodeAPI | undefined> {
	const rooExtension = vscode.extensions.getExtension<RooCodeAPI>('rooveterinaryinc.roo-cline');
	if (!rooExtension?.isActive) {
		vscode.window.showErrorMessage('Roo Extension is not activated');
		return undefined;
	}

	const api = rooExtension.exports;
	if (!api) {
		vscode.window.showErrorMessage('Roo API is not available');
		return undefined;
	}

	return api;
}

const humanProvider: ProviderSettings = {
	apiProvider: "human-relay"
};

const openRouterProvider: ProviderSettings = {
	apiProvider: "openrouter",
	openRouterApiKey: "FILL ME IN",
	openRouterModelId: "anthropic/claude-3.7-sonnet",
};

export function activate(context: vscode.ExtensionContext) {
	// Create output channel for logging
	outputChannel = vscode.window.createOutputChannel("Roo API Test");
	context.subscriptions.push(outputChannel);

	// Register configure-roo command
	const configureRooDisposable = vscode.commands.registerCommand('roo-api-test.configure-roo', async () => {
		const rooExtension = vscode.extensions.getExtension<RooCodeAPI>('rooveterinaryinc.roo-cline');
		if (!rooExtension?.isActive) {
			vscode.window.showInformationMessage('Roo Extension is not activated');
			return;
		}

		const api = rooExtension.exports;
		if (!api) {
			vscode.window.showInformationMessage('Roo API is not available');
			return;
		}

		const profileName = api.getActiveProfile();

		vscode.window.showInformationMessage(`Roo's active profile is ${profileName}`);

		await api.upsertProfile("human", humanProvider);
		await api.upsertProfile("or", openRouterProvider);

		const orSettings = await api.getProfile("or");
		console.log("provider settings for or", orSettings);

		vscode.window.showInformationMessage('updated roo');
	});

	// Register log-profiles command
	const logProfilesDisposable = vscode.commands.registerCommand('roo-api-test.log-profiles', async () => {
		const api = await getRooCodeAPI();
		if (!api) {
			return;
		}

		const timestamp = new Date().toISOString();
		const separator = '========================================';

		outputChannel.appendLine(separator);
		outputChannel.appendLine('Roo Code Profiles and Settings');
		outputChannel.appendLine(separator);
		outputChannel.appendLine(`Timestamp: ${timestamp}`);
		outputChannel.appendLine('');

		// Get all profiles
		const profiles = api.getProfiles();
		outputChannel.appendLine('All Profiles:');
		if (profiles.length === 0) {
			outputChannel.appendLine('  (no profiles configured)');
		} else {
			for (const profile of profiles) {
				outputChannel.appendLine(`  - ${profile}`);
			}
		}
		outputChannel.appendLine('');

		// Get active profile
		const activeProfileName = api.getActiveProfile();
		outputChannel.appendLine(`Active Profile: ${activeProfileName ?? '(none)'}`);
		outputChannel.appendLine('');

		// Get active profile settings if available
		if (activeProfileName) {
			try {
				const settings = await api.getProfile(activeProfileName);
				const maskedSettings = maskSensitiveValues(settings);
				outputChannel.appendLine('Active Profile Settings:');
				outputChannel.appendLine(JSON.stringify(maskedSettings, null, 2));
			} catch (error) {
				outputChannel.appendLine(`Error getting profile settings: ${error}`);
			}
		} else {
			outputChannel.appendLine('Active Profile Settings: N/A (no active profile)');
		}

		outputChannel.appendLine(separator);
		outputChannel.appendLine('');

		// Show the output channel
		outputChannel.show();

		vscode.window.showInformationMessage('Profile information logged to Output channel');
	});

	context.subscriptions.push(configureRooDisposable, logProfilesDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
