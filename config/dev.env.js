var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL_API: '"http://127.0.0.1:8070/api"',
  //URL_API: '"http://18.217.198.234:8080/ws-questionario/api"',
  VERSAO: '"0.5.0"'
})
