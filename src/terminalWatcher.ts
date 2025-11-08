/**
 * Terminal Watcher
 * Tracks terminal commands and output
 */
import * as vscode from 'vscode';
import { PythonBridge } from './pythonBridge';
import { log, getConfig } from './utils';

interface TerminalProcess {
    terminal: vscode.Terminal;
    command: string;
    output: string;
    startTime: number;
}

export class TerminalWatcher {
    private bridge: PythonBridge;
    private disposables: vscode.Disposable[] = [];
    private activeProcesses: Map<number, TerminalProcess> = new Map();

    constructor(bridge: PythonBridge) {
        this.bridge = bridge;
    }

    /**
     * Start watching terminal events
     */
    start(): void {
        const trackTerminal = getConfig('trackTerminal', true);

        if (!trackTerminal) {
            log('info', 'Terminal tracking disabled in settings');
            return;
        }

        log('info', 'Starting terminal watcher');

        // Watch terminal creation
        this.disposables.push(
            vscode.window.onDidOpenTerminal((terminal) => {
                this.onTerminalOpened(terminal);
            })
        );

        // Watch terminal close
        this.disposables.push(
            vscode.window.onDidCloseTerminal((terminal) => {
                this.onTerminalClosed(terminal);
            })
        );

        // Note: VS Code doesn't provide direct access to terminal output
        // We'll track based on terminal state changes
        // For full command tracking, users would need to configure shell history

        log('info', 'Terminal watcher started (limited to terminal state)');
    }

    /**
     * Stop watching
     */
    stop(): void {
        log('info', 'Stopping terminal watcher');

        this.activeProcesses.clear();
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }

    /**
     * Handle terminal opened
     */
    private onTerminalOpened(terminal: vscode.Terminal): void {
        log('debug', `Terminal opened: ${terminal.name}`);

        // VS Code API limitation: Cannot directly capture terminal output
        // This is a known limitation in VS Code extension API
        // Best we can do is track terminal lifecycle

        // Future enhancement: Could integrate with shell history files
        // or use VS Code proposed API (TerminalDataWriteEvent)
    }

    /**
     * Handle terminal closed
     */
    private onTerminalClosed(terminal: vscode.Terminal): void {
        log('debug', `Terminal closed: ${terminal.name}`);
    }

    /**
     * Manual command tracking (for future use)
     * Users can call this via a command to log specific terminal commands
     */
    async trackCommand(command: string, output: string, exitCode: number): Promise<void> {
        try {
            log('debug', `Tracking command: ${command}`);

            const response = await this.bridge.send({
                type: 'terminal_output',
                command: command,
                output: output,
                exitCode: exitCode
            }, 5000);

            if (response.status === 'ok') {
                log('debug', `Command tracked: ${response.gist} (${response.salience})`);
            } else {
                log('error', `Command tracking failed: ${response.error}`);
            }

        } catch (error: any) {
            log('error', `Error tracking command: ${error.message}`);
        }
    }
}
