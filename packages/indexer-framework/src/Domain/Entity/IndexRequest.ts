import { ContentType } from './ContentType';

export default class IndexRequest {
  public Content: any;
  public ContentType: ContentType = ContentType.File;
  public Address = '';
  public IpfsHashExists = false;
  public ValidZip = '';
}
