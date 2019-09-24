import { join } from 'path';
import * as fs from 'fs-extra';
import ContentMetadata from '../../Entity/ContentMetadata';
import fromHtmlMetaTags from './fromHtmlMetaTags';

export default async function fromFileSystemDirectory(
  directoryPath: string
): Promise<ContentMetadata> {
  try {
    const filePath = join(directoryPath, 'janus.json');

    await fs.access(filePath);

    return fs.readJSON(filePath);
  } catch (err) {
    try {
      const filePath = join(directoryPath, 'index.html');

      await fs.access(filePath);

      const htmlContent = await fs.readFile(filePath, 'utf8');
      return fromHtmlMetaTags(htmlContent);
    } catch (err) {
      return {
        title: '',
        description: '',
        tags: [],
      };
    }
  }
}
