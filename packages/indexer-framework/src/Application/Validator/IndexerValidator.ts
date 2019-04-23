import Web3 from 'web3';
import { AbstractValidator } from 'fluent-ts-validator/AbstractValidator';
import CoreConfigs from '../../Domain/Entity/CoreConfigs';
import { inject, injectable } from 'tsyringe';
import IndexedFile from '../../Domain/Entity/IndexedFile';

@injectable()
export default class Web3IndexerValidator extends AbstractValidator<
  CoreConfigs
> {
  private _web3;
  constructor(@inject('CoreConfigs') private _coreConfigs: CoreConfigs) {
    super();
    // this._web3 = new Web3(_spiderConfig.RpcHost);
  }

  public ValidateIndexRequestAsync(
    indexedFile: IndexedFile,
    ownerAddress: string,
    callback: any
  ) {
    this.WebSiteExists(indexedFile.IpfsHash, ownerAddress, (exists) => {
      this.validateIf((s) => exists)
        .isEqualTo(false)
        .withFailureMessage('Ipfs hash already indexed');
      callback(this.validate(this._coreConfigs));
    });
  }

  public WebSiteExists(ipfsHash: string, ownerAddress: string, callback: any) {
    const indexerSm = new this._web3.eth.Contract(
      this._coreConfigs.contractAbi,
      this._coreConfigs.contractAddress
    );
    indexerSm.methods
      .webSiteExists(ipfsHash)
      .call({ from: ownerAddress, gas: 3000000 })
      .then((exists) => {
        callback(exists);
      });
  }
}
