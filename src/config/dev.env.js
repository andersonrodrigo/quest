var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://localhost:8070/"',
  //API: '"https://geosite.policiamilitar.mg.gov.br/"',
  ASSETSPUBLICPATH: '/mapacad-mobile/',
  //API: '"https://geosite.policiamilitar.mg.gov.br/mapacad-mobile/"'
  //CONTEXT_AUTH: '""'
  CONTEXT_AUTH: '""'
})
