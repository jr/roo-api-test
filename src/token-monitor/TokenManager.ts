import * as vscode from 'vscode';
import { RooCodeAPI, TokenUsage } from '../roo-code';
import { TaskTrackingData, SessionStats, TokenUsageSnapshot } from './types';
import { OutputFormatter } from './OutputFormatter';

/**
 * Manages token usage monitoring for Roo Code tasks
 */
export class TokenManager {
    private outputChannel: vscode.OutputChannel;
    private sessionStats: SessionStats;
    private api: RooCodeAPI | null = null;
    private isMonitoring: boolean = false;

    constructor() {
        this.outputChannel = vscode.window.createOutputChannel('Roo Token Usage');
        this.sessionStats = this.initializeSession();
    }

    /**
     * Initializes a new session with default values
     */
    private initializeSession(): SessionStats {
        return {
            sessionStart: new Date(),
            totalTasks: 0,
            completedTasks: 0,
            aggregateTokensIn: 0,
            aggregateTokensOut: 0,
            aggregateCost: 0,
            taskHistory: new Map()
        };
    }

    /**
     * Starts monitoring token usage
     */
    public startMonitoring(api: RooCodeAPI): void {
        if (this.isMonitoring) {
            this.log('Token monitoring is already active');
            return;
        }

        this.api = api;
        this.isMonitoring = true;
        this.outputChannel.show();

        // Register event listeners
        api.on('taskCreated', this.handleTaskCreated);
        api.on('taskTokenUsageUpdated', this.handleTokenUpdate);
        api.on('taskCompleted', this.handleTaskCompleted);

        this.log('Token monitoring started');
    }

    /**
     * Stops monitoring token usage and displays session summary
     */
    public stopMonitoring(): void {
        if (!this.isMonitoring || !this.api) {
            this.log('Token monitoring is not active');
            return;
        }

        // Remove event listeners
        this.api.off('taskCreated', this.handleTaskCreated);
        this.api.off('taskTokenUsageUpdated', this.handleTokenUpdate);
        this.api.off('taskCompleted', this.handleTaskCompleted);

        this.showSessionSummary();
        this.isMonitoring = false;
        this.log('Token monitoring stopped');
    }

    /**
     * Handles the taskCreated event
     */
    private handleTaskCreated = (taskId: string): void => {
        const trackingData: TaskTrackingData = {
            taskId,
            startTime: new Date(),
            lastUpdate: new Date(),
            usageHistory: []
        };

        this.sessionStats.taskHistory.set(taskId, trackingData);
        this.sessionStats.totalTasks++;

        const message = OutputFormatter.formatTaskCreated(taskId);
        this.outputChannel.append(message);
    };

    /**
     * Handles the taskTokenUsageUpdated event
     */
    private handleTokenUpdate = (taskId: string, usage: TokenUsage): void => {
        const trackingData = this.sessionStats.taskHistory.get(taskId);

        if (!trackingData) {
            // Task wasn't created via taskCreated event, initialize it now
            const newTrackingData: TaskTrackingData = {
                taskId,
                startTime: new Date(),
                lastUpdate: new Date(),
                usageHistory: []
            };
            this.sessionStats.taskHistory.set(taskId, newTrackingData);
            this.sessionStats.totalTasks++;
            
            const createdMessage = OutputFormatter.formatTaskCreated(taskId);
            this.outputChannel.append(createdMessage);
            
            // Update reference
            const data = this.sessionStats.taskHistory.get(taskId)!;
            this.updateTaskUsage(data, usage);
        } else {
            this.updateTaskUsage(trackingData, usage);
        }
    };

    /**
     * Updates task usage data and formats output
     */
    private updateTaskUsage(trackingData: TaskTrackingData, usage: TokenUsage): void {
        const snapshot: TokenUsageSnapshot = {
            timestamp: new Date(),
            usage
        };

        const previousUsage = trackingData.usageHistory.length > 0
            ? trackingData.usageHistory[trackingData.usageHistory.length - 1].usage
            : undefined;

        trackingData.usageHistory.push(snapshot);
        trackingData.lastUpdate = new Date();

        const message = OutputFormatter.formatTokenUpdate(trackingData.taskId, usage, previousUsage);
        this.outputChannel.append(message);
    }

    /**
     * Handles the taskCompleted event
     */
    private handleTaskCompleted = (
        taskId: string,
        usage: TokenUsage,
        toolStats: Record<string, { attempts: number; failures: number }>
    ): void => {
        let trackingData = this.sessionStats.taskHistory.get(taskId);

        if (!trackingData) {
            // Task wasn't tracked, create it now
            trackingData = {
                taskId,
                startTime: new Date(),
                lastUpdate: new Date(),
                usageHistory: []
            };
            this.sessionStats.taskHistory.set(taskId, trackingData);
            this.sessionStats.totalTasks++;
        }

        trackingData.finalUsage = usage;
        trackingData.toolStats = toolStats;

        // Update session aggregates
        this.sessionStats.completedTasks++;
        this.sessionStats.aggregateTokensIn += usage.totalTokensIn;
        this.sessionStats.aggregateTokensOut += usage.totalTokensOut;
        this.sessionStats.aggregateCost += usage.totalCost;

        const message = OutputFormatter.formatTaskCompleted(trackingData);
        this.outputChannel.append(message);
    };

    /**
     * Displays the session summary
     */
    public showSessionSummary(): void {
        const message = OutputFormatter.formatSessionSummary(this.sessionStats);
        this.outputChannel.append(message);
        this.outputChannel.show();
    }

    /**
     * Clears all session data and resets statistics
     */
    public clearSession(): void {
        this.sessionStats = this.initializeSession();
        this.outputChannel.clear();
        this.log('Session data cleared');
    }

    /**
     * Logs a message to the output channel
     */
    private log(message: string): void {
        const formattedMessage = OutputFormatter.formatLog(message);
        this.outputChannel.append(formattedMessage);
    }

    /**
     * Disposes of resources
     */
    public dispose(): void {
        this.stopMonitoring();
        this.outputChannel.dispose();
    }
}
