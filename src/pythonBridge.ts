/**
 * Python Bridge Communication
 * Manages subprocess and stdin/stdout communication
 */
import * as vscode from 'vscode';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
import { log } from './utils';

interface BridgeEvent {
    type: string;
    [key: string]: any;
}

interface BridgeResponse {
    status: 'ok' | 'error';
    [key: string]: any;
}

export class PythonBridge {
    private process: ChildProcess | null = null;
    private pythonPath: string;
    private bridgePath: string;
    private responseCallbacks: Map<number, (response: BridgeResponse) => void> = new Map();
    private requestId: number = 0;
    private crashCount: number = 0;
    private readonly MAX_CRASHES = 3;

    constructor(pythonPath: string, extensionPath: string) {
        this.pythonPath = pythonPath;
        this.bridgePath = path.join(extensionPath, 'python-bridge', 'bridge.py');
    }

    /**
     * Start the Python bridge process
     */
    async start(): Promise<void> {
        if (this.process) {
            log('warn', 'Bridge already running');
            return;
        }

        log('info', `Starting Python bridge: ${this.pythonPath} ${this.bridgePath}`);

        try {
            this.process = spawn(this.pythonPath, [this.bridgePath], {
                stdio: ['pipe', 'pipe', 'pipe']
            });

            // Handle stdout (JSON responses)
            this.process.stdout?.on('data', (data) => {
                const lines = data.toString().split('\n').filter((l: string) => l.trim());

                for (const line of lines) {
                    try {
                        const response: BridgeResponse = JSON.parse(line);
                        this.handleResponse(response);
                    } catch (error) {
                        log('error', `Failed to parse response: ${line}`);
                    }
                }
            });

            // Handle stderr (logs from Python)
            this.process.stderr?.on('data', (data) => {
                const message = data.toString().trim();
                log('debug', `Bridge stderr: ${message}`);
            });

            // Handle process exit
            this.process.on('exit', (code) => {
                log('warn', `Bridge exited with code: ${code}`);
                this.process = null;

                if (code !== 0) {
                    this.handleCrash();
                }
            });

            // Test connection with ping
            const pingResponse = await this.send({ type: 'ping' });
            if (pingResponse.status === 'ok') {
                log('info', 'Bridge started successfully');
                this.crashCount = 0;  // Reset crash count on successful start
            }

        } catch (error: any) {
            log('error', `Failed to start bridge: ${error.message}`);
            throw error;
        }
    }

    /**
     * Stop the Python bridge process
     */
    stop(): void {
        if (this.process) {
            log('info', 'Stopping Python bridge');
            this.process.kill('SIGTERM');

            // Force kill after 5 seconds
            setTimeout(() => {
                if (this.process) {
                    this.process.kill('SIGKILL');
                }
            }, 5000);

            this.process = null;
        }
    }

    /**
     * Restart the bridge
     */
    async restart(): Promise<void> {
        log('info', 'Restarting bridge');
        this.stop();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.start();
    }

    /**
     * Send event to bridge and wait for response
     */
    send(event: BridgeEvent, timeout: number = 10000): Promise<BridgeResponse> {
        return new Promise((resolve, reject) => {
            if (!this.process || !this.process.stdin) {
                reject(new Error('Bridge not running'));
                return;
            }

            const id = this.requestId++;
            const eventWithId = { ...event, _id: id };

            // Set timeout
            const timeoutHandle = setTimeout(() => {
                this.responseCallbacks.delete(id);
                reject(new Error('Bridge timeout'));
            }, timeout);

            // Store callback
            this.responseCallbacks.set(id, (response) => {
                clearTimeout(timeoutHandle);
                resolve(response);
            });

            // Send event
            const json = JSON.stringify(eventWithId) + '\n';
            this.process.stdin.write(json);

            log('debug', `Sent event: ${event.type}`);
        });
    }

    /**
     * Handle response from bridge
     */
    private handleResponse(response: BridgeResponse): void {
        const id = (response as any)._id;

        if (id !== undefined) {
            const callback = this.responseCallbacks.get(id);
            if (callback) {
                this.responseCallbacks.delete(id);
                callback(response);
            }
        }
    }

    /**
     * Handle bridge crash
     */
    private handleCrash(): void {
        this.crashCount++;

        if (this.crashCount >= this.MAX_CRASHES) {
            vscode.window.showErrorMessage(
                `🚨 Vidurai bridge crashed ${this.crashCount} times. Extension disabled.`,
                'Report Bug',
                'View Logs',
                'Retry'
            ).then(choice => {
                if (choice === 'Report Bug') {
                    vscode.env.openExternal(vscode.Uri.parse('https://github.com/chandantochandan/vidurai/issues/new'));
                } else if (choice === 'View Logs') {
                    vscode.commands.executeCommand('vidurai.showLogs');
                } else if (choice === 'Retry') {
                    this.crashCount = 0;
                    this.restart().catch(err => {
                        log('error', `Restart failed: ${err.message}`);
                    });
                }
            });
        } else {
            // Auto-retry
            vscode.window.showWarningMessage(
                `⚠️ Vidurai bridge crashed (attempt ${this.crashCount}/${this.MAX_CRASHES}). Restarting...`
            );

            setTimeout(() => {
                this.restart().catch(err => {
                    log('error', `Auto-restart failed: ${err.message}`);
                });
            }, 2000);
        }
    }

    /**
     * Check if bridge is running
     */
    isRunning(): boolean {
        return this.process !== null;
    }
}
