import { fromJson } from './fromJson';

describe('Extracts metadata from JSON', () => {
  describe('When input is a valid json', () => {
    it('Should extract title, description and tags when they are all present', () => {
      const input = `{
        "title": "Test title",
        "description": "Test description",
        "tags": ["tag1", "tag2"]
      }`;
      const expected = {
        title: 'Test title',
        description: 'Test description',
        tags: ['tag1', 'tag2'],
      };

      const actual = fromJson(input);

      expect(actual).toEqual(expected);
    });

    it('Should not extract any metadata when none of the properties are present', () => {
      const input = `{
      }`;
      const expected = {
        title: '',
        description: '',
        tags: [],
      };

      const actual = fromJson(input);

      expect(actual).toEqual(expected);
    });

    it('Should ignore any extra properties other than title, description and tags', () => {
      const input = `{
        "title": "Test title",
        "description": "Test description",
        "tags": ["tag1", "tag2"],
        "unusedProp": "unused value"
      }`;
      const expected = {
        title: 'Test title',
        description: 'Test description',
        tags: ['tag1', 'tag2'],
      };

      const actual = fromJson(input);

      expect(actual).toEqual(expected);
    });
  });

  describe('When input is not a valid json', () => {
    it('Should not extract any metadata', () => {
      const input = `Invalid JSON.`;
      const expected = {
        title: '',
        description: '',
        tags: [],
      };

      const actual = fromJson(input);

      expect(actual).toEqual(expected);
    });
  });
});
