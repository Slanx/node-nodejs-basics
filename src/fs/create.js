import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import isPathExist from './isPathExist.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fresh.txt');
const description = 'I am fresh and young';

export const create = async (pathToFile, description) => {
  try {
    const isPath = await isPathExist(pathToFile);

    if (isPath) {
      throw new Error('FS operation failed');
    }

    await writeFile(pathToFile, description);
  } catch (err) {
    console.log(err);
  }
};

create(pathToFile, description);
