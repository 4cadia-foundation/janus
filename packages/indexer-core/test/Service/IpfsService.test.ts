import Bootstrapper from '../../src/Infra/IoC/Bootstrapper';
import CoreConfigs from '../../src/Domain/Entity/CoreConfigs';
import IpfsService from '../../src/Application/Service/IpfsService';

jest.mock('../../src/Application/Service/IpfsService');

describe('Index Validator Test #unit', () => {
  it.todo('Invalid File returns success equals false');

  it.todo('Invalid File returns File not found');
  it.todo('Invalid File returns Description is empty');
  it.todo('Invalid File returns Tags is empty');
  it.todo('Invalid File returns Title is empty');
});
