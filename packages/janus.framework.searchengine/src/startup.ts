import "reflect-metadata";
import { container } from "tsyringe";

import Web3IndexerService from './application/service/web3IndexerService';

container.register('IWeb3IndexerService', {
    useClass: Web3IndexerService
});

export { container as container};