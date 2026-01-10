import { TokenUsage } from '../roo-code';
import { SessionStats, TaskTrackingData } from './types';

/**
 * Utility class for formatting output messages to the Output Channel
 */
export class OutputFormatter {
    /**
     * Formats a number with thousand separators
     */
    private static formatNumber(num: number): string {
        return num.toLocaleString('en-US');
    }

    /**
     * Formats a cost value with proper decimal places
     */
    private static formatCost(cost: number): string {
        return `$${cost.toFixed(4)}`;
    }

    /**
     * Formats a duration in milliseconds to a readable string
     */
    private static formatDuration(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }

    /**
     * Formats a timestamp to a readable string
     */
    private static formatTimestamp(date: Date): string {
        return date.toISOString().replace('T', ' ').substring(0, 19);
    }

    /**
     * Formats the task creation message
     */
    public static formatTaskCreated(taskId: string): string {
        const timestamp = this.formatTimestamp(new Date());
        return [
            '════════════════════════════════════════════════════════════════',
            `[${timestamp}] NEW TASK CREATED`,
            `Task ID: ${taskId}`,
            '════════════════════════════════════════════════════════════════',
            ''
        ].join('\n');
    }

    /**
     * Formats a token usage update message with deltas
     */
    public static formatTokenUpdate(
        taskId: string,
        usage: TokenUsage,
        previousUsage?: TokenUsage
    ): string {
        const timestamp = this.formatTimestamp(new Date());
        const deltaIn = previousUsage ? usage.totalTokensIn - previousUsage.totalTokensIn : usage.totalTokensIn;
        const deltaOut = previousUsage ? usage.totalTokensOut - previousUsage.totalTokensOut : usage.totalTokensOut;
        const deltaCost = previousUsage ? usage.totalCost - previousUsage.totalCost : usage.totalCost;

        const lines = [
            `[${timestamp}] TOKEN UPDATE - Task: ${taskId}`,
            `  Tokens In:    ${this.formatNumber(usage.totalTokensIn).padStart(8)} (+${this.formatNumber(deltaIn)})`,
            `  Tokens Out:   ${this.formatNumber(usage.totalTokensOut).padStart(8)} (+${this.formatNumber(deltaOut)})`,
        ];

        if (usage.totalCacheWrites !== undefined) {
            lines.push(`  Cache Writes: ${this.formatNumber(usage.totalCacheWrites).padStart(8)}`);
        }

        if (usage.totalCacheReads !== undefined) {
            lines.push(`  Cache Reads:  ${this.formatNumber(usage.totalCacheReads).padStart(8)}`);
        }

        lines.push(
            `  Context:      ${this.formatNumber(usage.contextTokens).padStart(8)}`,
            `  Cost:         ${this.formatCost(usage.totalCost).padStart(8)} (+${this.formatCost(deltaCost)})`,
            ''
        );

        return lines.join('\n');
    }

    /**
     * Formats a task completion summary
     */
    public static formatTaskCompleted(taskData: TaskTrackingData): string {
        const timestamp = this.formatTimestamp(new Date());
        const duration = Date.now() - taskData.startTime.getTime();
        const usage = taskData.finalUsage!;

        const lines = [
            '════════════════════════════════════════════════════════════════',
            `[${timestamp}] TASK COMPLETED`,
            `Task ID: ${taskData.taskId}`,
            `Duration: ${this.formatDuration(duration)}`,
            '',
            'FINAL TOKEN USAGE:',
            `  Total Tokens In:  ${this.formatNumber(usage.totalTokensIn)}`,
            `  Total Tokens Out: ${this.formatNumber(usage.totalTokensOut)}`,
        ];

        if (usage.totalCacheWrites !== undefined) {
            lines.push(`  Cache Writes:     ${this.formatNumber(usage.totalCacheWrites)}`);
        }

        if (usage.totalCacheReads !== undefined) {
            lines.push(`  Cache Reads:      ${this.formatNumber(usage.totalCacheReads)}`);
        }

        lines.push(`  Final Cost:       ${this.formatCost(usage.totalCost)}`);

        if (taskData.toolStats && Object.keys(taskData.toolStats).length > 0) {
            lines.push('', 'TOOL STATISTICS:');
            for (const [tool, stats] of Object.entries(taskData.toolStats)) {
                lines.push(`  ${tool.padEnd(20)}: ${stats.attempts} attempts, ${stats.failures} failures`);
            }
        }

        lines.push('════════════════════════════════════════════════════════════════', '');

        return lines.join('\n');
    }

    /**
     * Formats a session summary
     */
    public static formatSessionSummary(stats: SessionStats): string {
        const timestamp = this.formatTimestamp(new Date());
        const duration = Date.now() - stats.sessionStart.getTime();

        return [
            '',
            '╔══════════════════════════════════════════════════════════════╗',
            '║              TOKEN USAGE SESSION SUMMARY                     ║',
            '╠══════════════════════════════════════════════════════════════╣',
            `║  Session Started: ${this.formatTimestamp(stats.sessionStart).padEnd(43)}║`,
            `║  Session Duration: ${this.formatDuration(duration).padEnd(42)}║`,
            '║                                                              ║',
            `║  Total Tasks: ${stats.totalTasks.toString().padEnd(47)}║`,
            `║  Completed Tasks: ${stats.completedTasks.toString().padEnd(43)}║`,
            '║                                                              ║',
            `║  Aggregate Tokens In:  ${this.formatNumber(stats.aggregateTokensIn).padEnd(35)}║`,
            `║  Aggregate Tokens Out: ${this.formatNumber(stats.aggregateTokensOut).padEnd(35)}║`,
            `║  Total Session Cost:   ${this.formatCost(stats.aggregateCost).padEnd(35)}║`,
            '╚══════════════════════════════════════════════════════════════╝',
            ''
        ].join('\n');
    }

    /**
     * Formats a simple log message with timestamp
     */
    public static formatLog(message: string): string {
        const timestamp = this.formatTimestamp(new Date());
        return `[${timestamp}] ${message}\n`;
    }
}
