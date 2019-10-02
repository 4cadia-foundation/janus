import { fromFileSystem } from './fromFileSystem';
import { fromZipString } from './fromZipString';

export async function fromZip(
  fileName: string,
  zipFilePath: string
): Promise<string> {
  const fileContent = await fromFileSystem(zipFilePath, { encoding: 'base64' });
  return fromZipString(fileName, fileContent);
}
