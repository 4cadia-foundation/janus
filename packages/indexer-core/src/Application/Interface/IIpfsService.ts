import IpfsFile from '../../Domain/Entity/IpfsFile';

export default interface IIpfsService {
  addIpfsFile(filePath: string, callback: any): void;
  addIpfsFileList(fileArray: IpfsFile[], callback: any): void;
  addIpfsFolder(folderPath: string, callback: any): void;
  getIpfsFile(ipfsHash: string, callback: any): void;
  hashExists(ipfsHash: string, callback: any): void;
}
