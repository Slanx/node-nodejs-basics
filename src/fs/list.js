import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import isPathExist from './isPathExist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFiles = path.join(__dirname, 'files');

export const list = async (pathToFiles) => {
  try {
    const isPathToFiles = await isPathExist(pathToFiles);

    if (!isPathToFiles) {
      throw new Error('FS operation failed');
    }

    const files = await readdir(pathToFiles);

    for (const file of files) {
      console.log(file);
    }
  } catch (e) {
    console.log(e);
  }
};

list(pathToFiles);
