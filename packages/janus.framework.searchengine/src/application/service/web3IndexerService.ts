import IWeb3IndexerService from '../interface/iWeb3IndexerService'
import { inject, injectable } from 'tsyringe';
const Web3 = require('web3');
import Website from '../../domain/entity/website';

const indexerAddress = '0xb995b1ce330f4b4ff1797798006c2840cb48e794';
const indexerAbi = [
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

@injectable()
export default class web3IndexerService implements IWeb3IndexerService {
    private _web3;
    private _indexerSmartContract;

    constructor() {
        this._web3 = new Web3("http://10.0.13.38:8545");
        this._indexerSmartContract = new this._web3.eth.Contract(indexerAbi, indexerAddress);
    }

    public async ListByTags(ownerAddress: string, tags: string[]) {
        let websites:Website[] = new Array(15);

        let result = await this._indexerSmartContract.methods.getWebSite(tags)
            .call({ from: ownerAddress, gas: 3000000 })
            .then(a => { return a; });

        result.forEach(element => {
            let i = 0;
            if (element && element.length > 0) {
                let storageHash = element.split(';')[0];
                let title = element.split(';')[1];
                let description = element.split(';')[2];
                websites[i] = new Website(storageHash, title, description);
                i++;
            }
        });

        return websites;
    }
} 