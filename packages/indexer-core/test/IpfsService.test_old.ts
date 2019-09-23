import 'jest';
import "reflect-metadata";
import IpfsService from '../src/Application/Service/IpfsService';
import fs from "fs";
import path from "path";
import Bootstrapper from '../src/Infra/IoC/Bootstrapper';

test.skip('skip', () => { })
jest.mock('../src/Application/Service/IpfsService');
describe("Index Validator Test", () => {
    // Bootstrapper.RegisterServices();
    let getIpfsMock = jest.fn((ipfsHash: string, callback: any) => {
        callback(null, null);
    });
    // let ipfsService = new IpfsService();
    // ipfsService.GetIpfsFile = getIpfsMock;
    // ipfsService.GetIpfsHtml(null, indexResult => {
    //     it("Invalid File returns success equals false", () => {
    //         expect(indexResult.Success).toBeFalsy();
    //     });
    //     it("Invalid File returns File not found", () => {
    //         expect(indexResult.Errors).toContain("Ipfs file not found");
    //     });
    //     it("Invalid File returns Description is empty", () => {
    //         expect(indexResult.Errors).toContain("Description can't be empty");
    //     });
    //     it("Invalid File returns Tags is empty", () => {
    //         expect(indexResult.Errors).toContain("Tags can't be empty");
    //     });
    //     it("Invalid File returns Title is empty", () => {
    //         expect(indexResult.Errors).toContain("Title can't be empty");
    //     });
    // });
});

describe("Content Test", () => {
    let htmlTemplate = fs.readFileSync(path.resolve(__dirname, "./templates/Template.html"), "utf8");
    let getIpfsMock = jest.fn((ipfsHash: string, callback: any) => {
        let file = [{
            content: htmlTemplate
        }];
        callback(null, file);
    });
    // let ipfsService = new IpfsService();
    // ipfsService.GetIpfsFile = getIpfsMock;
    // ipfsService.GetIpfsHtml(null, indexedResult => {
    //     console.log(indexedResult);
    //     it("Tag extraction", () => {
    //         expect(indexedResult.HtmlData.Tags.join()).toBe("test1,test2");
    //     });
    //     it("Title extraction", () => {
    //         expect(indexedResult.HtmlData.Title).toBe("Test Title");
    //     });
    //     it("Description extraction", () => {
    //         expect(indexedResult.HtmlData.Description).toBe("Test Description");
    //     });
    //     it("Success is true", () => {
    //         expect(indexedResult.Success).toBeTruthy();
    //     });
    // });
});

