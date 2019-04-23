import IndexRequest from './IndexRequest';
import MetadataFile from './MetadataFile';

export default class ResumeIndexRequest {
  public indexRequest: IndexRequest;
  public metadata: MetadataFile;
  public suggestions?: Array<string>;
  public warnings?: Array<string>;

  constructor(indexRequest: IndexRequest) {
    this.indexRequest = indexRequest;
    this.metadata = new MetadataFile();
  }
}
