import ContentMetadata from '../../Entity/ContentMetadata';

export function fromJson(jsonStr: string): ContentMetadata {
  try {
    const { title, description, tags } = JSON.parse(jsonStr);

    return {
      title: title || '',
      description: description || '',
      tags: tags || [],
    };
  } catch (err) {
    return {
      title: '',
      description: '',
      tags: [],
    };
  }
}
