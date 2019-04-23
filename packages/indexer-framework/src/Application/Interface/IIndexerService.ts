import IndexedFile from '../../Domain/Entity/IndexedFile';
import Website from '../../Domain/Entity/Website';
import { ethers } from 'ethers';

export default interface IIndexerService {
  IndexFile(indexedFile: IndexedFile): Promise<ethers.Event[]>;
  ListWebsitesByOwner(): Promise<Website[]>;
  UpdateWebsite(target: Website): Promise<ethers.Event[]>;
  BurnWebsite(hash: string): Promise<ethers.Event[]>;
}
