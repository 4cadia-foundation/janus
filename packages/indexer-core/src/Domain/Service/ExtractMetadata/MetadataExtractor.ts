import ContentMetadata from '../../Entity/ContentMetadata';

export interface MetadataExtractor {
  (content: string): ContentMetadata;
}
