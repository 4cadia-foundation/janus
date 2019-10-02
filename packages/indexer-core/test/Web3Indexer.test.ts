import 'jest';
import 'reflect-metadata';
import Web3IndexerValidator from '../src/Application/Validator/IndexerValidator';
import Web3IndexerService from '../src/Application/Service/IndexerService';
import CoreConfigs from '../src/Domain/Entity/CoreConfigs';
import HtmlData from '../src/Domain/Entity/HtmlData';
import Bootstrapper from '../src/Infra/IoC/Bootstrapper';

jest.mock('../src/Application/Validator/IndexerValidator');

describe('Web3Validator #integration', () => {
  test.todo('Invalid address validation');
  test.todo('WebSite Exists validation');
});
