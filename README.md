# extension-benchmark — Performance Benchmarking for Extensions

> **Built by [Zovo](https://zovo.one)** | `npm i extension-benchmark`

Measure execution time, A/B comparisons, memory monitoring, and throughput metrics for Chrome extensions.

## Features

- **Execution Timing** - Measure how long functions take to run
- **Memory Monitoring** - Track memory usage before/after operations
- **A/B Comparisons** - Compare performance of two implementations
- **Throughput Metrics** - Measure operations per second
- **Formatted Results** - Human-readable output

## Installation

```bash
npm install extension-benchmark
```

## Usage

### Basic Timing

```typescript
import { Benchmark } from 'extension-benchmark';

const result = await Benchmark.run('myFunction', () => {
  // Your code here
  doWork();
}, 1000); // Run 1000 iterations

console.log(Benchmark.formatResults([result]));
```

### Memory Monitoring

```typescript
import { MemoryMonitor } from 'extension-benchmark';

const before = MemoryMonitor.getCurrentMemory();
await doHeavyOperation();
const after = MemoryMonitor.getCurrentMemory();

console.log(`Memory increased by: ${after - before} bytes`);
```

### A/B Comparison

```typescript
import { Benchmark, compare } from 'extension-benchmark';

const resultA = await Benchmark.run('implementationA', () => implA(), 100);
const resultB = await Benchmark.run('implementationB', () => implB(), 100);

compare([resultA, resultB]).forEach(console.log);
```

### Throughput Metrics

```typescript
import { Benchmark } from 'extension-benchmark';

const throughput = await Benchmark.measureThroughput(
  'operations',
  () => processItem(),
  1000
);

console.log(`Throughput: ${throughput} ops/sec`);
```

## API Reference

### Benchmark.run(name, fn, iterations)

Run a function multiple times and measure execution time.

- `name` - Identifier for this benchmark
- `fn` - Function to benchmark (synchronous)
- `iterations` - Number of times to run

Returns a `BenchmarkResult` with:
- `name` - Benchmark name
- `mean` - Average execution time (ms)
- `median` - Median execution time (ms)
- `stdDev` - Standard deviation
- `min` / `max` - Range of results

### Benchmark.formatResults(results)

Format benchmark results for console output.

### MemoryMonitor.getCurrentMemory()

Get current memory usage. Returns object with:
- `heapUsed` - V8 heap used (bytes)
- `heapTotal` - V8 heap total (bytes)
- `external` - External memory (bytes)

### Benchmark.measureThroughput(name, fn, maxIterations)

Measure how many operations can be completed per second.

## Browser Compatibility

Works in Chrome extensions with access to:
- `performance.now()`
- `performance.memory` (Chrome-specific)

## License

MIT License
