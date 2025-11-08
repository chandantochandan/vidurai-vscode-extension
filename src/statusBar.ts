/**
 * Status Bar Indicator
 */
import * as vscode from 'vscode';
import { PythonBridge } from './pythonBridge';
import { log } from './utils';

export class StatusBarManager {
    private statusBarItem: vscode.StatusBarItem;
    private bridge: PythonBridge;
    private updateInterval: NodeJS.Timeout | null = null;

    constructor(bridge: PythonBridge) {
        this.bridge = bridge;

        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );

        this.statusBarItem.command = 'vidurai.copyContext';
        this.statusBarItem.show();

        this.update();
    }

    /**
     * Start periodic updates
     */
    startUpdates(): void {
        if (this.updateInterval) {
            return;
        }

        // Update every 10 seconds
        this.updateInterval = setInterval(() => {
            this.update();
        }, 10000);
    }

    /**
     * Stop periodic updates
     */
    stopUpdates(): void {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    /**
     * Update status bar
     */
    async update(): Promise<void> {
        try {
            if (!this.bridge.isRunning()) {
                this.statusBarItem.text = '$(database) Vidurai: Offline';
                this.statusBarItem.tooltip = 'Vidurai bridge is not running\nClick to restart';
                this.statusBarItem.command = 'vidurai.restartBridge';
                return;
            }

            // Get stats from bridge
            const response = await this.bridge.send({ type: 'get_stats' }, 5000);

            if (response.status === 'ok' && response.stats) {
                const memoryCount = response.stats.total_memories || 0;

                this.statusBarItem.text = `$(database) ${memoryCount}`;
                this.statusBarItem.tooltip = `Vidurai: ${memoryCount} memories tracked\nClick to copy context`;
                this.statusBarItem.command = 'vidurai.copyContext';
            }

        } catch (error: any) {
            log('warn', `Status update failed: ${error.message}`);
            this.statusBarItem.text = '$(database) Vidurai: Error';
            this.statusBarItem.tooltip = 'Failed to get stats\nClick to restart';
            this.statusBarItem.command = 'vidurai.restartBridge';
        }
    }

    /**
     * Dispose status bar
     */
    dispose(): void {
        this.stopUpdates();
        this.statusBarItem.dispose();
    }
}
