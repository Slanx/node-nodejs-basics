import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runWorker = (workerData) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'), { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

export const performCalculations = async (workerData) => {
  const numbersOfCPU = os.cpus().length;

  let arrayOfResults = [];

  for (let i = 0; i < numbersOfCPU; i++) {
    const result = runWorker(workerData + i);
    arrayOfResults.push(
      result
        .then((res) => {
          return {
            data: res,
            status: 'resolved',
          };
        })
        .catch(() => {
          return {
            data: null,
            status: 'error',
          };
        }),
    );
  }
  return Promise.all(arrayOfResults);
};

(async () => {
  console.log(await performCalculations(10));
})();
