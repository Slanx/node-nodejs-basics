import { rename as renameFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import isPathExist from './isPathExist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'wrongFilename.txt');
const pathToFileRename = path.join(__dirname, 'files', 'properFilename.md');

export const rename = async (pathToFile, pathToFileRename) => {
  try {
    const isPathToFileRename = await isPathExist(pathToFileRename);
    const isPathToFile = await isPathExist(pathToFile);

    if (isPathToFileRename || !isPathToFile) {
      throw new Error('FS operation failed');
    }

    await renameFile(pathToFile, pathToFileRename);
  } catch (e) {
    console.log(e);
  }
};

rename(pathToFile, pathToFileRename);
