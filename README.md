# extension-benchmark

Performance benchmarking for Chrome extensions - measure execution time, throughput, and memory usage.

Built by theluckystrike | npm i extension-benchmark

## OVERVIEW

extension-benchmark is a lightweight TypeScript library for measuring performance metrics in Chrome extensions. It provides tools for timing function execution, comparing implementation performance, and monitoring memory usage.

## INSTALLATION

```bash
npm install extension-benchmark
```

## USAGE

### Basic Timing

Measure how long a function takes to execute.

```typescript
import { Benchmark } from 'extension-benchmark';

const { result, durationMs } = await Benchmark.time('myFunction', () => {
  // Your code here
  doWork();
});

console.log(`Execution took ${durationMs}ms`);
```

### Running Multiple Iterations

Run a benchmark multiple times to get average, min, and max execution times.

```typescript
import { Benchmark } from 'extension-benchmark';

const result = await Benchmark.run('myFunction', () => {
  doWork();
}, 1000); // Run 1000 iterations

console.log(Benchmark.formatResults([result]));
```

The result object contains:
- `name` - Benchmark identifier
- `runs` - Number of iterations
- `avgMs` - Average execution time in milliseconds
- `minMs` - Minimum execution time
- `maxMs` - Maximum execution time
- `opsPerSec` - Operations per second

### Comparing Two Implementations

Compare the performance of two different implementations.

```typescript
import { Benchmark } from 'extension-benchmark';

const comparison = await Benchmark.compare(
  'implementationA', () => implA(),
  'implementationB', () => implB(),
  100
);

console.log(`${comparison.faster} is faster by ${comparison.speedup}`);
```

### Memory Monitoring

Track memory usage before and after operations.

```typescript
import { MemoryMonitor } from 'extension-benchmark';

const before = MemoryMonitor.getCurrent();
await doHeavyOperation();
const after = MemoryMonitor.getCurrent();

console.log(`Memory increased by: ${after - before} bytes`);
```

### Periodic Memory Monitoring

Take snapshots of memory usage at regular intervals.

```typescript
import { MemoryMonitor } from 'extension-benchmark';

const monitor = new MemoryMonitor();

// Start monitoring every 5 seconds
const interval = monitor.startMonitoring(5000);

// Take a snapshot manually
monitor.snapshot();

// Get history of snapshots
const history = monitor.getHistory();
console.log(history);

// Stop monitoring
clearInterval(interval);
```

### Static Memory Utilities

```typescript
import { MemoryMonitor } from 'extension-benchmark';

// Get current memory usage in bytes
const current = MemoryMonitor.getCurrent();

// Get memory limit in bytes
const limit = MemoryMonitor.getLimit();

// Get usage percentage
const percent = MemoryMonitor.getUsagePercent();
```

## API REFERENCE

### Benchmark Class

**Benchmark.time(name, fn)**

Times a single function execution.

- `name` - Identifier for this measurement
- `fn` - Function to time (sync or async)
- Returns Promise resolving to `{ result: T, durationMs: number }`

**Benchmark.run(name, fn, runs)**

Runs a function multiple times and collects statistics.

- `name` - Identifier for this benchmark
- `fn` - Function to benchmark
- `runs` - Number of iterations (default: 100)
- Returns Promise resolving to `BenchmarkResult`

**Benchmark.compare(nameA, fnA, nameB, fnB, runs)**

Compares two implementations side by side.

- `nameA` - Name of first implementation
- `fnA` - First function
- `nameB` - Name of second implementation
- `fnB` - Second function
- `runs` - Number of iterations (default: 100)
- Returns Promise resolving to `{ a, b, faster, speedup }`

**Benchmark.formatResults(results)**

Formats benchmark results as a markdown table.

- `results` - Array of BenchmarkResult objects
- Returns string containing markdown table

### MemoryMonitor Class

**new MemoryMonitor()**

Creates a new memory monitor instance.

**monitor.snapshot()**

Takes a memory snapshot. Requires Chrome with performance.memory API.

**monitor.getHistory()**

Returns array of `{ timestamp, mb }` objects from all snapshots.

**monitor.startMonitoring(intervalMs)**

Starts periodic snapshotting.

- `intervalMs` - Interval in milliseconds (default: 5000)
- Returns NodeJS.Timeout

**MemoryMonitor.getCurrent()**

Static method. Returns current memory usage in bytes.

**MemoryMonitor.getLimit()**

Static method. Returns memory limit in bytes.

**MemoryMonitor.getUsagePercent()**

Static method. Returns percentage of available memory in use.

## BROWSER COMPATIBILITY

This library requires a Chrome environment with access to:
- `performance.now()` - High-resolution timing
- `performance.memory` - Chrome-specific memory metrics

These APIs are available in Chrome extensions and can be polyfilled for other environments.

## ABOUT

extension-benchmark is maintained by theluckystrike.

For questions and support, please open an issue on GitHub.

Learn more about extension development at https://zovo.one
