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

export function activate(context: vscode.ExtensionContext) {
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

	const randomNumberDisposable = vscode.commands.registerCommand('roo-api-test.random-number', () => {
		const randomNumber = Math.floor(Math.random() * 101); // 0 to 100 inclusive
		vscode.window.showInformationMessage(`Random number: ${randomNumber}`);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(randomNumberDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
