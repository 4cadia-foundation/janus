import Website from "./website";

export default class IndexerResult {
    public websites: Website[];
    public success: boolean;
    public errors: string[];

    constructor(){
        this.websites = [];
        this.success = false;
        this.errors = [];
    }
}