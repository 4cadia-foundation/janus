import { resolve } from 'path';
import { fromZip } from './fromZip';

const getFixture = (fileName: string): string => {
  return resolve(__dirname, '__fixtures__', 'fromZip', fileName);
};

describe('Read File from Zip #integration', () => {
  describe('When file is in the top-level of the zip', () => {
    it('Should load the required file contents', async () => {
      const zipFileName = getFixture('top-level.zip');
      const fileName = 'janus.json';

      const expected = {
        version: 'a2',
        tags: ['azul', 'sofa', 'loja'],
        title: 'Minha Loja',
        description: 'Loja de sofás azuis',
      };

      const actual = JSON.parse(await fromZip(fileName, zipFileName));

      expect(actual).toEqual(expected);
    });
  });

  describe('When file is nested in a single top-level folder in the zip', () => {
    it('Should load the required file contents', async () => {
      const zipFileName = getFixture('root-folder.zip');
      const fileName = 'janus.json';

      const expected = {
        version: 'a2',
        tags: ['azul', 'sofa', 'loja'],
        title: 'Minha Loja',
        description: 'Loja de sofás azuis',
      };

      const actual = JSON.parse(await fromZip(fileName, zipFileName));

      expect(actual).toEqual(expected);
    });
  });

  describe('When file does not exist in the zip', () => {
    it('Should throw an error informing the client', async () => {
      const zipFileName = getFixture('top-level.zip');
      const fileName = '__unexistent-file.json';

      expect(fromZip(fileName, zipFileName)).rejects.toThrowError(
        /File ".*" not found/i
      );
    });
  });

  describe('When there are more than one top-level folder', () => {
    it('Should throw an error regarding the unexpected condition', async () => {
      const zipFileName = getFixture('two-top-level-folders.zip');
      const fileName = 'janus.json';

      expect(fromZip(fileName, zipFileName)).rejects.toThrowError(
        /zip file contains more than one top-level directory/i
      );
    });
  });

  describe('When the zip file is corrupted', () => {
    it('Should throw an error regarding the corruption', async () => {
      const zipFileName = getFixture('corrupted-file.zip');
      const fileName = 'janus.json';

      expect(fromZip(fileName, zipFileName)).rejects.toThrowError(
        /corrupted zip file/i
      );
    });
  });
});
