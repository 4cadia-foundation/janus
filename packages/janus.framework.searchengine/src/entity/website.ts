export default class Website{
    public storageHash: string;
    public title: string;
    public description: string;

    constructor(storageHash: string, title: string, description: string){
        this.storageHash = storageHash;
        this.title = title;
        this.description = description;
    }
}