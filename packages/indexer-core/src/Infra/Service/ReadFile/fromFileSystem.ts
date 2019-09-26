import { promisify } from 'util';
import { access, readFile, constants } from 'fs';

export interface Options {
  encoding: BufferEncoding;
}

export async function fromFileSystem(
  filePath: string,
  { encoding = 'utf8' }: Partial<Options> = {}
): Promise<string> {
  const accessAsync = promisify(access);
  const readFileAsync = promisify(readFile);

  await accessAsync(filePath, constants.R_OK);
  return readFileAsync(filePath, { encoding });
}
