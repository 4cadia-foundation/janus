import unfluff from 'unfluff';
import isHtml from 'is-html';
import ContentMetadata from '../../Entity/ContentMetadata';
import normalizeTags from './util/normalizeTags';

const tagsFromKeywords = (keywords: string): string[] => keywords.split(' ');

export function fromHtmlMetaTags(htmlInput: string): ContentMetadata {
  if (!isHtml(htmlInput)) {
    throw new Error('Invalid HTML document');
  }

  const { title, description, keywords } = unfluff(htmlInput);

  const tags = keywords ? normalizeTags(tagsFromKeywords(keywords)) : [];

  return {
    title: title || '',
    description: description || '',
    tags,
  };
}
