const { resolve } = require('path');

module.exports = {
  ...require('../../jest.config.js'),
  globals: {
    'ts-jest': {
      tsConfig: resolve(__dirname, 'tsconfig.json'),
    },
  },
};
