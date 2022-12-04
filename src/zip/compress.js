import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToCompress.txt');
const pathToGzipFile = path.join(__dirname, 'files', 'archive.gz');

export const compress = async (pathToFile, pathToGzipFile) => {
  const gzip = createGzip();
  const source = createReadStream(pathToFile);
  const destination = createWriteStream(pathToGzipFile);
  pipeline(source, gzip, destination, (err) => {
    if (err) {
      throw new Error('FS operation failed');
    }
  });
};

compress(pathToFile, pathToGzipFile);
