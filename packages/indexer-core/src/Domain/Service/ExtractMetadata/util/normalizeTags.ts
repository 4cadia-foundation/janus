const removeSurroundingWhitespaces = (tag: string): string => tag.trim();

const toLowerCase = (tag: string): string => tag.toLowerCase();

const normalizeAccentedCharacters = (term: string): string =>
  term.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const onlyNonEmpty = (tag: string): boolean => tag !== '';

const unique = (tags: string[]): string[] => [...new Set(tags)];

export default function normalizeTags(tags: string[]): string[] {
  return unique(
    tags
      .map(removeSurroundingWhitespaces)
      .map(normalizeAccentedCharacters)
      .map(toLowerCase)
      .filter(onlyNonEmpty)
  );
}
