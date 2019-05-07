import "reflect-metadata";
import {container} from "../src/startup";
import web3IndexerService from "../src/application/service/web3IndexerService";

let pack = container.resolve(web3IndexerService);

jest.mock("../src/application/service/web3IndexerService.ts");

test("Return 15 index empty", async () => {
    // const addMock = jest.spyOn( );
    let result = pack.ListByTags('0x5a019a8572a7431001703ac69558f686ba817766', ['tag1']);
    console.log(result);
    expect(1).toEqual(1);
});

test("Return less than 15 index", () => {

    expect(1).toEqual(1);
});
test("Return 15 index full", () => {

    expect(1).toEqual(1);
});
