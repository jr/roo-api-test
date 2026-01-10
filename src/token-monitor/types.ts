import { TokenUsage } from '../roo-code';

/**
 * A snapshot of token usage at a specific point in time
 */
export interface TokenUsageSnapshot {
    timestamp: Date;
    usage: TokenUsage;
}

/**
 * Tracking data for a single task
 */
export interface TaskTrackingData {
    taskId: string;
    startTime: Date;
    lastUpdate: Date;
    usageHistory: TokenUsageSnapshot[];
    finalUsage?: TokenUsage;
    toolStats?: Record<string, { attempts: number; failures: number }>;
}

/**
 * Aggregate statistics for the entire monitoring session
 */
export interface SessionStats {
    sessionStart: Date;
    totalTasks: number;
    completedTasks: number;
    aggregateTokensIn: number;
    aggregateTokensOut: number;
    aggregateCost: number;
    taskHistory: Map<string, TaskTrackingData>;
}
