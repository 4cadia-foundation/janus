import * as fs from 'fs-extra';

export interface Options {
  encoding: BufferEncoding;
}

export async function fromFileSystem(
  filePath: string,
  { encoding = 'utf8' }: Partial<Options> = {}
): Promise<string> {
  await fs.access(filePath, fs.constants.R_OK);
  return fs.readFile(filePath, { encoding });
}
