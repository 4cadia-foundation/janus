import { ContentType } from './ContentType';

export default class IndexRequest {
  public Content: string | File = '';
  public ContentType: ContentType = ContentType.File;
  public Address = '';
  public IpfsHashExists = false;
  public ValidZip = '';
}
