import Web3IndexerService from './Application/Service/Web3IndexerService'
export default class Spider {
    // static numberRegexp = /^[0-9]+$/;
    // public isAcceptable(s: string) {
    //     return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
    // }
    public IndexIpfsHostedHtml(ipfsHash: string) {
        var service = new Web3IndexerService();
        return service.IndexIpfsHostedHtml(ipfsHash);
    }
}