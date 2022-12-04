import { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import path from 'path';
import { stdin } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFiles = path.join(__dirname, 'files', 'fileToWrite.txt');

export const write = async (pathToFile) => {
  const writeStream = createWriteStream(pathToFile, 'utf-8');
  pipeline(stdin, writeStream, (err) => {
    if (err) {
      throw new Error('FS operation failed');
    }
  });
};

write(pathToFiles);
