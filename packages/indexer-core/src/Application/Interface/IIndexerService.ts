import IndexedFile from '../../Domain/Entity/IndexedFile';
import Website from '../../Domain/Entity/Website';
import { ethers } from 'ethers';

export default interface IIndexerService {
  indexFile(indexedFile: IndexedFile): Promise<ethers.Event[]>;
  listWebsitesByOwner(): Promise<Website[]>;
  updateWebsite(target: Website): Promise<ethers.Event[]>;
  burnWebsite(hash: string): Promise<ethers.Event[]>;
}
