import Web3IndexerService from '../src/service/Web3IndexerService';
import IndexerResult from '../src/entity/IndexerResult';
import Website from '../src/entity/Website';
import Web3Config from '../src/entity/Web3Config';

let indexerService;

let contractIndexerAddress = '0xC2d583b2be08858e3A8dCD468c0717681ab38648';
let contractIndexerAbi = [{
    "constant": true,
    "inputs": [{
        "name": "storageHash",
        "type": "string"
    }],
    "name": "webSiteExists",
    "outputs": [{
        "name": "exist",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
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
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
            "name": "_tags",
            "type": "string[]"
        },
        {
            "name": "pageNumber",
            "type": "uint256"
        },
        {
            "name": "pageSize",
            "type": "uint256"
        }
    ],
    "name": "getWebSite",
    "outputs": [{
            "name": "",
            "type": "string[]"
        },
        {
            "name": "",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "_tags",
        "type": "string[]"
    }],
    "name": "addWebSiteEvent",
    "type": "event"
}
];
let contractJnsAddress = '0x6cADB120B82955777164CcACF91a5b75eF340b2c';
let contractJnsAbi = [{
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "string"
    }],
    "name": "domainsStorageHash",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "_domainName",
            "type": "string"
        },
        {
            "name": "_topDomainName",
            "type": "string"
        }
    ],
    "name": "renewDomain",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "_domainName",
            "type": "string"
        },
        {
            "name": "_topDomainName",
            "type": "string"
        },
        {
            "name": "_storageHash",
            "type": "string"
        }
    ],
    "name": "updateDomainStorageHash",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "getAllDomainsByOwner",
    "outputs": [{
            "name": "name",
            "type": "string[]"
        },
        {
            "name": "topDomain",
            "type": "string[]"
        },
        {
            "name": "storageHash",
            "type": "string[]"
        },
        {
            "name": "expires",
            "type": "uint256[]"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "_topDomainName",
        "type": "string"
    }],
    "name": "getTopDomainHash",
    "outputs": [{
        "name": "",
        "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "_topDomainName",
            "type": "string"
        },
        {
            "name": "_newOwnerAddress",
            "type": "address"
        }
    ],
    "name": "changeTopDomainOwnership",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "_hash",
        "type": "bytes32"
    }],
    "name": "getDomainByHash",
    "outputs": [{
            "name": "name",
            "type": "string"
        },
        {
            "name": "topDomain",
            "type": "string"
        },
        {
            "name": "storageHash",
            "type": "string"
        },
        {
            "name": "expires",
            "type": "uint256"
        },
        {
            "name": "owner",
            "type": "address"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "getTopDomainsLength",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "getDomainsLength",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "storageHash",
        "type": "string"
    }],
    "name": "getDomainByStorageHash",
    "outputs": [{
            "name": "topDomain",
            "type": "string"
        },
        {
            "name": "domain",
            "type": "string"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
            "name": "",
            "type": "address"
        },
        {
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "domainsOwnerMap",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
        "name": "_topDomainName",
        "type": "string"
    }],
    "name": "registerTopDomain",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
            "name": "_domainName",
            "type": "string"
        },
        {
            "name": "_topDomainName",
            "type": "string"
        }
    ],
    "name": "getCompleteDomainHash",
    "outputs": [{
        "name": "",
        "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
            "name": "_domainName",
            "type": "string"
        },
        {
            "name": "_topDomainName",
            "type": "string"
        }
    ],
    "name": "getStorageHashByDomain",
    "outputs": [{
        "name": "",
        "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "contractOwner",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "_hash",
        "type": "bytes32"
    }],
    "name": "getTopDomainByHash",
    "outputs": [{
            "name": "name",
            "type": "string"
        },
        {
            "name": "expires",
            "type": "uint256"
        },
        {
            "name": "owner",
            "type": "address"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "bytes32"
    }],
    "name": "domainsHashMap",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
        "name": "_topDomainName",
        "type": "string"
    }],
    "name": "topDomainAlreadyRegistered",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [],
    "name": "getAllTopDomainsByOwner",
    "outputs": [{
            "name": "name",
            "type": "string[]"
        },
        {
            "name": "expires",
            "type": "uint256[]"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": true,
    "inputs": [{
            "name": "_domainName",
            "type": "string"
        },
        {
            "name": "_topDomainName",
            "type": "string"
        }
    ],
    "name": "domainAlreadyRegistered",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
            "name": "_domainName",
            "type": "string"
        },
        {
            "name": "_topDomainName",
            "type": "string"
        },
        {
            "name": "_storageHash",
            "type": "string"
        }
    ],
    "name": "registerDomain",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "constant": false,
    "inputs": [{
        "name": "_topDomainName",
        "type": "string"
    }],
    "name": "renewTopDomain",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "_topDomainName",
        "type": "string"
    }],
    "name": "TopDomainRegistered",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": false,
            "name": "_topDomainName",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "_newOwnerAddress",
            "type": "address"
        }
    ],
    "name": "TopDomainOwnershipChanged",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": false,
            "name": "_topDomainName",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "_newExpire",
            "type": "uint256"
        }
    ],
    "name": "TopDomainRenewed",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": false,
            "name": "_domainName",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "_topDomainName",
            "type": "string"
        }
    ],
    "name": "DomainRegistered",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": false,
            "name": "_domainName",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "_topDomainName",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "_storageHash",
            "type": "string"
        }
    ],
    "name": "DomainStorageHashUpdated",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [{
            "indexed": false,
            "name": "_domainName",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "_topDomainName",
            "type": "string"
        },
        {
            "indexed": false,
            "name": "_newExpire",
            "type": "uint256"
        }
    ],
    "name": "DomainRenewed",
    "type": "event"
}
];
let rpc = 'http://127.0.0.1:8545';

beforeEach(() => {
    indexerService = new Web3IndexerService(
        new Web3Config(
            rpc,
            contractIndexerAbi,
            contractIndexerAddress,
            contractJnsAbi,
            contractJnsAddress
        )
    );
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
        let website = new Website('QmUdiv8F7eFSxZbUTJU8UfvJGc7UewTN9XF5AqkpTMHCxa', 'title', 'desc', 'eth', 'test');

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