import IpfsFile from '../../Domain/Entity/IpfsFile';

export default interface IIpfsService {
  AddIpfsFile(filePath: string, callback: any): void;
  AddIpfsFileList(fileArray: IpfsFile[], callback: any): void;
  AddIpfsFolder(folderPath: string, callback: any): void;
  GetIpfsFile(ipfsHash: string, callback: any): void;
  HashExists(ipfsHash: string, callback: any): void;
}
