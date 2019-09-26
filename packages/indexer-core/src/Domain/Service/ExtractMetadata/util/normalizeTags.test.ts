import normalizeTags from './normalizeTags';

describe('Normalize metadata tags', () => {
  it('Should return the input as is when all tags are valid', () => {
    const input = ['a', 'set', 'of', 'tags'];
    const expected = ['a', 'set', 'of', 'tags'];

    const actual = normalizeTags(input);

    expect(actual).toEqual(expected);
  });

  it('Should convert all tags to lower case', () => {
    const input = ['A', 'Set', 'OF', 'tags'];
    const expected = ['a', 'set', 'of', 'tags'];

    const actual = normalizeTags(input);

    expect(actual).toEqual(expected);
  });

  it('Should remove empty/whitespace-only tags from the result', () => {
    const input = ['a', 'set', '   ', 'of', 'tags'];
    const expected = ['a', 'set', 'of', 'tags'];

    const actual = normalizeTags(input);

    expect(actual).toEqual(expected);
  });

  it('Should remove whitespaces surrounding individual tags', () => {
    const input = ['   a ', '    set', 'of     ', 'tags'];
    const expected = ['a', 'set', 'of', 'tags'];

    const actual = normalizeTags(input);

    expect(actual).toEqual(expected);
  });

  it('Should remove duplicate tags', () => {
    const input = ['a', 'list', 'of', 'duplicated', 'tags', 'duplicated'];
    const expected = ['a', 'list', 'of', 'duplicated', 'tags'];

    const actual = normalizeTags(input);

    expect(actual).toEqual(expected);
  });

  it('Should replace accented characters with their normalized ones', () => {
    const input = ['licença', 'poética'];
    const expected = ['licenca', 'poetica'];

    const actual = normalizeTags(input);

    expect(actual).toEqual(expected);
  });

  it('Should remove duplicate tags when they are accented variations of another one', () => {
    const input = ['licença', 'poética', 'poetica'];
    const expected = ['licenca', 'poetica'];

    const actual = normalizeTags(input);

    expect(actual).toEqual(expected);
  });
});
