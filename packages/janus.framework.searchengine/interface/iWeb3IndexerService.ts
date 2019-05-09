export default interface IWeb3IndexerService {
    ListByTags(ownerAddress: string, gas: number, tags: string[]);
}