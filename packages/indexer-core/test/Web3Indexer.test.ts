import 'jest';
import 'reflect-metadata';
import Web3IndexerValidator from '../src/Application/Validator/IndexerValidator';
import Web3IndexerService from '../src/Application/Service/IndexerService';
import CoreConfigs from '../src/Domain/Entity/CoreConfigs';
import HtmlData from '../src/Domain/Entity/HtmlData';
import Bootstrapper from '../src/Infra/IoC/Bootstrapper';

test.skip('skip', () => {});
jest.mock('../src/Application/Validator/IndexerValidator');
test('Web3Validator - Invalid address validation', () => {
  // Bootstrapper.RegisterServices();
  // let isAddressMock = jest.fn(() => {
  //     return false;
  // });
  // let config: SpiderConfig = Bootstrapper.Resolve("SpiderConfig");
  // let web3Validator: IWeb3IndexerValidator = new Web3IndexerValidator(config);
  // web3Validator.IsAddress = isAddressMock;
  // let web3Service = new Web3IndexerService(config, web3Validator);
  // web3Service.IndexHtml(null, null, indexResult => {
  //     expect(indexResult.Errors.join()).toBe("Invalid Ethereum Address");
  // });
});

test('Web3Validator - WebSite Exists validation', () => {
  // let isAddressMock = jest.fn(() => {
  //     return true;
  // });
  // let WebSiteExistsMock = jest.fn((ipfsHash: string, ownerAddress: string, callback: any) => {
  //     callback(true);
  // });
  // let config: SpiderConfig = Bootstrapper.Resolve("SpiderConfig");
  // let web3Validator: IWeb3IndexerValidator = new Web3IndexerValidator(config);
  // let web3Service = new Web3IndexerService(config, web3Validator);
  // let htmlData: HtmlData = new HtmlData();
  // web3Validator.IsAddress = isAddressMock;
  // web3Validator.WebSiteExists = WebSiteExistsMock;
  // web3Service.IndexHtml(htmlData, null, indexResult => {
  //     expect(indexResult.Errors.join()).toBe("Ipfs hash already indexed");
  // });
});
