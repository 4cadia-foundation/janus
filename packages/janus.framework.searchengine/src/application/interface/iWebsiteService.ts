import Website from "../../domain/entity/Website";

export default interface IWebsiteService{
    ListByTags(ownerAddress: string, tags: string[]);
}