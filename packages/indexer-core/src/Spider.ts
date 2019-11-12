import 'reflect-metadata';
import Bootstrapper from './Infra/IoC/Bootstrapper';
import ISpiderService from './Application/Interface/ISpiderService';
import IndexRequest from './Domain/Entity/IndexRequest';
import CoreConfigs from './Domain/Entity/CoreConfigs';
import IndexRequestValidator from './Application/Validator/IndexRequestValidator';
import IndexedResult from './Domain/Entity/IndexedResult';
import IIpfsService from './Application/Interface/IIpfsService';
import RequestResult from './Domain/Pojo/RequestResult';
import { Web3Provider } from 'ethers/providers';
import Options from './Domain/Pojo/Options';
import Website from './Domain/Entity/Website';
import ResumeIndexRequest from './Domain/Entity/ResumeIndexRequest';
import IpfsService from './Application/Service/IpfsService';

export class Spider {
  public _spiderConfigs: CoreConfigs;
  public _spiderService: ISpiderService;
  public _ipfsService: IIpfsService;

  constructor(web3Provider?: Web3Provider, options?: Options) {
    Bootstrapper.RegisterServices(web3Provider, options);
    this._spiderConfigs = Bootstrapper.Resolve<CoreConfigs>('CoreConfigs');
    this._spiderService = Bootstrapper.Resolve<ISpiderService>(
      'ISpiderService'
    );
    this._ipfsService = Bootstrapper.Resolve<IIpfsService>('IIpfsService');
  }

  public addContent(indexRequest: IndexRequest, callback: any): void {
    const validator = new IndexRequestValidator(
      this._spiderConfigs,
      this._ipfsService
    );
    const result = new IndexedResult();
    validator.ValidateRequest(indexRequest, validation => {
      result.Success = validation.isValid();
      result.Errors = validation.getFailureMessages();
      if (!result.Success) {
        return callback(result);
      }

      this._spiderService.addContent(indexRequest, (err, indexResult) => {
        if (err) {
          result.Errors = [err.message];
          result.Success = false;
        } else {
          result.IndexedFiles = indexResult;
        }
        callback(result);
      });
    });
  }

  public async extractMetadataContent(
    indexRequest: IndexRequest
  ): Promise<ResumeIndexRequest> {
    const validator = new IndexRequestValidator(
      this._spiderConfigs,
      this._ipfsService
    );
    const validation = await validator.ValidateIndexRequest(indexRequest);

    const result = new RequestResult();
    result.Success = validation.isValid();
    result.Errors = validation.getFailureMessages();

    const resume = await this._spiderService.extractResumeIndexRequest(
      indexRequest
    );

    if (result.Success) {
      try {
        // TODO: Acertar validações
      } catch (error) {
        // TODO: Acertar inconsistencias
      }
    }

    return resume;
  }
}
