import fs from 'fs';
import path from 'path';
import ipfs, { IpfsClient } from 'ipfs-http-client';
import { injectable, inject } from 'tsyringe';
import CoreConfig from '../../Domain/Entity/CoreConfigs';
import IIpfsService from '../Interface/IIpfsService';
import TextHelper from '../../Infra/Helper/TextHelper';
import IpfsFile from '../../Domain/Entity/IpfsFile';

@injectable()
export default class IpfsService implements IIpfsService {
  public _ipfsClient: IpfsClient;

  constructor(@inject('CoreConfigs') _coreConfig: CoreConfig) {
    this._ipfsClient = ipfs(_coreConfig.ipfsHost, _coreConfig.ipfsPort, {
      protocol: _coreConfig.ipfsProtocol,
    });
  }

  public AddIpfsFile(filePath: string, callback: any) {
    const fileText = fs.readFileSync(filePath, 'utf8');
    const file = [
      {
        path: filePath,
        content: Buffer.from(fileText),
      },
    ];
    return this._ipfsClient.add(file, (err, response) => {
      return callback(err, response[0].hash, fileText);
    });
  }

  public AddIpfsFileList(fileArray: IpfsFile[], callback: any) {
    return this._ipfsClient.add(
      fileArray,
      { recursive: true },
      (err, response) => {
        return callback(err, response);
      }
    );
  }

  public AddIpfsFolder(folderPath: string, callback: any) {
    this._ipfsClient.addFromFs(
      folderPath,
      { recursive: true },
      (err, result) => {
        if (err) {
          return callback(err);
        }

        result.forEach(file => {
          const filePath = path.join(path.dirname(folderPath), file.path);
          if (!fs.lstatSync(filePath).isDirectory()) {
            (file as any).fileText = fs.readFileSync(filePath, 'utf8');
          }
        });

        callback(null, result);
      }
    );
  }

  public GetIpfsFile(ipfsHash: string, callback: any) {
    return this._ipfsClient.get(ipfsHash, (error, files) => {
      callback(error, files[0]);
    });
  }

  public HashExists(ipfsHash: string, callback: any) {
    return this._ipfsClient.get(ipfsHash, (error, files) => {
      if (error) {
        console.log(error);
        // TODO: refactor this
        // eslint-disable-next-line standard/no-callback-literal
        return callback(false);
      }

      const exists = !!files;
      callback(exists);
    });
  }
}
