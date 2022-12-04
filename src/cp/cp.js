import path from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToScript = path.join(__dirname, 'files', 'script.js');

export const spawnChildProcess = async (args) => {
  const child = fork(pathToScript, [args], { silent: true });

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    const messageChild = `(Child) ${data}`;
    process.stdout.write(`${messageChild}`);
    process.stdout.write(`(Master) resived from Child: ${messageChild}`);
  });
};

spawnChildProcess('1 2 2 4 5');
