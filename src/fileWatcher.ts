/**
 * File Watcher
 * Tracks file edits with debouncing and filtering
 */
import * as vscode from 'vscode';
import * as path from 'path';
import { PythonBridge } from './pythonBridge';
import { log, getConfig } from './utils';

export class FileWatcher {
    private bridge: PythonBridge;
    private editTimers: Map<string, NodeJS.Timeout> = new Map();
    private disposables: vscode.Disposable[] = [];

    constructor(bridge: PythonBridge) {
        this.bridge = bridge;
    }

    /**
     * Start watching file events
     */
    start(): void {
        log('info', 'Starting file watcher');

        // Watch text document changes (edits)
        this.disposables.push(
            vscode.workspace.onDidChangeTextDocument((event) => {
                this.onFileEdit(event);
            })
        );

        // Watch file saves
        this.disposables.push(
            vscode.workspace.onDidSaveTextDocument((document) => {
                this.onFileSave(document);
            })
        );

        log('info', 'File watcher started');
    }

    /**
     * Stop watching
     */
    stop(): void {
        log('info', 'Stopping file watcher');

        // Clear all debounce timers
        this.editTimers.forEach(timer => clearTimeout(timer));
        this.editTimers.clear();

        // Dispose event handlers
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }

    /**
     * Handle file edit (with debouncing)
     */
    private onFileEdit(event: vscode.TextDocumentChangeEvent): void {
        const document = event.document;

        // Skip untitled/unsaved documents
        if (document.uri.scheme !== 'file') {
            return;
        }

        const filePath = document.uri.fsPath;

        // Check if should ignore
        if (this.shouldIgnoreFile(filePath)) {
            return;
        }

        // Check file size
        const maxSize = getConfig('maxFileSize', 51200);
        const content = document.getText();

        if (maxSize > 0 && content.length > maxSize) {
            log('debug', `Ignoring large file: ${filePath} (${content.length} bytes)`);
            return;
        }

        // Debounce: Only send event after user stops typing
        const debounceMs = getConfig('debounceMs', 2000);

        // Clear existing timer for this file
        const existingTimer = this.editTimers.get(filePath);
        if (existingTimer) {
            clearTimeout(existingTimer);
        }

        // Set new timer
        const timer = setTimeout(() => {
            this.sendFileEditEvent(filePath, content);
            this.editTimers.delete(filePath);
        }, debounceMs);

        this.editTimers.set(filePath, timer);
    }

    /**
     * Handle file save (immediate, no debounce)
     */
    private onFileSave(document: vscode.TextDocument): void {
        if (document.uri.scheme !== 'file') {
            return;
        }

        const filePath = document.uri.fsPath;

        if (this.shouldIgnoreFile(filePath)) {
            return;
        }

        log('debug', `File saved: ${filePath}`);

        // File save is important, send immediately
        // (This will also clear any pending debounced edit)
        const existingTimer = this.editTimers.get(filePath);
        if (existingTimer) {
            clearTimeout(existingTimer);
            this.editTimers.delete(filePath);
        }

        const content = document.getText();
        this.sendFileEditEvent(filePath, content);
    }

    /**
     * Send file edit event to bridge
     */
    private async sendFileEditEvent(filePath: string, content: string): Promise<void> {
        try {
            log('debug', `Sending file edit: ${filePath}`);

            const response = await this.bridge.send({
                type: 'file_edit',
                file: filePath,
                content: content
            }, 5000);

            if (response.status === 'ok') {
                log('debug', `File edit processed: ${response.gist} (${response.salience})`);

                if (response.secrets_detected) {
                    vscode.window.showWarningMessage(
                        `⚠️ Secrets detected in ${path.basename(filePath)} - content sanitized`
                    );
                }
            } else {
                log('error', `File edit failed: ${response.error}`);
            }

        } catch (error: any) {
            log('error', `Error sending file edit: ${error.message}`);
        }
    }

    /**
     * Check if file should be ignored
     */
    private shouldIgnoreFile(filePath: string): boolean {
        const ignoredPaths = getConfig<string[]>('ignoredPaths', [
            'node_modules', '.git', 'dist', 'build', 'out', '.venv'
        ]);

        const normalized = filePath.replace(/\\/g, '/');

        for (const ignored of ignoredPaths) {
            if (normalized.includes(`/${ignored}/`) || normalized.includes(`/${ignored}`)) {
                return true;
            }
        }

        return false;
    }
}
