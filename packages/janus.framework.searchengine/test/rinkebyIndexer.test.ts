import Web3IndexerService from '../src/service/Web3IndexerService';
import IndexerResult from '../src/entity/IndexerResult';
import Website from '../src/entity/Website';
import Web3Config from '../src/entity/Web3Config';

let indexerService;

let rpc = 'https://rinkeby.infura.io/v3/9d29be50765b44a08196e457db9b40db';
let contractAddress = '0x50ae17b684fd694926865f1e1858553cc17670a2';
let accountAddress = '0x17ca6a08758f4a078b9c53ca25e6f6736df34094';
let contractAbi = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_tags",
                "type": "string[]"
            }
        ],
        "name": "addWebSiteEvent",
        "type": "event",
        "signature": "0x323da4cc5c3ecf4becdc48a202344c3082af74d4a3c0764c3814e60060d1de75"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x41c0e1b5"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "storageHash",
                "type": "string"
            }
        ],
        "name": "webSiteExists",
        "outputs": [
            {
                "name": "exist",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x150ffdd3"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_storageHash",
                "type": "string"
            },
            {
                "name": "_tags",
                "type": "string[]"
            },
            {
                "name": "_title",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "addWebSite",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x6b2a4abc"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_tags",
                "type": "string[]"
            }
        ],
        "name": "getWebSite",
        "outputs": [
            {
                "name": "",
                "type": "string[15]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x17513855"
    }
];

beforeEach(() => {
    indexerService = new Web3IndexerService(new Web3Config(rpc, contractAbi, contractAddress));
});

describe('ListByTags tests', function () {
   
    it('Return empty websites', async () => {
        let expectedResultSucces = true;
        let expectedResultWebsitesLength = 0;
        let expectedResultErrorsLength = 0;
        let expectedResult = new IndexerResult();
        expectedResult.success = true;

        var result = await indexerService.ListByTags(['atlas']);

        console.log(result);

        expect(result.websites.length).toBe(expectedResultWebsitesLength);
        expect(result.errors.length).toBe(expectedResultErrorsLength);
        expect(result.success).toBe(expectedResultSucces);
    });
});