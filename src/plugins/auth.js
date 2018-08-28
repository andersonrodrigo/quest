// import something here

// leave the export, even if you don't use it
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

export default ({ app, router, Vue }) => {
  Vue.router = new VueRouter;
  Vue.use(VueRouter)
  Vue.use(VueResource)
  process.env.CONTEXTO = 'http://localhost:8070/api'
 
  let urlLogin = process.env.CONTEXTO + '/auth/token'
  let urlUser = process.env.CONTEXTO + '/auth/user'
  let urlRefresh = process.env.CONTEXTO + '/auth/refresh'
  let refreshData = {url: urlRefresh, method: 'POST', enabled: true}
   
  Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'roles',
    loginData: {url: urlLogin, method: 'POST', redirect: '/', fetchUser: true},
    fetchData: {url: urlUser, method: 'GET'},
    refreshData: refreshData,
    parseUserData: (data) => data
  })

 
}
