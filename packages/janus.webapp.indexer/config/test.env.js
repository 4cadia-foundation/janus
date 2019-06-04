'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  IDENTITY_BASE_URL: '"https://janus-identity-provider.herokuapp.com/api/auth"',
  IDENTITY: false,
  CIVICID: '"-uXno0-XF"',
  DISABLE_IDENTITY_CIVIC: false,
  DISABLE_IDENTITY_METAMASK: true
})
