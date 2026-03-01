# extension-benchmark — Performance Benchmarking for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i extension-benchmark`

Measure execution time, A/B comparisons, memory monitoring, and throughput metrics.

```typescript
import { Benchmark, MemoryMonitor } from 'extension-benchmark';
const result = await Benchmark.run('myFunction', () => doWork(), 1000);
console.log(Benchmark.formatResults([result]));
```
MIT License
