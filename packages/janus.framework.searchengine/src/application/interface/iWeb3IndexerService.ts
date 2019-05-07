export default interface IWeb3IndexerService {
    ListByTags(ownerAddress: string, tags: string[]);
}