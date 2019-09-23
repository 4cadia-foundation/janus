export default class TextHelper {
  public static GetFileExtension(fileName: string): string {
    const lastIndexOfDot = fileName.lastIndexOf('.');
    return lastIndexOfDot > -1 ? fileName.slice(lastIndexOfDot + 1) : '';
  }

  public static IsFile(fileName: string): boolean {
    return this.GetFileExtension(fileName).length > 0;
  }

  public static FileIsHtml(fileName: string): boolean {
    const extension = this.GetFileExtension(fileName).toLowerCase();
    return extension === 'html' || extension === 'htm';
  }
}
