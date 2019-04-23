import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import JSZip from 'jszip';
import IIpfsService from '../Interface/IIpfsService';
import HtmlData from '../../Domain/Entity/HtmlData';
import IndexedFile from '../../Domain/Entity/IndexedFile';
import IndexRequest from '../../Domain/Entity/IndexRequest';
import ISpiderService from '../Interface/ISpiderService';
import { ContentType } from '../../Domain/Entity/ContentType';
import SpiderValidator from '../../Application/Validator/SpiderValidator';
import IpfsFile from '../../Domain/Entity/IpfsFile';
import { HtmlLanguage } from '../../Domain/Entity/HtmlLanguage';
import ArrayHelper from '../../Infra/Helper/ArrayHelper';
import ResumeIndexRequest from '../../Domain/Entity/ResumeIndexRequest';
import IIndexerService from '../Interface/IIndexerService';
import MetadataFile from '../../Domain/Entity/MetadataFile';
import {
  zipFilesAsPromised,
  loadFileFromZipFile,
} from '../../Infra/Helper/ZipFilesAsPromised';
import { resolve } from 'multiaddr';
import { rejects } from 'assert';
import ipfs from 'ipfs-http-client';
import isHtml = require('is-html');
import keywordExtractor = require('keyword-extractor');
import unfluff = require('unfluff');

const fsAsync = fs.promises;

export function GetMetaTag(ipfsHtml, metaName): string {
  const metas = ipfsHtml.getElementsByTagName('meta');
  for (const meta of metas) {
    if (meta.getAttribute('name') === metaName) {
      const rawMeta = meta.getAttribute('content');
      const formattedMeta = rawMeta
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      return formattedMeta;
    }
  }
  return null;
}

