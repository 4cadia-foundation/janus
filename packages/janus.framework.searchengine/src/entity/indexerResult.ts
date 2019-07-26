import Website from "./website";

export default class IndexerResult {
    public websites: Website[];
    public webSitesCount: number;
    public success: boolean;
    public errors: string[];

    constructor() {
        this.websites = [];
        this.success = true;
        this.errors = [];
        this.webSitesCount = 0;
    }
}