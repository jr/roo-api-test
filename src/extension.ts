// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ProviderSettings, RooCodeAPI } from './roo-code';
import { TokenManager } from './token-monitor';

const humanProvider: ProviderSettings = {
	apiProvider: "human-relay"
};

const openRouterProvider: ProviderSettings = {
	apiProvider: "openrouter",
	openRouterApiKey: "FILL ME IN",
	openRouterModelId: "anthropic/claude-3.7-sonnet",
};

let tokenManager: TokenManager | undefined;

export function activate(context: vscode.ExtensionContext) {
	// Initialize token manager
	tokenManager = new TokenManager();

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

	// Register token monitoring commands
	const startMonitor = vscode.commands.registerCommand(
		'roo-api-test.start-token-monitor',
		async () => {
			const rooExtension = vscode.extensions.getExtension<RooCodeAPI>(
				'rooveterinaryinc.roo-cline'
			);

			if (!rooExtension?.isActive) {
				vscode.window.showErrorMessage('Roo Code extension is not active');
				return;
			}

			const api = rooExtension.exports;
			if (!api) {
				vscode.window.showErrorMessage('Roo Code API is not available');
				return;
			}

			tokenManager?.startMonitoring(api);
			vscode.window.showInformationMessage('Token monitoring started');
		}
	);

	const stopMonitor = vscode.commands.registerCommand(
		'roo-api-test.stop-token-monitor',
		() => {
			tokenManager?.stopMonitoring();
			vscode.window.showInformationMessage('Token monitoring stopped');
		}
	);

	const showSummary = vscode.commands.registerCommand(
		'roo-api-test.show-token-summary',
		() => {
			tokenManager?.showSessionSummary();
		}
	);

	const clearData = vscode.commands.registerCommand(
		'roo-api-test.clear-token-data',
		() => {
			tokenManager?.clearSession();
			vscode.window.showInformationMessage('Token usage data cleared');
		}
	);

	context.subscriptions.push(
		disposable,
		startMonitor,
		stopMonitor,
		showSummary,
		clearData
	);
}

// This method is called when your extension is deactivated
export function deactivate() {
	tokenManager?.dispose();
}
