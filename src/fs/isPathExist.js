import { access } from 'fs/promises';

const isPathExist = async (path) => {
  try {
    await access(path);

    return true;
  } catch {
    return false;
  }
};

export default isPathExist;
