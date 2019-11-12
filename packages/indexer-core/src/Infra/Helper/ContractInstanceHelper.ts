import { Web3Provider } from 'ethers/providers';
import { ethers, Contract } from 'ethers';

export default class ContractInstanceHelper {
  public static ContractInstance(
    _provider: Web3Provider,
    _contractAddress: string,
    _abi: any
  ): Contract {
    const contractInstance = new ethers.Contract(
      _contractAddress,
      _abi,
      _provider.getSigner(0)
    );
    return contractInstance;
  }
}
