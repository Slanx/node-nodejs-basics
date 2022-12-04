import { createReadStream } from 'fs';
import { pipeline } from 'stream';
import path from 'path';
import { stdout } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFiles = path.join(__dirname, 'files', 'fileToRead.txt');

export const read = async (pathToFile) => {
  const readStream = createReadStream(pathToFile, 'utf-8');
  pipeline(readStream, stdout, (err) => {
    if (err) {
      throw new Error('FS operation failed');
    }
  });
};

read(pathToFiles);
