import 'reflect-metadata';
import Bootstrapper from './Infra/IoC/Bootstrapper';
import CoreConfigs from './Domain/Entity/CoreConfigs';
import RequestResult from './Domain/Pojo/RequestResult';
import IIndexerService from './Application/Interface/IIndexerService';
import { Web3Provider } from 'ethers/providers';
import Options from './Domain/Pojo/Options';
import Website from './Domain/Entity/Website';
import ResumeIndexRequest from './Domain/Entity/ResumeIndexRequest';
import IndexRequest from './Domain/Entity/IndexRequest';
import IndexedFile from './Domain/Entity/IndexedFile';

export class Indexer {
  public static GetDefaultConfigs(): CoreConfigs {
    return CoreConfigs.getDefaultConfigs();
  }

  public _indexerConfig: CoreConfigs;
  public _indexerService: IIndexerService;

  constructor(web3Provider: Web3Provider, options?: Options) {
    Bootstrapper.RegisterServices(web3Provider, options);
    this._indexerConfig = Bootstrapper.Resolve<CoreConfigs>('CoreConfigs');
    this._indexerService = Bootstrapper.Resolve<IIndexerService>(
      'IIndexerService'
    );
  }

  public async AddNewWebsite(indexedFile: IndexedFile): Promise<RequestResult> {
    const result = new RequestResult();

    try {
      result.Result = await this._indexerService.IndexFile(indexedFile);
      result.Success = true;
    } catch (error) {
      result.Errors.push(error);
    }

    return result;
  }

  public async ListWebsitesByOwner(): Promise<RequestResult> {
    const result = new RequestResult();

    try {
      result.Result = await this._indexerService.ListWebsitesByOwner();
      result.Success = true;
    } catch (error) {
      result.Errors.push(error);
    }

    return result;
  }

  public async UpdateWebsite(target: Website): Promise<RequestResult> {
    const result = new RequestResult();

    try {
      const events = await this._indexerService.UpdateWebsite(target);
      if (events) {
        result.Success = true;
        result.Result.push(...events);
      }
    } catch (error) {
      result.Errors.push(error);
    }

    return result;
  }

  public async DeleteWebSite(site: Website): Promise<RequestResult> {
    const result = new RequestResult();

    try {
      const events = await this._indexerService.BurnWebsite(site.storageHash);
      if (events) {
        result.Success = true;
        result.Result.push(...events);
      }
    } catch (error) {
      result.Errors.push(error);
    }
    return result;
  }
}
