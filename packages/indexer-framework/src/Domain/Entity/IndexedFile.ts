import HtmlData from './HtmlData';

export default class IndexedFile {
  public MainFolder = '';
  public IpfsHash = '';
  public FileName = '';
  public Errors: string[] = [];
  public Success = true;
  public IsHtml = false;
  public Content = '';
  public HtmlData: HtmlData = new HtmlData();
}
