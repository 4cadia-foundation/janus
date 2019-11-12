import Web3 from 'web3';
import Website from '../entity/Website';

import IndexerResult from '../entity/IndexerResult';
import Web3Config from '../entity/Web3Config';

export default class Web3IndexerService {
    private _web3;
    private _indexerSmartContract;
    private _jnsSmartContract;

    constructor(web3Config: Web3Config) {
        this._web3 = new Web3(web3Config.rpc);
        this._indexerSmartContract = new this._web3.eth.Contract(web3Config.indexerabi, web3Config.indexeraddress);
        this._jnsSmartContract = new this._web3.eth.Contract(web3Config.jnsabi, web3Config.jnsaddress);
    }

    public async ListByTags(tags: string[],
                            pageNumber: number,
                            pageSize: number)
        : Promise<IndexerResult> {

        const indexerResult = new IndexerResult();

        for (let i = 0; i < tags.length; i++) {

            tags[i] = tags[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        }

        const result = await this._indexerSmartContract.methods.getWebSite(tags, pageNumber, pageSize)
            .call()
            .then((a) => a);

        for (let i = 0; i < result[0].length; i++) {
            const element = result[0][i];

            if (element && element.length > 0) {
                const storageHash = element.split(';')[0];
                const title = element.split(';')[1];
                const description = element.split(';')[2];

                const jns = await this._jnsSmartContract.methods.getDomainByStorageHash(storageHash)
                    .call()
                    .then((a) => a);

                indexerResult.websites[i] = new Website(
                    storageHash,
                    title,
                    description,
                    jns.topDomain,
                    jns.domain);
            }
        }

        indexerResult.webSitesCount = parseInt(result[1]);

        console.log(indexerResult.websites);

        return indexerResult;
    }
}
