import { join, basename, dirname } from 'path';
import { injectable, inject } from 'tsyringe';
import JSZip from 'jszip';
import keywordExtractor from 'keyword-extractor';
import IIpfsService from '../Interface/IIpfsService';
import IndexedFile from '../../Domain/Entity/IndexedFile';
import IndexRequest from '../../Domain/Entity/IndexRequest';
import ISpiderService from '../Interface/ISpiderService';
import { ContentType } from '../../Domain/Entity/ContentType';
import SpiderValidator from '../../Application/Validator/SpiderValidator';
import IpfsFile from '../../Domain/Entity/IpfsFile';
import { HtmlLanguage } from '../../Domain/Entity/HtmlLanguage';
import { fileReaderAsPromised } from '../../Infra/Adapter';
import ResumeIndexRequest from '../../Domain/Entity/ResumeIndexRequest';
import IIndexerService from '../Interface/IIndexerService';
import ContentMetadata from '../../Domain/Entity/ContentMetadata';
import { attachCause } from '../../Domain/Error';
import {
  fromHtmlMetaTags,
  fromJson,
} from '../../Domain/Service/ExtractMetadata';
import { fromFileSystem, fromZipString } from '../../Infra/Service/ReadFile';

export function GetNormalizedText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

@injectable()
export default class SpiderService implements ISpiderService {
  private _ipfsService: IIpfsService;

  constructor(@inject('IIpfsService') _ipfsService: IIpfsService) {
    this._ipfsService = _ipfsService;
  }

  public async extractResumeIndexRequest(
    indexRequest: IndexRequest
  ): Promise<ResumeIndexRequest> {
    const resume = new ResumeIndexRequest(indexRequest);

    switch (indexRequest.ContentType) {
      case ContentType.File:
        resume.metadata = await this.extractMetadataFromHtmlFile(
          indexRequest.Content as string
        );
        return resume;

      case ContentType.Folder:
        resume.metadata = await this.extractMetadataFromFolder(
          indexRequest.Content as string
        );
        return resume;

      case ContentType.Zip:
        resume.metadata = await this.extractMetadataFromZip(
          indexRequest.Content as File
        );
        return resume;

      case ContentType.Hash:
        try {
          return new Promise<ResumeIndexRequest>((resolve, reject): void =>
            this._ipfsService.getIpfsFile(
              indexRequest.Content as string,
              async (error, fileResult) => {
                if (error) {
                  reject(error);
                } else {
                  resume.metadata = fromHtmlMetaTags(fileResult);
                  resolve(resume);
                }
              }
            )
          );
        } catch (error) {
          throw new Error(
            `Error on ExtractResumeIndexRequest - Hash: ${error}`
          );
        }
        break;

      default:
        throw new Error('ContentType is required');
    }
  }

  public addContent(indexRequest: IndexRequest, callback: any): void {
    const files: IndexedFile[] = [];
    switch (indexRequest.ContentType) {
      case ContentType.File:
        this._ipfsService.addIpfsFile(
          indexRequest.Content as string,
          (ipfsHash, fileText) => {
            const file = new IndexedFile();
            file.IpfsHash = ipfsHash;
            file.Content = fileText;
            files.push(file);
            callback(null, files);
          }
        );
        break;
      case ContentType.Folder:
        const mainFolder = this.GetMainFolder(indexRequest.Content as string);
        this._ipfsService.addIpfsFolder(
          indexRequest.Content as string,
          (err, filesResult) => {
            if (err) {
              return callback(err);
            }

            let mainHash = '';

            filesResult.forEach(f => {
              if (f.path === mainFolder) {
                mainHash = f.hash;
              }

              const file = new IndexedFile();
              file.MainFolder = mainFolder;
              file.IpfsHash = f.hash;
              file.Content = f.fileText;
              files.push(file);
            });

            const result = this.ChangeToMainHash(mainHash, files);
            callback(null, result);
          }
        );
        break;
      case ContentType.Hash:
        this._ipfsService.getIpfsFile(
          indexRequest.Content as string,
          (error, fileResult) => {
            if (error) {
              return callback(error);
            }

            const file = new IndexedFile();
            file.IpfsHash = indexRequest.Content as string;
            if (fileResult.content) {
              file.Content = fileResult.content.toString('utf8');
            }
            files.push(file);

            return callback(null, files);
          }
        );
        break;
      case ContentType.Zip:
        this.AddContentFromZip(indexRequest, callback);
        break;
    }
  }

