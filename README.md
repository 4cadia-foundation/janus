# Janus

## Applications

### Indexer

Indexer front-end is an interface that allows the user to access needed services to push a content in the blockchain and attach it in the Janus system. It also charges gas and tributes for this services, working as a facilitator.  
The indexer front end helps to publish and index the websites. Publish in the IPFS and return the valid hash or validate the ipfs hash entered and index the informations on the Janus platform.

### Search

Search front-end is an interface that allows the user to search for websites and contents that were indexed in the Janus platform. The search interface is an easy way to find websites and contents uploaded on the blockchain, it locates the matching tags the user is looking for with the ones on the system and return a list of results that may interest for the user.

## Featured Technologies

**Smart Contract:** A smart contract is a computer protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of a contract.

**Solidity:** Solidity is an object-oriented programming language for writing smart contracts. It is used for implementing smart contracts on various blockchain platforms, most notably, Ethereum.

**IPFS:** The InterPlanetary File System is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. 

**Ethereum:** Is an open source, public, blockchain-based distributed computing platform and operating system featuring smart contract functionality. 

**TypeScript:** Is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language.

**Web3:** Web3 is a collection of libraries which allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection.

**Vue:** Is a progressive framework for building user interfaces.

## Prerequites

- [Node.js](https://nodejs.org/en/): `>=8.0.0 <12.0.0`
- [Yarn](https://yarnpkg.com/lang/en/): `>=1.0.0`

### Windows users only

For those who use Windows is necessary to [install and configure web3](https://medium.com/@jcbombardelli/configurando-web3-em-um-projeto-node-js-com-windows-984ca1224fa).

## Installation

``` bash
# install dependencies
lerna bootstrap

# **Only** if you are in develop mode, run :
lerna run build --scope=@4cadia/janus-indexer-core

# serve with hot reload at localhost:8080
lerna run build --scope=@4cadia/janus-indexer-dapp
```

## Run Tests

```bash
# run unit tests
lerna run test:unit [--scope=<package>]
```

```bash
# run all tests
lerna run test [--scope=<package>]
```

## Other Commands



``` bash
# run linters
lerna run lint [--scope=<package>]
```

``` bash
# run linter to automatically fix code
lerna lint-fix [--scope=<package>]
```

## Contributing

1. Fork it (<https://github.com/4cadia-foundation/janus/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
