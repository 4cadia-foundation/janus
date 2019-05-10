import Web3 from 'web3';
import Website from '../entity/Website';

import IndexerResult from '../entity/IndexerResult';
import Web3Config from '../entity/Web3Config';

export default class Web3IndexerService {
    private _web3;
    private _indexerSmartContract;

    constructor(web3Config: Web3Config) {
        this._web3 = new Web3(web3Config.rpc);
        this._indexerSmartContract = new this._web3.eth.Contract(web3Config.indexerabi, web3Config.indexeraddress);
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