  public AddContentFromZip(indexRequest: IndexRequest, callback): void {
    const files: IndexedFile[] = [];
    const reader = new FileReader();
    reader.readAsDataURL(indexRequest.Content as File);

    reader.onload = (): void => {
      indexRequest.Content = (reader.result as string).slice(
        (reader.result as string).indexOf('base64') + 7
      );
      const fileArray: IpfsFile[] = [];
      const zip = new JSZip();
      zip.loadAsync(indexRequest.Content, { base64: true }).then(zipFiles => {
        let fileCount = 0;
        fileCount = zipFiles.filter((fn, f) => !f.dir).length;
        zipFiles.folder('').forEach((fileName, file) => {
          if (!file.dir) {
            file.async('base64').then(fileContent => {
              const ipfsFile = new IpfsFile();
              ipfsFile.path = fileName;
              ipfsFile.content = Buffer.from(fileContent, 'base64');
              fileArray.push(ipfsFile);
              if (fileArray.length === fileCount) {
                this._ipfsService.addIpfsFileList(
                  fileArray,
                  (err, fileResponse) => {
                    if (err) {
                      return callback(err);
                    }

                    const ipfsFiles = Array.from(fileResponse);
                    ipfsFiles.forEach(_ipfsFile => {
                      const fileArrayItem = fileArray.find(f => {
                        return f.path === (_ipfsFile as any).path;
                      });
                      if (fileArrayItem) {
                        const _file = new IndexedFile();
                        _file.IpfsHash = (_ipfsFile as any).hash;
                        _file.Content = fileArrayItem.content.toString();
                        _file.FileName = fileArrayItem.path;
                        files.push(_file);
                      }
                    });

                    const rootFile =
                      files.find(_file => {
                        const isIndexHtml =
                          basename(_file.FileName) === 'index.html';
                        const isInRootDirectory =
                          dirname(dirname(_file.FileName)) === '.';

                        return isIndexHtml && isInRootDirectory;
                      }) || files[0];

                    const rootDirectory = fileResponse.find(
                      _file => dirname(rootFile.FileName) === _file.path
                    );

                    if (!rootDirectory) {
                      return callback(
                        new Error(
                          'Zip file should contain a single top-level directory'
                        )
                      );
                    }

                    return callback(
                      null,
                      this.ChangeToMainHash(rootDirectory.hash, files)
                    );
                  }
                );
              }
            });
          }
        });
      });
    };
  }

  // TODO: Implementar Validator
  private async extractMetadataFromHtmlFile(
    pathContent: string
  ): Promise<ContentMetadata> {
    try {
      const htmlContent = await fromFileSystem(pathContent);
      return fromHtmlMetaTags(htmlContent);
    } catch (err) {
      throw attachCause(
        new Error('Error on ExtractResumeIndexRequest - File'),
        err
      );
    }
  }

  // TODO: Implementar Validator
  private async extractMetadataFromFolder(
    pathFolder: string
  ): Promise<ContentMetadata> {
    try {
      const jsonContent = await fromFileSystem(join(pathFolder, 'janus.json'));

      return fromJson(jsonContent);
    } catch (err) {
      try {
        const htmlContent = await fromFileSystem(
          join(pathFolder, 'index.html')
        );

        return fromHtmlMetaTags(htmlContent);
      } catch (innerErr) {
        throw attachCause(
          new Error(`Error on ExtractResumeIndexRequest - Folder`),
          attachCause(innerErr, err)
        );
      }
    }
  }

  // TODO: Implementar Validator
  private async extractMetadataFromZip(
    zipFile: File
  ): Promise<ContentMetadata> {
    const zipContent = await fileReaderAsPromised(zipFile);

    try {
      const jsonContent = await fromZipString('janus.json', zipContent);

      return fromJson(jsonContent);
    } catch (err) {
      try {
        const htmlContent = await fromZipString('index.html', zipContent);

        return fromHtmlMetaTags(htmlContent);
      } catch (innerErr) {
        throw attachCause(innerErr, err);
      }
    }
  }

  private GetTagSuggestion(htmlDoc: any): string[] {
    const htmlLang: HtmlLanguage = htmlDoc.lang as HtmlLanguage;
    const htmlLangName = HtmlLanguage[htmlLang];

    if (!htmlLangName || !htmlDoc.text) {
      return [];
    }

    const tags = keywordExtractor.extract(GetNormalizedText(htmlDoc.text), {
      language: htmlLangName,
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    });

    // let sortedTags = Object.keys(reducedObj)
    //     .filter((a) => reducedObj[a] > 1)
    //     .sort(function (a, b) {
    //         return reducedObj[b] - reducedObj[a];
    //     });
    // return sortedTags.slice(0, 5);
    return [];
  }

  private ChangeToMainHash(
    mainHash: string,
    files: IndexedFile[]
  ): IndexedFile[] {
    const result: IndexedFile[] = [];

    files.forEach(file => {
      const changedFile = new IndexedFile();
      changedFile.IpfsHash = mainHash;
      changedFile.FileName = file.FileName;
      changedFile.Errors = file.Errors || [];
      changedFile.Success = file.Success;
      changedFile.IsHtml = file.IsHtml;
      changedFile.Content = file.Content;
      changedFile.HtmlData = file.HtmlData;
      result.push(changedFile);
    });

    return result;
  }

  private GetMainFolder(content: string): string {
    const splitedContent = content.split('\\');
    let mainFolder = splitedContent[splitedContent.length - 1];

    if (!mainFolder) {
      mainFolder = splitedContent[splitedContent.length - 2];
    }

    return mainFolder;
  }
}
