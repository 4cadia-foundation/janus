import Bootstrapper from '../../src/Infra/IoC/Bootstrapper';
import CoreConfigs from '../../src/Domain/Entity/CoreConfigs';
import IpfsService from '../../src/Application/Service/IpfsService';

// test.skip('skip', () => { })
// jest.mock('../src/Application/Service/IpfsService');
// describe("Index Validator Test", () => {
//     Bootstrapper.RegisterServices(null);
//     let getIpfsMock = jest.fn((ipfsHash: string, callback: any) => {
//         callback(null, null);
//     });
//     let hashExistsMock = jest.fn((ipfsHash: string, callback: any) => {
//         callback(true);
//     });

//     let spider = new Spider(null);
//     let request = new IndexRequest();
//     request.Content=null;
//     request.
//     spider.AddContent()
//     let config = Bootstrapper.Resolve<SpiderConfig>("SpiderConfig");
//     let ipfsService = new IpfsService(config);

//     ipfsService.GetIpfsFile = getIpfsMock;

//     ipfsService.GetIpfsHtml(null,   => {
//         it("Invalid File returns success equals false", () => {
//             expect(indexResult.Success).toBeFalsy();
// });
// it("Invalid File returns File not found", () => {
//     expect(indexResult.Errors).toContain("Ipfs file not found");
// });
// it("Invalid File returns Description is empty", () => {
//     expect(indexResult.Errors).toContain("Description can't be empty");
// });
// it("Invalid File returns Tags is empty", () => {
//     expect(indexResult.Errors).toContain("Tags can't be empty");
// });
// it("Invalid File returns Title is empty", () => {
//     expect(indexResult.Errors).toContain("Title can't be empty");
// });
//     });
// });
