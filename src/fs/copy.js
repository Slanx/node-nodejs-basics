import { readdir, copyFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import isPathExist from './isPathExist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFiles = path.join(__dirname, 'files');
const pathToFilesCopy = path.join(__dirname, 'files-copy');

export const copy = async (pathToFiles, pathToFilesCopy) => {
  try {
    const isPathToFileCopy = await isPathExist(pathToFilesCopy);
    const isPathToFiles = await isPathExist(pathToFiles);

    if (isPathToFileCopy || !isPathToFiles) {
      throw new Error('FS operation failed');
    }

    const files = await readdir(pathToFiles, { withFileTypes: true });

    await mkdir(pathToFilesCopy);

    for (const file of files) {
      const pathToFile = path.join(pathToFiles, file.name);
      const pathToFileCopy = path.join(pathToFilesCopy, file.name);

      if (file.isFile()) {
        await copyFile(pathToFile, pathToFileCopy);
      } else {
        await copy(pathToFile, pathToFileCopy);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

copy(pathToFiles, pathToFilesCopy);
