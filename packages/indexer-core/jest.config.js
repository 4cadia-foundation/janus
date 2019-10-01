const { resolve } = require('path');

module.exports = {
  ...require('../../jest.config.js'),
  rootDir: '.',
  globals: {
    'ts-jest': {
      tsConfig: resolve(__dirname, 'tsconfig.json'),
    },
  },
};
