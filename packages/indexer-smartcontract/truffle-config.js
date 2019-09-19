module.exports = {
  compilers: {
    solc: {
      version: '0.5.11',
    },
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*',
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
  },
};
