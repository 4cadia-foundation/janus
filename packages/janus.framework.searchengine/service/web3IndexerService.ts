import IWeb3IndexerService from '../interface/IWeb3IndexerService'
const Web3 = require('web3');
import Website from '../entity/Website';

import Web3Config from '../web3config.json';
import IndexerResult from '../entity/IndexerResult';

export default class Web3IndexerService implements IWeb3IndexerService {
    private _web3;
    private _indexerSmartContract;

    constructor() {
        this._web3 = new Web3(Web3Config.rpc);
        this._indexerSmartContract = new this._web3.eth.Contract(Web3Config.indexerabi, Web3Config.indexeraddress);
    }

    public async ListByTags(ownerAddress: string, gas: number, tags: string[]): Promise<IndexerResult> {
        let indexerResult = new IndexerResult();
        indexerResult.success = this._web3.utils.isAddress(ownerAddress);

        if (!indexerResult.success) {
            indexerResult.errors.push('invalid owner address');
            return indexerResult;
        }

        let result = await this._indexerSmartContract.methods.getWebSite(tags)
            .call({ from: ownerAddress, gas: gas })
            .then(a => { return a; });

        result.forEach(element => {
            let i = 0;
            if (element && element.length > 0) {
                let storageHash = element.split(';')[0];
                let title = element.split(';')[1];
                let description = element.split(';')[2];
                indexerResult.websites[i] = new Website(storageHash, title, description);
                i++;
            }
        });

        return indexerResult;
    }
}