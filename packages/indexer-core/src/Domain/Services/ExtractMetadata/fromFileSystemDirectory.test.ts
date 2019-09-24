import { resolve } from 'path';
import fromFileSystemDirectory from './fromFileSystemDirectory';

function getFixtureDir(dir: string): string {
  return resolve(__dirname, dir);
}

describe('When janus.json is present', () => {
  it('Should extract metadata from janus.json when index.html exists', async () => {
    const input = getFixtureDir(
      './__fixtures__/with_janus-json_and_index-html'
    );
    const expected = {
      title: 'Test Title from JSON',
      description: 'Test Description from JSON',
      tags: ['tag1-json', 'tag2-json'],
    };

    const actual = await fromFileSystemDirectory(input);

    expect(actual).toEqual(expected);
  });

  it('Should extract metadata from janus.json when index.html does not exists', async () => {
    const input = getFixtureDir('./__fixtures__/with_janus-json_only');
    const expected = {
      title: 'Test Title from JSON',
      description: 'Test Description from JSON',
      tags: ['tag1-json', 'tag2-json'],
    };

    const actual = await fromFileSystemDirectory(input);

    expect(actual).toEqual(expected);
  });
});

describe('When janus.json is not present', () => {
  it('Should extract metadata from index.html when it exists', async () => {
    const input = getFixtureDir('./__fixtures__/with_index-html_only');
    const expected = {
      title: 'Test Title',
      description: 'Test Description',
      tags: ['tag1', 'tag2'],
    };

    const actual = await fromFileSystemDirectory(input);

    expect(actual).toEqual(expected);
  });

  it('Should not extract any metadata from other files in the folder', async () => {
    const input = getFixtureDir(
      './__fixtures__/without_janus-json_and_index-html'
    );
    const expected = {
      title: '',
      description: '',
      tags: [],
    };

    const actual = await fromFileSystemDirectory(input);

    expect(actual).toEqual(expected);
  });
});
