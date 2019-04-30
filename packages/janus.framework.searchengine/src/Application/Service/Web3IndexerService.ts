import IndexedHtml from '../../Domain/Entity/IndexedHtml'

export default class Web3IndexerService {

    IndexIpfsHostedHtml(ipfsHash: string): IndexedHtml {
        var index = new IndexedHtml();
        index.IpfsHash = ipfsHash;
        index.Description = "teste";
        return index;
    }
}