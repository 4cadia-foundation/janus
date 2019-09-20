import { ethers, Contract, utils } from 'ethers';
import { inject, injectable } from 'tsyringe';
import CoreConfigs from '../../Domain/Entity/CoreConfigs';
import IIndexerService from '../Interface/IIndexerService';
import IndexedFile from '../../Domain/Entity/IndexedFile';
import IndexerValidator from '../Validator/IndexerValidator';
import Website from '../../Domain/Entity/Website';
import Helper from '../../Infra/Helper/ContractInstanceHelper';
import { ContractReceipt } from 'ethers/contract';
import { Web3Provider } from 'ethers/providers';

@injectable()
export default class IndexerService implements IIndexerService {
  private _web3Provider: Web3Provider;
  private _smartContract: any;
  private _indexerCount = 0;

  constructor(@inject('CoreConfigs') private _coreConfigs: CoreConfigs) {
    this._web3Provider = new ethers.providers.Web3Provider(
      _coreConfigs.web3Provider!
    );
    this._smartContract = Helper.ContractInstance(
      this._web3Provider,
      _coreConfigs.contractAddress,
      _coreConfigs.contractAbi
    );
  }

  public async IndexFile(indexedFile: IndexedFile): Promise<ethers.Event[]> {
    // TODO: Refactor Validators
    // let validator = new IndexerValidator(this._coreConfigs);
    // validator.ValidateIndexRequestAsync(indexedFile, ownerAddress, async validation => {
    //     if (indexedFile.Success) {
    //         indexedFile.Success = validation.isValid();
    //         indexedFile.Errors = validation.getFailureMessages();
    //     }

    //     if (!indexedFile.IsHtml || !indexedFile.Success) {
    //         this._indexerCount++;
    //         return callback(indexedFile, this._indexerCount);
    //     }
    //     else {
    try {
      const tx = await this._smartContract.addWebSite(
        indexedFile.IpfsHash,
        indexedFile.HtmlData.Tags,
        indexedFile.HtmlData.Title,
        indexedFile.HtmlData.Description
      );

      const receipt = await tx.wait();
      return (receipt as ContractReceipt).events!;
    } catch (error) {
      throw new Error(error);
    }

    //   }
    // });
  }

  public async ListWebsitesByOwner(): Promise<Website[]> {
    const listAllWebsitesByOwner = await this._smartContract.getAllWebsitesByOwner();
    const listWebSites = listAllWebsitesByOwner
      .filter(website => website.visible)
      .map(website => {
        return new Website(
          website.storageHash,
          website.title,
          website.description,
          website.tags
        );
      });
    return listWebSites;
  }

  public async UpdateWebsite(target: Website): Promise<ethers.Event[]> {
    if (target) {
      const tx = await this._smartContract.appendWebsite(
        target.storageHash,
        target.tags,
        target.title,
        target.description
      );
      const receipt = await tx.wait();
      return (receipt as ContractReceipt).events!;
    }

    throw new Error('Target can`t be nullable');
  }

  public async BurnWebsite(hash: string): Promise<ethers.Event[]> {
    const tx = await this._smartContract.burnWebsite(hash);
    const receipt = await tx.wait();

    return (receipt as ContractReceipt).events!;
  }
}
