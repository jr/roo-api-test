// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ProviderSettings, RooCodeAPI } from './roo-code';

const humanProvider: ProviderSettings = {
	apiProvider: "human-relay"
};

const openRouterProvider: ProviderSettings = {
	apiProvider: "openrouter",
	openRouterApiKey: "FILL ME IN",
	openRouterModelId: "anthropic/claude-3.7-sonnet",
};

// Create output channel for detailed logs
const outputChannel = vscode.window.createOutputChannel('Roo API Test');

// Status bar item for quick status display
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	// Create status bar item
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'roo-api-test.ping-roo';
	context.subscriptions.push(statusBarItem);
	
	// Existing configure command
	const disposable = vscode.commands.registerCommand('roo-api-test.configure-roo', async () => {
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

	// Enhanced ping command with multiple output options
	const pingDisposable = vscode.commands.registerCommand('roo-api-test.ping-roo', async () => {
		outputChannel.clear();
		outputChannel.appendLine('=== Roo Extension Ping ===');
		outputChannel.appendLine(`Timestamp: ${new Date().toISOString()}`);
		outputChannel.appendLine('');
		
		try {
			const rooExtension = vscode.extensions.getExtension<RooCodeAPI>('rooveterinaryinc.roo-cline');
			
			if (!rooExtension) {
				const message = '❌ Roo Extension is not installed';
				vscode.window.showErrorMessage(message);
				outputChannel.appendLine(message);
				updateStatusBar('Not Installed', '❌');
				return;
			}
			
			const extensionVersion = rooExtension.packageJSON.version;
			const extensionId = rooExtension.id;
			
			outputChannel.appendLine(`Extension ID: ${extensionId}`);
			outputChannel.appendLine(`Extension Version: ${extensionVersion}`);
			
			if (!rooExtension.isActive) {
				const message = `⚠️ Roo Extension v${extensionVersion} is installed but not active`;
				vscode.window.showWarningMessage(message);
				outputChannel.appendLine(message);
				updateStatusBar('Inactive', '⚠️');
				
				// Optionally try to activate it
				const activate = await vscode.window.showInformationMessage(
					'Would you like to activate the Roo extension?',
					'Yes', 'No'
				);
				
				if (activate === 'Yes') {
					await rooExtension.activate();
					vscode.window.showInformationMessage('Roo extension activated. Please run ping again.');
				}
				return;
			}
			
			const api = rooExtension.exports;
			if (!api) {
				const message = '❌ Roo API is not available';
				vscode.window.showErrorMessage(message);
				outputChannel.appendLine(message);
				updateStatusBar('API Error', '❌');
				return;
			}
			
			// Gather comprehensive status information
			const isReady = api.isReady();
			const activeProfile = api.getActiveProfile();
			const configuration = api.getConfiguration();
			const taskStack = api.getCurrentTaskStack();
			const profiles = api.getProfiles();
			
			// Build detailed ping response
			const pingResponse = {
				timestamp: new Date().toISOString(),
				status: 'active',
				version: extensionVersion,
				extensionId: extensionId,
				api: {
					isReady: isReady,
					activeProfile: activeProfile || 'none',
					availableProfiles: profiles,
					profileCount: profiles.length
				},
				configuration: {
					apiProvider: configuration.apiProvider || 'not configured',
					modelId: configuration.apiModelId ||
							 configuration.openAiModelId ||
							 configuration.ollamaModelId ||
							 configuration.geminiApiKey ? 'gemini' : 'default',
					hasApiKey: !!(configuration.apiKey ||
								 configuration.openAiApiKey ||
								 configuration.openRouterApiKey ||
								 configuration.geminiApiKey),
					customInstructions: configuration.customInstructions ? 'configured' : 'none',
					language: configuration.language || 'en'
				},
				tasks: {
					activeTaskCount: taskStack.length,
					taskIds: taskStack
				},
				capabilities: {
					mcpEnabled: configuration.mcpEnabled || false,
					browserToolEnabled: configuration.browserToolEnabled || false,
					diffEnabled: configuration.diffEnabled !== false,
					telemetry: configuration.telemetrySetting || 'unset'
				}
			};
			
			// Log to output channel
			outputChannel.appendLine('Ping Response:');
			outputChannel.appendLine(JSON.stringify(pingResponse, null, 2));
			
			// Update status bar
			updateStatusBar(`v${extensionVersion} ✅`, '🟢');
			
			// Show user-friendly message with options
			const selection = await vscode.window.showInformationMessage(
				`✅ Roo Extension Active (v${extensionVersion}) | Profile: ${pingResponse.api.activeProfile} | Provider: ${pingResponse.configuration.apiProvider}`,
				'View Details',
				'Export JSON',
				'OK'
			);
			
			if (selection === 'View Details') {
				outputChannel.show();
			} else if (selection === 'Export JSON') {
				await exportPingResults(pingResponse);
			}
			
			// Log to console for debugging
			console.log('Roo Ping Response:', pingResponse);
			
		} catch (error: any) {
			const message = `❌ Ping failed: ${error.message || error}`;
			vscode.window.showErrorMessage(message);
			outputChannel.appendLine(message);
			outputChannel.appendLine(`Stack trace: ${error.stack}`);
			updateStatusBar('Error', '❌');
			console.error('Roo ping error:', error);
		}
	});
	
	// Quick ping command (silent, just updates status bar)
	const quickPingDisposable = vscode.commands.registerCommand('roo-api-test.quick-ping', async () => {
		try {
			const rooExtension = vscode.extensions.getExtension<RooCodeAPI>('rooveterinaryinc.roo-cline');
			if (!rooExtension) {
				updateStatusBar('Not Installed', '❌');
			} else if (!rooExtension.isActive) {
				updateStatusBar('Inactive', '⚠️');
			} else if (!rooExtension.exports || !rooExtension.exports.isReady()) {
				updateStatusBar('Not Ready', '🟡');
			} else {
				const version = rooExtension.packageJSON.version;
				updateStatusBar(`v${version}`, '🟢');
			}
		} catch (error) {
			updateStatusBar('Error', '❌');
		}
	});
	
	context.subscriptions.push(disposable, pingDisposable, quickPingDisposable);
	
	// Run quick ping on activation
	vscode.commands.executeCommand('roo-api-test.quick-ping');
}

function updateStatusBar(text: string, icon: string) {
	statusBarItem.text = `${icon} Roo: ${text}`;
	statusBarItem.tooltip = `Click to ping Roo extension\nStatus: ${text}`;
	statusBarItem.show();
}

async function exportPingResults(pingResponse: any) {
	const uri = await vscode.window.showSaveDialog({
		defaultUri: vscode.Uri.file('roo-ping-results.json'),
		filters: { 'JSON': ['json'] }
	});
	
	if (uri) {
		const content = JSON.stringify(pingResponse, null, 2);
		await vscode.workspace.fs.writeFile(uri, Buffer.from(content, 'utf8'));
		vscode.window.showInformationMessage(`Ping results exported to ${uri.fsPath}`);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	if (statusBarItem) {
		statusBarItem.dispose();
	}
	if (outputChannel) {
		outputChannel.dispose();
	}
}
