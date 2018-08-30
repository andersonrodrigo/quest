var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL_API: '"http://localhost:8070/api"',
  VERSAO: '"0.5.0"'
})
