const HDWalletProvider = require('@truffle/hdwallet-provider');

const { WALLET_MNEMONIC, INFURA_API_KEY } = process.env;

module.exports = {
  compilers: {
    solc: {
      version: '0.5.11',
    },
  },
  networks: {
    local: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '5577',
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          WALLET_MNEMONIC,
          `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`
        ),
      network_id: '4',
    },
  },
};
