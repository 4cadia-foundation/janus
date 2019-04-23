import 'reflect-metadata';
import { container, InjectionToken, DependencyContainer } from 'tsyringe';
import IpfsService from '../../Application/Service/IpfsService';
import IndexerService from '../../Application/Service/IndexerService';
import SpiderService from '../../Application/Service/SpiderService';
import jsonConfig from '../../../defaultconfig.json';
import { Web3Provider } from 'ethers/providers';
import Options from '../../Domain/Pojo/Options';
import CoreConfigs from '../../Domain/Entity/CoreConfigs';

export default class Bootstrapper {
  public static Resolve<T>(token: InjectionToken<T>): T {
    return container.resolve(token);
  }

  public static RegisterServices(
    web3Provider?: Web3Provider,
    options?: Options
  ): DependencyContainer {
    const config = new CoreConfigs();
    options = options || new Options();

    config.contractAddress =
      options.contractAddress || jsonConfig.contractAddress;
    config.contractAbi = options.contractAbi || jsonConfig.contractAbi;
    config.ipfsHost = options.ipfsHost || jsonConfig.IpfsRpcHost;
    config.ipfsPort = options.ipfsPort || jsonConfig.IpfsRpcPort;
    config.ipfsProtocol = options.ipfsProtocol || jsonConfig.IpfsProtocol;
    config.web3Provider = web3Provider;

    container.registerInstance('CoreConfigs', config);
    container.register('IIpfsService', { useClass: IpfsService });
    container.register('IIndexerService', { useClass: IndexerService });
    container.register('ISpiderService', { useClass: SpiderService });
    return container;
  }
}
