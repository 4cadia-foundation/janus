import { singleton } from 'tsyringe';
import { Web3Provider } from 'ethers/providers';
import defaultConfigs from '../../defaultconfig.json';

@singleton()
export default class CoreConfigs {
  // public constructor(init?:Partial<CoreConfigs>) {
  //     Object.assign(this, init);
  // }

  public static getDefaultConfigs(): CoreConfigs {
    const cc = new CoreConfigs();
    cc.contractAddress = defaultConfigs.contractAddress;
    cc.contractAbi = defaultConfigs.contractAbi;
    cc.ipfsProtocol = defaultConfigs.IpfsProtocol;
    cc.ipfsHost = defaultConfigs.IpfsRpcHost;
    cc.ipfsPort = defaultConfigs.IpfsRpcPort;

    return cc;
  }

  public contractAddress: string = defaultConfigs.contractAddress;
  public contractAbi: object[] = defaultConfigs.contractAbi;
  public ipfsProtocol: string = defaultConfigs.IpfsProtocol;
  public ipfsHost: string = defaultConfigs.IpfsRpcHost;
  public ipfsPort: string = defaultConfigs.IpfsRpcPort;
  public web3Provider?: Web3Provider;
}
