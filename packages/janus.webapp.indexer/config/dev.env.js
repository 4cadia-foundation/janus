'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IDENTITY_BASE_URL: '"https://janus-identity-provider.herokuapp.com/api/auth"',
  IDENTITY: true,
  CIVICID: '"-uXno0-XF"',
  DISABLE_IDENTITY_CIVIC: false,
  DISABLE_IDENTITY_METAMASK: true
})