export function GetTitleValue(ipfsHtml): string {
  const title = ipfsHtml.getElementsByTagName('title')[0];
  return title ? title.textContent : null;
}

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

  public async ExtractResumeIndexRequest(
    indexRequest: IndexRequest
  ): Promise<ResumeIndexRequest> {
    let resume = new ResumeIndexRequest(indexRequest);

    switch (indexRequest.ContentType) {
      case ContentType.File:
        try {
          resume = await this.FillMetadataFromHtmlFile(
            indexRequest.Content,
            resume
          );
        } catch (error) {
          throw new Error(
            `Error on ExtractResumeIndexRequest - File: ${error}`
          );
        }
        break;

      case ContentType.Folder:
        try {
          resume = await this.FillMetadataFromFolder(
            indexRequest.Content,
            resume
          );
        } catch (error) {
          throw new Error(
            `Error on ExtractResumeIndexRequest - Folder: ${error}`
          );
        }
        break;

      case ContentType.Hash:
        try {
          this._ipfsService.GetIpfsFile(
            indexRequest.Content,
            async (error, fileResult) => {
              if (error) {
                console.log(error);
              } else {
                resume = await this.FillMetadataFromHtmlFile(
                  fileResult,
                  resume
                );
              }
            }
          );
        } catch (error) {
          throw new Error(
            `Error on ExtractResumeIndexRequest - Hash: ${error}`
          );
        }
        break;

      case ContentType.Zip:
        try {
          const zipFile = await zipFilesAsPromised(indexRequest.Content);
          resume = await this.FillMetadataFromZipFile(zipFile, resume);
        } catch (error) {
          throw new Error(`Error on ExtractResumeIndexRequest - Zip: ${error}`);
        }

        break;
      default:
        throw new Error('ContentType is required');
    }

    return resume;
  }

  public AddContent(indexRequest: IndexRequest, callback: any): void {
    const files: IndexedFile[] = [];
    switch (indexRequest.ContentType) {
      case ContentType.File:
        this._ipfsService.AddIpfsFile(
          indexRequest.Content,
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
        const mainFolder = this.GetMainFolder(indexRequest.Content);
        this._ipfsService.AddIpfsFolder(
          indexRequest.Content,
          (err, filesResult) => {
            if (err) {
              return callback(err);
            }

            let mainHash: string;

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
        this._ipfsService.GetIpfsFile(
          indexRequest.Content,
          (error, fileResult) => {
            if (error) {
              return callback(error);
            }

            const file = new IndexedFile();
            file.IpfsHash = indexRequest.Content;
            if (fileResult.content) {
              file.Content = fileResult.content.toString('utf8');
            }
            files.push(file);

            return callback(null, files);
          }
        );
        break;
      case ContentType.Zip:
        const reader = new FileReader();
        reader.onload = (): void => {
          indexRequest.Content = reader.result.slice(
            (reader.result as string).indexOf('base64') + 7
          );
          const fileArray: IpfsFile[] = [];
          const zip = new JSZip();
          zip
            .loadAsync(indexRequest.Content, { base64: true })
            .then(zipFiles => {
              let fileCount = 0;
              fileCount = zipFiles.folder().filter((fn, f) => !f.dir).length;
              zipFiles.forEach((fileName, file) => {
                if (!file.dir) {
                  file.async('base64').then(fileContent => {
                    const ipfsFile = new IpfsFile();
                    ipfsFile.path = fileName;
                    ipfsFile.content = Buffer.from(fileContent, 'base64');
                    fileArray.push(ipfsFile);
                    if (fileArray.length === fileCount) {
                      this._ipfsService.AddIpfsFileList(
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
                            files.find(
                              _file => _file.FileName === 'index.html'
                            ) || files[0];

                          callback(
                            null,
                            this.ChangeToMainHash(rootFile.IpfsHash, files)
                          );
                        }
                      );
                    }
                  });
                }
              });
            });
        };
        reader.readAsDataURL(indexRequest.Content);
        break;
    }
  }

  // TODO: Implementar Validator
  private async FillMetadataFromHtmlFile(
    pathContent: string,
    resumeIndexRequest: ResumeIndexRequest
  ): Promise<ResumeIndexRequest> {
    try {
      const file = await fsAsync.readFile(pathContent, 'utf8');
      const metadata = new MetadataFile();

      if (isHtml(file)) {
        const htmlDoc = unfluff(file);
        metadata.title = htmlDoc.title;
        metadata.description = htmlDoc.description;
        metadata.tags = [];

        if (htmlDoc.keywords) {
          const tags = GetNormalizedText(htmlDoc.keywords);
          const tagsArray = tags.split(',');
          tagsArray.forEach(t => metadata.tags.push(t.trim()));
        }

        resumeIndexRequest.suggestions = this.GetTagSuggestion(htmlDoc);
      }

      resumeIndexRequest.metadata = metadata;

      return resumeIndexRequest;
    } catch (error) {
      throw new Error(`Error on FillMetadataFromHtmlFile - : ${error}`);
    }
  }

  // TODO: Implementar Validator
  private async FillMetadataFromFolder(
    pathFolder: string,
    resumeIndexRequest: ResumeIndexRequest
  ): Promise<ResumeIndexRequest> {
    try {
      const mainFolder = this.GetMainFolder(pathFolder);

      if (fs.existsSync(`${mainFolder}/janus.json`)) {
        const janusJSON = JSON.parse(
          await fsAsync.readFile(`${mainFolder}/janus.json`, 'utf8')
        );

        resumeIndexRequest.metadata.title = janusJSON.title;
        resumeIndexRequest.metadata.description = janusJSON.description;
        resumeIndexRequest.metadata.tags = janusJSON.tags;
      } else {
        resumeIndexRequest = await this.FillMetadataFromHtmlFile(
          `${mainFolder}/index.html`,
          resumeIndexRequest
        );
      }
    } catch (error) {
      throw new Error(`Error on FillMetadataFromFolder -: ${error}`);
    }

    return resumeIndexRequest;
  }

  // TODO: Implementar Validator
  private async FillMetadataFromZipFile(
    zipFile: JSZip,
    resumeIndexRequest: ResumeIndexRequest
  ): Promise<ResumeIndexRequest> {
    try {
      const jsonFile = await loadFileFromZipFile('janus.json', zipFile);

      if (jsonFile) {
        const janusJSON = JSON.parse(jsonFile);
        resumeIndexRequest.metadata.title = janusJSON.title;
        resumeIndexRequest.metadata.description = janusJSON.description;
        resumeIndexRequest.metadata.tags = janusJSON.tags;
      } else {
        const htmlFile = await loadFileFromZipFile('index.html', zipFile);
        if (htmlFile && isHtml(htmlFile)) {
          const htmlDoc = unfluff(htmlFile);
          resumeIndexRequest.metadata.title = htmlDoc.title;
          resumeIndexRequest.metadata.description = htmlDoc.description;
          resumeIndexRequest.metadata.tags = [];

          if (htmlDoc.keywords) {
            const tags = GetNormalizedText(htmlDoc.keywords);
            const tagsArray = tags.split(',');
            tagsArray.forEach(t =>
              resumeIndexRequest.metadata.tags.push(t.trim())
            );
          }

          resumeIndexRequest.suggestions = this.GetTagSuggestion(htmlDoc);
        }
      }
    } catch (error) {
      throw new Error(`Error on FillMetadataFromZipFile -: ${error}`);
    }

    return resumeIndexRequest;
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
