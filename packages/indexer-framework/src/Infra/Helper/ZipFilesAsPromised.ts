import JSZip from 'jszip';
const zip = new JSZip();

export async function zipFilesAsPromised(file: File) {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  const zipFiles = await new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = error => {
      reject(error);
    };
  });

  const content = zipFiles.slice(
    (reader.result as string).indexOf('base64') + 7
  );

  return zip.loadAsync(content, { base64: true });
}

export async function loadFileFromZipFile(
  filePath: string,
  zipFolder: JSZip
): Promise<string> {
  try {
    const file = zip.file(filePath);

    if (file) {
      return file.async('text');
    }
    return '';
  } catch (error) {
    throw new Error(error);
  }
}
