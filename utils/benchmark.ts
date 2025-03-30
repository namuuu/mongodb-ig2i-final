import timer from "./timer";

type BenchmarkCallback = (batchSize: number) => Promise<void>;

class Benchmark {
    private batchSizes: number[];
    private numberOfTests: number;
    private beforeEachTest: BenchmarkCallback = async () => {};
    private executeTest: BenchmarkCallback = async () => {};
    private results: { batchSize: number; meanTime: number }[];
	private name: string = "Benchmark";

    constructor(batchSizes: number[],numberOfTests: number) {
        this.batchSizes = batchSizes;
        this.numberOfTests = numberOfTests;
        this.results = [];
    }

	setBeforeEachTest(callback: BenchmarkCallback) {
		this.beforeEachTest = callback;
	}

	setExecuteTest(callback: BenchmarkCallback) {
		this.executeTest = callback;
	}

	setName(name: string) {
		this.name = name;
	}


    async launch() {
        for (const batchSize of this.batchSizes) {
            let testTimes: number[] = [];

            console.log(`Running ${this.name} with batchSize ${batchSize}:`);

            for (let i = 0; i < this.numberOfTests; i++) {
                await this.beforeEachTest(batchSize);
				timer.start();
                await this.executeTest(batchSize);
				timer.stop();
                const duration = timer.getDuration();
                testTimes.push(duration);

                console.log(`\tTest ${i + 1}: Executed in ${duration.toFixed(2)} ms`);
            }

            const meanTime = testTimes.reduce((a, b) => a + b, 0) / testTimes.length;
            this.results.push({ batchSize, meanTime });

            console.log(`Mean time for batchSize ${batchSize}: ${meanTime.toFixed(2)} ms`);
        }

        console.log("\nBenchmark Results:");
        console.table(this.results);
		return this.results;
    }
}

export default Benchmark;