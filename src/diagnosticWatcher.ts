/**
 * Diagnostic Watcher
 * Tracks errors and warnings from VS Code diagnostics
 */
import * as vscode from 'vscode';
import * as path from 'path';
import { PythonBridge } from './pythonBridge';
import { log, getConfig } from './utils';

export class DiagnosticWatcher {
    private bridge: PythonBridge;
    private disposables: vscode.Disposable[] = [];
    private processedDiagnostics: Set<string> = new Set();

    constructor(bridge: PythonBridge) {
        this.bridge = bridge;
    }

    /**
     * Start watching diagnostics
     */
    start(): void {
        const trackDiagnostics = getConfig('trackDiagnostics', true);

        if (!trackDiagnostics) {
            log('info', 'Diagnostic tracking disabled in settings');
            return;
        }

        log('info', 'Starting diagnostic watcher');

        // Watch diagnostic changes
        this.disposables.push(
            vscode.languages.onDidChangeDiagnostics((event) => {
                this.onDiagnosticsChanged(event);
            })
        );

        log('info', 'Diagnostic watcher started');
    }

    /**
     * Stop watching
     */
    stop(): void {
        log('info', 'Stopping diagnostic watcher');

        this.processedDiagnostics.clear();
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }

    /**
     * Handle diagnostic changes
     */
    private onDiagnosticsChanged(event: vscode.DiagnosticChangeEvent): void {
        for (const uri of event.uris) {
            // Only process file URIs
            if (uri.scheme !== 'file') {
                continue;
            }

            const diagnostics = vscode.languages.getDiagnostics(uri);
            this.processDiagnostics(uri, diagnostics);
        }
    }

    /**
     * Process diagnostics for a file
     */
    private processDiagnostics(uri: vscode.Uri, diagnostics: vscode.Diagnostic[]): void {
        const filePath = uri.fsPath;

        for (const diagnostic of diagnostics) {
            // Only track errors and warnings (ignore info/hints)
            if (diagnostic.severity > vscode.DiagnosticSeverity.Warning) {
                continue;
            }

            // Create unique ID for this diagnostic
            const diagId = `${filePath}:${diagnostic.range.start.line}:${diagnostic.message}`;

            // Skip if already processed
            if (this.processedDiagnostics.has(diagId)) {
                continue;
            }

            // Mark as processed
            this.processedDiagnostics.add(diagId);

            // Send to bridge
            this.sendDiagnosticEvent(filePath, diagnostic);

            // Clean up old processed diagnostics (keep last 1000)
            if (this.processedDiagnostics.size > 1000) {
                const toDelete = Array.from(this.processedDiagnostics).slice(0, 100);
                toDelete.forEach(id => this.processedDiagnostics.delete(id));
            }
        }
    }

    /**
     * Send diagnostic event to bridge
     */
    private async sendDiagnosticEvent(
        filePath: string,
        diagnostic: vscode.Diagnostic
    ): Promise<void> {
        try {
            const severity = diagnostic.severity === vscode.DiagnosticSeverity.Error
                ? 'error'
                : 'warning';

            const message = `Line ${diagnostic.range.start.line + 1}: ${diagnostic.message}`;

            log('debug', `Sending diagnostic: ${severity} in ${path.basename(filePath)}`);

            const response = await this.bridge.send({
                type: 'diagnostic',
                file: filePath,
                severity: severity,
                message: message
            }, 5000);

            if (response.status === 'ok') {
                log('debug', `Diagnostic processed: ${response.gist} (${response.salience})`);

                // Show notification for critical errors
                if (severity === 'error') {
                    // Optional: Show notification for first error
                    // vscode.window.showWarningMessage(`Error tracked: ${message}`);
                }
            } else {
                log('error', `Diagnostic tracking failed: ${response.error}`);
            }

        } catch (error: any) {
            log('error', `Error sending diagnostic: ${error.message}`);
        }
    }
}
