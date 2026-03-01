/**
 * Benchmark — Measure execution time and throughput
 */
export interface BenchmarkResult { name: string; runs: number; avgMs: number; minMs: number; maxMs: number; opsPerSec: number; }

export class Benchmark {
    /** Time a function */
    static async time<T>(name: string, fn: () => Promise<T> | T): Promise<{ result: T; durationMs: number }> {
        const start = performance.now();
        const result = await fn();
        return { result, durationMs: performance.now() - start };
    }

    /** Run benchmark with multiple iterations */
    static async run(name: string, fn: () => Promise<void> | void, runs: number = 100): Promise<BenchmarkResult> {
        const times: number[] = [];
        for (let i = 0; i < runs; i++) {
            const start = performance.now();
            await fn();
            times.push(performance.now() - start);
        }
        const avg = times.reduce((a, b) => a + b, 0) / times.length;
        return { name, runs, avgMs: Math.round(avg * 100) / 100, minMs: Math.round(Math.min(...times) * 100) / 100, maxMs: Math.round(Math.max(...times) * 100) / 100, opsPerSec: Math.round(1000 / avg) };
    }

    /** Compare two functions */
    static async compare(nameA: string, fnA: () => Promise<void> | void, nameB: string, fnB: () => Promise<void> | void, runs: number = 100): Promise<{ a: BenchmarkResult; b: BenchmarkResult; faster: string; speedup: string }> {
        const a = await this.run(nameA, fnA, runs);
        const b = await this.run(nameB, fnB, runs);
        const faster = a.avgMs < b.avgMs ? nameA : nameB;
        const ratio = Math.max(a.avgMs, b.avgMs) / Math.min(a.avgMs, b.avgMs);
        return { a, b, faster, speedup: `${ratio.toFixed(1)}x` };
    }

    /** Format results as table */
    static formatResults(results: BenchmarkResult[]): string {
        const header = 'Name | Runs | Avg (ms) | Min (ms) | Max (ms) | Ops/sec';
        const sep = '---|---|---|---|---|---';
        const rows = results.map((r) => `${r.name} | ${r.runs} | ${r.avgMs} | ${r.minMs} | ${r.maxMs} | ${r.opsPerSec}`);
        return [header, sep, ...rows].join('\n');
    }
}
