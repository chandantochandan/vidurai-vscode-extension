/**
 * Vidurai VS Code Extension
 * Main entry point
 */
import * as vscode from 'vscode';
import { PythonBridge } from './pythonBridge';
import { StatusBarManager } from './statusBar';
import { ensureVidurai } from './installer';
import { log, getConfig, getOutputChannel } from './utils';

let bridge: PythonBridge | null = null;
let statusBar: StatusBarManager | null = null;

/**
 * Extension activation
 */
export async function activate(context: vscode.ExtensionContext) {
    log('info', 'Vidurai extension activating...');

    // Check if first run
    const isFirstRun = !context.globalState.get('vidurai.hasRun');

    if (isFirstRun) {
        await showWelcome(context);
    }

    // Check if enabled
    const enabled = getConfig('enabled', true);
    if (!enabled) {
        log('info', 'Vidurai is disabled in settings');
        return;
    }

    try {
        // Ensure Python and Vidurai are installed
        const pythonPath = await ensureVidurai();

        // Start Python bridge
        bridge = new PythonBridge(pythonPath, context.extensionPath);
        await bridge.start();

        // Start status bar
        statusBar = new StatusBarManager(bridge);
        statusBar.startUpdates();

        // Register commands
        registerCommands(context);

        // Register event handlers (Phase 3+)
        // TODO: File watchers, terminal watchers

        log('info', 'Vidurai extension activated successfully');

    } catch (error: any) {
        log('error', `Activation failed: ${error.message}`);

        vscode.window.showWarningMessage(
            `⚠️ Vidurai failed to start: ${error.message}`,
            'View Logs',
            'Disable Extension'
        ).then(choice => {
            if (choice === 'View Logs') {
                getOutputChannel().show();
            } else if (choice === 'Disable Extension') {
                vscode.workspace.getConfiguration('vidurai').update('enabled', false, true);
            }
        });
    }
}

/**
 * Extension deactivation
 */
export function deactivate() {
    log('info', 'Vidurai extension deactivating...');

    if (bridge) {
        bridge.stop();
        bridge = null;
    }

    if (statusBar) {
        statusBar.dispose();
        statusBar = null;
    }
}

/**
 * Show welcome message on first run
 */
async function showWelcome(context: vscode.ExtensionContext) {
    const choice = await vscode.window.showInformationMessage(
        '👋 Welcome to Vidurai! Set up intelligent AI memory management?',
        'Quick Setup',
        'Manual Setup',
        'Later'
    );

    if (choice === 'Quick Setup') {
        // Quick setup handled by ensureVidurai()
        context.globalState.update('vidurai.hasRun', true);
    } else if (choice === 'Manual Setup') {
        vscode.env.openExternal(vscode.Uri.parse('https://docs.vidurai.ai/setup'));
        context.globalState.update('vidurai.hasRun', true);
    }
}

/**
 * Register commands
 */
function registerCommands(context: vscode.ExtensionContext) {
    // Command: Copy Context
    context.subscriptions.push(
        vscode.commands.registerCommand('vidurai.copyContext', async () => {
            await copyContext();
        })
    );

    // Command: Restart Bridge
    context.subscriptions.push(
        vscode.commands.registerCommand('vidurai.restartBridge', async () => {
            if (bridge) {
                await bridge.restart();
                vscode.window.showInformationMessage('✅ Vidurai bridge restarted');
            }
        })
    );

    // Command: Show Logs
    context.subscriptions.push(
        vscode.commands.registerCommand('vidurai.showLogs', () => {
            getOutputChannel().show();
        })
    );
}

/**
 * Copy relevant context to clipboard
 */
async function copyContext() {
    if (!bridge || !bridge.isRunning()) {
        vscode.window.showErrorMessage('⚠️ Vidurai bridge is not running');
        return;
    }

    try {
        // Recall memories
        const response = await bridge.send({
            type: 'recall_context',
            query: '',
            top_k: 10
        });

        if (response.status !== 'ok' || !response.memories) {
            vscode.window.showErrorMessage('❌ Failed to recall context');
            return;
        }

        // Format as markdown
        let markdown = '# Vidurai Context\n\n';
        markdown += '_Automatically generated from your recent work_\n\n';

        for (const mem of response.memories) {
            markdown += `## ${mem.gist}\n\n`;
            markdown += `- **Salience:** ${mem.salience}\n`;
            markdown += `- **Age:** ${mem.age_days} days ago\n\n`;
            markdown += `${mem.verbatim}\n\n`;
            markdown += '---\n\n';
        }

        // Copy to clipboard
        await vscode.env.clipboard.writeText(markdown);

        vscode.window.showInformationMessage(
            `✅ Copied ${response.memories.length} memories to clipboard!`
        );

    } catch (error: any) {
        log('error', `Copy context failed: ${error.message}`);
        vscode.window.showErrorMessage(`❌ Failed to copy context: ${error.message}`);
    }
}
