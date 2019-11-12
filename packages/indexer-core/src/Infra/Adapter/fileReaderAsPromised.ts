export async function fileReaderAsPromised(file: File): Promise<string> {
  const content = await new Promise<string>((resolve, reject): void => {
    const reader = new FileReader();

    reader.onload = (): void => {
      resolve(reader.result as string);
      reader.onload = null;
    };

    reader.onerror = (): void => {
      reader.abort();
      reject(new Error('Failed to load file'));
      reader.onerror = null;
    };

    reader.readAsDataURL(file);
  });

  const delimiter = 'base64,';
  const start = content.indexOf(delimiter);
  return content.slice(start + delimiter.length);
}
