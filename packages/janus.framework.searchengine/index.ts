import Web3IndexerService from './service/web3IndexerService';


let indexerService = new Web3IndexerService();
let result = indexerService.ListByTags('0x954df17d3c8a79ebb4ae62d89f9360a970815bc2', 0, ['tag1']).then(function (data) {
    console.log(data);
});

export { Web3IndexerService as Web3IndexerService };