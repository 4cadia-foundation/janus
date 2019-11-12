export default class Web3Config {
    public rpc: string;
    public indexerabi: object;
    public indexeraddress: string;
    public jnsabi: object;
    public jnsaddress: string;

    constructor(rpc: string, indexerabi: object, indexeraddress: string, jnsabi: object, jnsaddress: string) {
        this.rpc = rpc;
        this.indexerabi = indexerabi;
        this.indexeraddress = indexeraddress;
        this.jnsabi = jnsabi;
        this.jnsaddress = jnsaddress;
    }
}
