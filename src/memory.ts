/**
 * Memory Monitor — Track extension memory usage
 */
export class MemoryMonitor {
    private snapshots: Array<{ timestamp: number; usedJSHeapSize: number }> = [];

    /** Take a memory snapshot */
    snapshot(): void {
        if ((performance as any).memory) {
            this.snapshots.push({ timestamp: Date.now(), usedJSHeapSize: (performance as any).memory.usedJSHeapSize });
        }
    }

    /** Get current memory usage (bytes) */
    static getCurrent(): number { return (performance as any).memory?.usedJSHeapSize || 0; }

    /** Get memory limit */
    static getLimit(): number { return (performance as any).memory?.jsHeapSizeLimit || 0; }

    /** Get usage percentage */
    static getUsagePercent(): number {
        const limit = this.getLimit();
        return limit ? Math.round((this.getCurrent() / limit) * 100) : 0;
    }

    /** Get snapshot history */
    getHistory(): Array<{ timestamp: number; mb: number }> {
        return this.snapshots.map((s) => ({ timestamp: s.timestamp, mb: Math.round(s.usedJSHeapSize / 1048576 * 100) / 100 }));
    }

    /** Start periodic monitoring */
    startMonitoring(intervalMs: number = 5000): ReturnType<typeof setInterval> {
        return setInterval(() => this.snapshot(), intervalMs) as any;
    }
}
