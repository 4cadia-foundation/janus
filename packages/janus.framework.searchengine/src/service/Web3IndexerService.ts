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

    public async ListByTags(tags: string[]): Promise<IndexerResult> {

        let indexerResult = new IndexerResult();

        let result = await this._indexerSmartContract.methods.getWebSite(tags)
            .call()
            .then(a => { return a; });

        let i = 0;

        result.forEach(element => {
            if (element && element.length > 0) {
                let storageHash = element.split(';')[0];
                let title = element.split(';')[1];
                let description = element.split(';')[2];
                indexerResult.websites[i] = new Website(storageHash, title, description);
                i++;
            }
        });

        console.log(indexerResult);

        return indexerResult;
    }
}