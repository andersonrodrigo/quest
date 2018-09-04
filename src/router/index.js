import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
 
Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Vue.router = Router

let urlApi = process.env.URL_API
let urlLogin = urlApi + '/auth/token'
let urlUser = urlApi + '/auth/user'
let urlRefresh = urlApi + '/auth/refresh'

Vue.use(VueAxios, axios)

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'roles',
 
  loginData: {url: urlLogin, method: 'POST',redirect: '/', fetchUser: false},
 
  fetchData: {url: urlUser, method: 'GET'},
  refreshData: {url: urlRefresh, method: 'POST', enabled: false},
  parseUserData: (data) => data
})
 
Vue.axios.defaults.baseURL = urlApi

export default Router
