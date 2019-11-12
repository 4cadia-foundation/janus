import { fromHtmlMetaTags } from './fromHtmlMetaTags';
import ContentMetadata from '../../Entity/ContentMetadata';

describe('Extracts metadata from HTML Meta Tags', () => {
  describe('When input is a valid HTML', () => {
    it('Should extract title, description and keywords when they are all present in the document', () => {
      const input = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="keywords" content="test1 test2" />
          <meta name="description" content="Test Description" />
          <title>Test Title</title>
        </head>

        <body>
          <h1>My Test Template</h1>
        </body>
      </html>
    `;
      const expected: ContentMetadata = {
        title: 'Test Title',
        description: 'Test Description',
        tags: ['test1', 'test2'],
      };

      const actual: ContentMetadata = fromHtmlMetaTags(input);

      expect(actual).toEqual(expected);
    });

    it('Should extract keywords without accented characters', () => {
      const input = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="keywords" content="á é í ó ú" />
          <meta name="description" content="Test Description" />
          <title>Test Title</title>
        </head>

        <body>
          <h1>My Test Template</h1>
        </body>
      </html>
    `;
      const expected = {
        title: 'Test Title',
        description: 'Test Description',
        tags: ['a', 'e', 'i', 'o', 'u'],
      };

      const actual = fromHtmlMetaTags(input);

      expect(actual).toEqual(expected);
    });

    it('Should not extract any tags when meta keywords is missing', () => {
      const input = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="description" content="Test Description" />
          <title>Test Title</title>
        </head>

        <body>
          <h1>My Test Template</h1>
        </body>
      </html>
    `;
      const expected: ContentMetadata = {
        title: 'Test Title',
        description: 'Test Description',
        tags: [],
      };

      const actual: ContentMetadata = fromHtmlMetaTags(input);

      expect(actual).toEqual(expected);
    });

    it('Should not extract description when meta description is missing', () => {
      const input = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="keywords" content="test1 test2" />
          <title>Test Title</title>
        </head>

        <body>
          <h1>My Test Template</h1>
        </body>
      </html>
    `;
      const expected: ContentMetadata = {
        title: 'Test Title',
        description: '',
        tags: ['test1', 'test2'],
      };

      const actual: ContentMetadata = fromHtmlMetaTags(input);

      expect(actual).toEqual(expected);
    });

    it('Should extract keywords without extra whitespaces', () => {
      const input = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="keywords" content="test1          test2" />
          <meta name="description" content="Test Description" />
          <title>Test Title</title>
        </head>

        <body>
          <h1>My Test Template</h1>
        </body>
      </html>
    `;
      const expected: ContentMetadata = {
        title: 'Test Title',
        description: 'Test Description',
        tags: ['test1', 'test2'],
      };

      const actual: ContentMetadata = fromHtmlMetaTags(input);

      expect(actual).toEqual(expected);
    });
  });

  describe('When input is not a valid HTML', () => {
    it('Should throw an error describing the problem', () => {
      // Arrange
      const input = 'This is not and HTML!';

      // Act

      // Assert
      expect(() => fromHtmlMetaTags(input)).toThrowError(
        /invalid html document/i
      );
    });
  });
});
