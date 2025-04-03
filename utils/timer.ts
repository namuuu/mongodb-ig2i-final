import { performance } from "perf_hooks";

class Timer {
	private startTime: number = 0;
	private endTime: number = 0;

	public start() {
		this.startTime = performance.now();
	}

	public stop() {
		this.endTime = performance.now();
	}

	public getDuration(unit: "ms" | "s" = "ms"): number {
		const durationMs = this.endTime - this.startTime;

		if (unit === "s") {
			return durationMs / 1000; 
		}
		return durationMs;
	}
}

export default new Timer();
export { Timer };