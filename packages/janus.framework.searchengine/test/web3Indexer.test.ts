import Web3IndexerService from '../src/service/Web3IndexerService';
import IndexerResult from '../src/entity/IndexerResult';
import Website from '../src/entity/Website';
import Web3Config from '../src/entity/Web3Config';

let indexerService;

let contractAddress = '';
let contractAbi;
let rpc = '';

beforeEach(() => {
    indexerService = new Web3IndexerService(new Web3Config(rpc, contractAbi, contractAddress));
});

describe('ListByTags tests', function () {
    it('Return error invalid owner address', async () => {
        let expectedResultErrorsLength = 1;
        let expectedResult = new IndexerResult();
        expectedResult.errors.push('invalid owner address');

        indexerService.ListByTags = jest.fn().mockReturnValue(expectedResult);

        var result = await indexerService.ListByTags('aaa', 0, ['tag1']);

        expect(result.errors.length).toBe(expectedResultErrorsLength);
        expect(result.errors[0]).toBe('invalid owner address');
    });

    it('Return empty websites', async () => {
        let expectedResultSucces = true;
        let expectedResultWebsitesLength = 0;
        let expectedResultErrorsLength = 0;
        let expectedResult = new IndexerResult();
        expectedResult.success = true;

        indexerService.ListByTags = jest.fn().mockReturnValue(expectedResult);

        var result = await indexerService.ListByTags('0x954df17d3c8a79ebb4ae62d89f9360a970815bc2', 0, ['tag1']);

        expect(result.websites.length).toBe(expectedResultWebsitesLength);
        expect(result.errors.length).toBe(expectedResultErrorsLength);
        expect(result.success).toBe(expectedResultSucces);
    });

    it('Return one website', async () => {
        let expectedResultSucces = true;
        let expectedResultWebsitesLength = 1;
        let expectedResultErrorsLength = 0;
        let website = new Website('QmUdiv8F7eFSxZbUTJU8UfvJGc7UewTN9XF5AqkpTMHCxa', 'title', 'desc');

        let expectedResult = new IndexerResult();
        expectedResult.success = true;
        expectedResult.websites.push(website);

        indexerService.ListByTags = jest.fn().mockReturnValue(expectedResult);

        var result = await indexerService.ListByTags('0x954df17d3c8a79ebb4ae62d89f9360a970815bc2', 0, ['tag1']);

        expect(result.websites[0].storageHash).toBe(website.storageHash);
        expect(result.websites[0].title).toBe(website.title);
        expect(result.websites[0].description).toBe(website.description);
        expect(result.websites.length).toBe(expectedResultWebsitesLength);
        expect(result.errors.length).toBe(expectedResultErrorsLength);
        expect(result.success).toBe(expectedResultSucces);
    });
});

