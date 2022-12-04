import { rm } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import isPathExist from './isPathExist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToRemove.txt');

export const remove = async (pathToFile) => {
  try {
    const isPathToFile = await isPathExist(pathToFile);

    if (!isPathToFile) {
      throw new Error('FS operation failed');
    }

    await rm(pathToFile);
  } catch (e) {
    console.error(e.message);
  }
};

remove(pathToFile);
