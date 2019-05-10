export default class Web3Config {
    public rpc: string;
    public indexerabi: object;
    public indexeraddress: string;

    constructor(rpc: string, indexerabi: object, indexeraddress: string){
        this.rpc = rpc;
        this.indexerabi = indexerabi;
        this.indexeraddress = indexeraddress;
    }
}