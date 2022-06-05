import { cpus } from "os";
import { Worker, isMainThread } from "worker_threads";

const CPUS = cpus();

export const performCalculations = async () => {
  if (isMainThread) {
    const workers = CPUS.map((cpu, index) => {
      return runWorker("./worker.js", 10 + index);
    });

    return await Promise.all(workers.map((worker) => worker));
  }
};

function runWorker(path, workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path, { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

performCalculations().then((result) => {
  console.log(result);
});
