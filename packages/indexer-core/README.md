# Janus Indexer Core

Indexer Core is the bridge between Dapp and SmartContract.
It is responsible for extracting metadata that will be indexed, interacting with the `Indexer` smart contract and also for communicating with the storage layer. 

For smart contracts we currently support only **Ethereum** and for storage currently only **IPFS**, but we plan to include other smart contract engines and decentralized storage solutions in the future.

## Featured Technologies

**IPFS:** The InterPlanetary File System is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. 

**Ethereum:** Is an open source, public, blockchain-based distributed computing platform and operating system featuring smart contract functionality. 

**TypeScript:** Is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language.  


## Build
```bash
# Is run command:
yarn build
```

## Run Tests

```bash
# run unit tests
yarn test:unit
```

```bash
# run all tests
yarn test


```

## Other Commands



``` bash

# run code linter
yarn lint

```

``` bash
# automatically fix issues detected by the linter
yarn lint-fix

```

## Contributing

1. Fork it (<https://github.com/4cadia-foundation/janus/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request


<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
