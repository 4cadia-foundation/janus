'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IDENTITY_BASE_URL: '"http://localhost:5000/api/auth"',
  IDENTITY: true,
  CIVICID: '"-uXno0-XF"',
  DISABLE_IDENTITY_CIVIC: false,
  DISABLE_IDENTITY_METAMASK: true
})
