/**
 * Vidurai VS Code Extension
 * Main entry point
 * v2.0 - Phase 2: Active project tracking for MCP server
 */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PythonBridge } from './pythonBridge';
import { StatusBarManager } from './statusBar';
import { ensureVidurai } from './installer';
import { log, getConfig, getOutputChannel } from './utils';
import { FileWatcher } from './fileWatcher';
import { TerminalWatcher } from './terminalWatcher';
import { DiagnosticWatcher } from './diagnosticWatcher';
import { registerMemoryTreeView } from './views/memoryTreeView';

let bridge: PythonBridge | null = null;
let statusBar: StatusBarManager | null = null;
let fileWatcher: FileWatcher | null = null;
let terminalWatcher: TerminalWatcher | null = null;
let diagnosticWatcher: DiagnosticWatcher | null = null;
let memoryTreeView: vscode.TreeView<any> | null = null;

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
        const pythonPath = await ensureVidurai(context.extensionPath);

        // Start Python bridge
        bridge = new PythonBridge(pythonPath, context.extensionPath);
        await bridge.start();

        // Start status bar
        statusBar = new StatusBarManager(bridge);
        statusBar.startUpdates();

        // Register commands
        registerCommands(context);

        // v2.0: Register TreeView
        memoryTreeView = registerMemoryTreeView(context, bridge);
        log('info', 'Memory TreeView registered');

        // Start watchers (Phase 3)
        fileWatcher = new FileWatcher(bridge);
        fileWatcher.start();

        terminalWatcher = new TerminalWatcher(bridge);
        terminalWatcher.start();

        diagnosticWatcher = new DiagnosticWatcher(bridge);
        diagnosticWatcher.start();

        // v2.0 Phase 2: Write active project for MCP server/ChatGPT extension
        writeActiveProject();
        context.subscriptions.push(
            vscode.workspace.onDidChangeWorkspaceFolders(writeActiveProject)
        );

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

    // Stop watchers
    if (fileWatcher) {
        fileWatcher.stop();
        fileWatcher = null;
    }

    if (terminalWatcher) {
        terminalWatcher.stop();
        terminalWatcher = null;
    }

    if (diagnosticWatcher) {
        diagnosticWatcher.stop();
        diagnosticWatcher = null;
    }

    if (bridge) {
        bridge.stop();
        bridge = null;
    }

    if (statusBar) {
        statusBar.dispose();
        statusBar = null;
    }

    if (memoryTreeView) {
        memoryTreeView.dispose();
        memoryTreeView = null;
    }
}

/**
 * Write active project path for MCP server and browser extensions
 * v2.0 Phase 2
 */
function writeActiveProject() {
    const projectPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!projectPath) {
        log('debug', 'No workspace folder open, skipping active project write');
        return;
    }

    try {
        const viduraiDir = path.join(os.homedir(), '.vidurai');
        const activeFile = path.join(viduraiDir, 'active-project.txt');

        // Ensure directory exists
        if (!fs.existsSync(viduraiDir)) {
            fs.mkdirSync(viduraiDir, { recursive: true });
        }

        // Write project path
        fs.writeFileSync(activeFile, projectPath, 'utf-8');

        log('info', `Active project updated: ${projectPath}`);
    } catch (error: any) {
        log('error', `Failed to write active project: ${error.message}`);
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
