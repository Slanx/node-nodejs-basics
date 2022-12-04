import { pipeline, Transform } from 'stream';
import { stdin, stdout } from 'process';

class ReverseTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const resultString = `${chunk.toString('utf8').split('').reverse().join('')} \n`;

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

export const transform = async () => {
  const transofrmStream = new ReverseTransformStream();

  pipeline(stdin, transofrmStream, stdout, (err) => {
    if (err) {
      throw new Error('FS operation failed');
    }
  });
};

transform();
