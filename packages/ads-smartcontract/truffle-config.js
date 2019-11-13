module.exports = {
  compilers: {
    solc: {
      version: '0.5.12'
    },
  },
  networks: {
    local: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '1001'
    },
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '5577'
    },
    rinkeby: {
      host: 'rinkeby.caralabs.me',
      port: 18575,
      network_id: '4'
    }
  }
};
