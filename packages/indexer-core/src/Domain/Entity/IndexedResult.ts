import IndexedFile from './IndexedFile';
export default class IndexedResult {
  public IndexedFiles: IndexedFile[] = [];
  public Errors: string[] = [];
  public Success = true;
}
