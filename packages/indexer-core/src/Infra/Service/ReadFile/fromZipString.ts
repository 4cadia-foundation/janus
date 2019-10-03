import { dirname, join } from 'path';
import JSZip from 'jszip';
import { attachCause } from '../../../Domain/Error/';

type JSZipFilterPredicate = (
  relativePath: string,
  file: JSZip.JSZipObject
) => boolean;

const anyFile = (): boolean => true;

const isDir = (entry: JSZip.JSZipObject): boolean => entry.dir;

const isTopLevelPath = (path: string): boolean => dirname(path) === '.';

const matchesFileName = (actual: string, expected: string): boolean =>
  actual === expected;

function findFile(
  fileName: string,
  zipFiles: JSZip,
  filterFiles: JSZipFilterPredicate = anyFile
): JSZip.JSZipObject | undefined {
  const findMatchingFile = (file: JSZip.JSZipObject): boolean =>
    !isDir(file) && matchesFileName(fileName, file.name);

  const pathList = zipFiles.filter(filterFiles);
  return pathList.find(findMatchingFile);
}

function findRootDirectory(zipFiles: JSZip): JSZip.JSZipObject {
  const onlyTopLevelDirectoreis: JSZipFilterPredicate = (relativePath, file) =>
    isDir(file) && isTopLevelPath(file.name);

  const topLevelDirectories = zipFiles.filter(onlyTopLevelDirectoreis);

  if (topLevelDirectories.length === 1) {
    return topLevelDirectories[0];
  }

  throw new Error('Zip file should contain a single top-level directory');
}

interface Options {
  encoding: JSZip.InputType;
}

export async function fromZipString(
  fileName: string,
  zipContent: string,
  { encoding = 'base64' }: Partial<Options> = {}
): Promise<string> {
  const zip = new JSZip();
  let zipFiles: JSZip;

  try {
    zipFiles = await zip.loadAsync(zipContent, { [encoding]: true });
  } catch (err) {
    throw attachCause(new Error('Corrupted zip file'), err);
  }

  const rootDirectory = findRootDirectory(zipFiles);
  const file = findFile(join(rootDirectory.name, fileName), zipFiles);

  if (!file) {
    throw new Error(
      `File "${rootDirectory}/${fileName}" not found inside the zip file`
    );
  }

  return file.async('text');
}
