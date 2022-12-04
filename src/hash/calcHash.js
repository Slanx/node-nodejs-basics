import { createReadStream } from 'fs';
import { stdout } from 'process';
import { fileURLToPath } from 'url';
import path from 'path';
const { createHash } = await import('crypto');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

export const calculateHash = async (pathToFile) => {
  const hash = createHash('sha256');
  const source = createReadStream(pathToFile);
  source.pipe(hash).setEncoding('hex').pipe(stdout);
};

calculateHash(pathToFile);
