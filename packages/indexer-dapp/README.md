# Janus Dapp Indexer
Indexer front-end is an interface that allows the user to access needed services to push a content in the blockchain and attach it in the Janus system. It also charges gas and tributes for this services, working as a facilitator.

The indexer front end helps to publish and index the websites. Publish in the IPFS and return the valid hash or validate the ipfs hash entered and index the informations on the Janus platform.


<br>

![Indexer](indexer.png)


## Featured Technologies

Vue: Is a progressive framework for building user interfaces.

Web3: Web3 is a collection of libraries which allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection.

<br>

## Prerequites

For those who use Windows is necessary to configure web3

Use the link to install *[WEB3](https://medium.com/@jcbombardelli/configurando-web3-em-um-projeto-node-js-com-windows-984ca1224fa)*


<br>

## Installation


``` bash

# install dependencies
yarn install

# if you are in develop mode enter folder:

janus/packages/indexer-core

# Is run command:
yarn build

# serve with hot reload at localhost:8080
yarn dev

```

<br>


## Run Tests


```bash

# build for production and view the bundle analyzer report
yarn build --report

```

```bash

# run unit tests
yarn unit

```

```bash

# run all tests
yarn test


```
<br>


## Other Commands



``` bash

# run lint code highlight
yarn lint

```

``` bash

# run lint fix code
yarn fix

```

``` bash

# run build production and send the dist folder to another branch
yarn deploy

```

<br>

## Contributing

1. Fork it (<https://github.com/4cadia/janus.webapp.indexer/fork>)
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


