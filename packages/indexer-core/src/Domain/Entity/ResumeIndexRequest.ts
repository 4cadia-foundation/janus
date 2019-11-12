import IndexRequest from './IndexRequest';
import ContentMetadata from './ContentMetadata';

export default class ResumeIndexRequest {
  public indexRequest: IndexRequest;
  public metadata: ContentMetadata;
  public suggestions?: string[];
  public warnings?: string[];

  constructor(indexRequest: IndexRequest) {
    this.indexRequest = indexRequest;
    this.metadata = new ContentMetadata();
  }
}
