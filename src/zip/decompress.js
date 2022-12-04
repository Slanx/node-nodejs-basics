import { createReadStream, createWriteStream } from 'fs';
import { createUnzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToCompress.txt');
const pathToUnZipFile = path.join(__dirname, 'files', 'archive.gz');

export const decompress = async (pathToUnZipFile, pathToFile) => {
  const unzip = createUnzip();
  const destination = createWriteStream(pathToFile);
  const source = createReadStream(pathToUnZipFile);
  pipeline(source, unzip, destination, (err) => {
    if (err) {
      throw new Error('FS operation failed');
    }
  });
};

decompress(pathToUnZipFile, pathToFile);
