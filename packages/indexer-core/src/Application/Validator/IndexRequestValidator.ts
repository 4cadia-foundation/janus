// const Web3 = require('web3');
import JSZip from 'jszip';
import { AbstractValidator, ValidationResult } from 'fluent-ts-validator';
import IndexRequest from '../../Domain/Entity/IndexRequest';
import fs from 'fs';
import { ContentType } from '../../Domain/Entity/ContentType';
import { inject } from 'tsyringe';
import CoreConfigs from '../../Domain/Entity/CoreConfigs';
import IIpfsService from '../Interface/IIpfsService';

export default class IndexRequestValidator extends AbstractValidator<
  IndexRequest
> {
  constructor(
    @inject('CoreConfigs') _coreConfigs: CoreConfigs,
    @inject('IIpfsService') private _ipfsService: IIpfsService
  ) {
    super();
    // let web3 = new Web3(_spiderConfig.RpcHost);
    this.validateIf(i => i.Content)
      .isNotEmpty()
      .isNotNull()
      .withFailureMessage("Content can't be empty");

    this.validateIf(i => fs.existsSync(i.Content as string))
      .isEqualTo(true)
      .when(
        i =>
          i.ContentType === ContentType.Folder ||
          i.ContentType === ContentType.File
      )
      .withFailureMessage('Invalid Path');

    this.validateIf(i => i.ContentType)
      .fulfills(
        type =>
          type === ContentType.Hash ||
          type === ContentType.File ||
          type === ContentType.Folder ||
          type === ContentType.Zip
      )
      .withFailureMessage('Invalid content type');

    // this.validateIf(i => i.Address)
    //    .fulfills(address => web3.utils.isAddress(address))
    //    .withFailureMessage("Invalid Ethereum Address");
  }

  public ValidateRequest(indexRequest: IndexRequest, callback: any): any {
    if (indexRequest.ContentType === ContentType.Hash) {
      this._ipfsService.HashExists(indexRequest.Content as string, exists => {
        indexRequest.IpfsHashExists = exists;
        this.validateIf(i => i.IpfsHashExists)
          .isEqualTo(true)
          .withFailureMessage('Invalid Ipfs hash');
        return callback(this.validate(indexRequest));
      });
    } else if (indexRequest.ContentType === ContentType.Zip) {
      this.ValidateZipFile(indexRequest.Content as string, validZip => {
        indexRequest.ValidZip = validZip;
        this.validateIf(i => i.ValidZip)
          .isDefined()
          .withFailureMessage('Invalid Zip file');
        return callback(this.validate(indexRequest));
      });
    } else {
      return callback(this.validate(indexRequest));
    }
  }

  public ValidateZipFile(content: string, callback: any) {
    const zip = new JSZip();
    zip.loadAsync(content, { base64: true }).then(
      zipFiles => callback(zipFiles),
      () => {
        callback();
      }
    );
  }

  public async ValidateIndexRequest(
    indexRequest: IndexRequest
  ): Promise<ValidationResult> {
    return this.validate(indexRequest);
  }
}
