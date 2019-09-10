const baseConfig = require('eslint-config-prettier-standard/lib/base');
const basePrettierConfig = baseConfig.rules['prettier/prettier'][1];

module.exports = {
  extends: ['prettier-standard'],
  parserOptions: {
    ecmaVersion: 2019,
  },
  env: {
    node: true,
    es6: true,
    commonjs: true,
    mocha: true,
    'truffle/truffle': true,
  },
  plugins: ['truffle'],
  rules: {
    'prettier/prettier': [
      'error',
      Object.assign({}, basePrettierConfig, {
        trailingComma: 'es5',
        semi: true,
        endOfLine: 'auto',
      }),
    ],
  },
};
