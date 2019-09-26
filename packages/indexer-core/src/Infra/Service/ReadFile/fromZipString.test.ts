import { promisify } from 'util';
import { resolve } from 'path';
import { readFile } from 'fs';
import { fromZipString } from './fromZipString';

const readFileAsync = promisify(readFile);

const getFixture = (fileName: string): Promise<string> => {
  const filePath = resolve(__dirname, '__fixtures__', 'fromZip', fileName);
  return readFileAsync(filePath, { encoding: 'base64' });
};

describe('Read File from Zip', () => {
  describe('When file is in the top-level of the zip', () => {
    it('Should load the required file contents', async () => {
      const fileName = 'janus.json';
      const zipContent = await getFixture('top-level.zip');

      const expected = {
        version: 'a2',
        tags: ['azul', 'sofa', 'loja'],
        title: 'Minha Loja',
        description: 'Loja de sofás azuis',
      };

      const actual = JSON.parse(await fromZipString(fileName, zipContent));

      expect(actual).toEqual(expected);
    });
  });

  describe('When file is nested in a single top-level folder in the zip', () => {
    it('Should load the required file contents', async () => {
      const fileName = 'janus.json';
      const zipContent = await getFixture('root-folder.zip');

      const expected = {
        version: 'a2',
        tags: ['azul', 'sofa', 'loja'],
        title: 'Minha Loja',
        description: 'Loja de sofás azuis',
      };

      const actual = JSON.parse(await fromZipString(fileName, zipContent));

      expect(actual).toEqual(expected);
    });
  });

  describe('When file does not exist in the zip', () => {
    it('Should throw an error informing the client', async () => {
      const fileName = '__unexistent-file.json';
      const zipContent = await getFixture('top-level.zip');

      expect(fromZipString(fileName, zipContent)).rejects.toThrowError(
        /File ".*" not found/i
      );
    });
  });

  describe('When there are more than one top-level folder', () => {
    it('Should throw an error regarding the unexpected condition', async () => {
      const fileName = 'janus.json';
      const zipContent = await getFixture('two-top-level-folders.zip');

      expect(fromZipString(fileName, zipContent)).rejects.toThrowError(
        /zip file contains more than one top-level directory/i
      );
    });
  });

  describe('When the zip file is corrupted', () => {
    it('Should throw an error regarding the corruption', async () => {
      const fileName = 'janus.json';
      const zipContent = await getFixture('corrupted-file.zip');

      expect(fromZipString(fileName, zipContent)).rejects.toThrowError(
        /corrupted zip file/i
      );
    });
  });
});
