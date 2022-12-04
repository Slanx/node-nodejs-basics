import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import isPathExist from './isPathExist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFiles = path.join(__dirname, 'files', 'fileToRead.txt');

export const read = async (pathToFile) => {
  try {
    const isPathToFile = await isPathExist(pathToFile);

    if (!isPathToFile) {
      throw new Error('FS operation failed');
    }

    const file = await readFile(pathToFile, 'utf-8');
    console.log(file);
  } catch (e) {
    console.error(e.message);
  }
};

read(pathToFiles);
