export async function fileReaderAsPromised(file: File): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const content = await new Promise<string>((resolve, reject): void => {
    reader.onload = (): void => {
      resolve(reader.result as string);
    };

    reader.onerror = (error): void => {
      reject(error);
    };
  });

  return content.replace(/^data:.*\/.*;base64,/i, '');
}
