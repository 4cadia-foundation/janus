import ContentMetadata from '../../Entity/ContentMetadata';
import unfluff from 'unfluff';

function normalizeAccentedCharacters(term: string): string {
  return term.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const removeEmptyStrings = (str: string): boolean => str !== '';

function tagsFromKeywords(keywords: string): string[] {
  return normalizeAccentedCharacters(keywords)
    .toLowerCase()
    .split(' ')
    .filter(removeEmptyStrings);
}

export default function fromHtmlMetaTags(htmlInput: string): ContentMetadata {
  const { title, description, keywords } = unfluff(htmlInput);

  const tags = keywords ? tagsFromKeywords(keywords) : [];

  return {
    title: title || '',
    description: description || '',
    tags,
  };
}
