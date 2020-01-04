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
      host: 'rinkeby.4cadia.com',
      port: 8545,
      network_id: '4',
    },
  },
};
