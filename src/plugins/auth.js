import store from 'src/store/index'
import { Dialog } from 'quasar'

export default ({ Vue, router }) => {
  let me = this;
  let toLogout = function (next, to) {
    next({
      path: '/logout',
      query: {
        redirect: to.fullPath
      }
    })
  }

  let guardaUsuario = function(user){
    
    localStorage.setItem('user', JSON.stringify(user));
  }

   

  router.beforeEach((to, from, next) => {
 
    let token = localStorage.getItem('default_auth_token')
    if (!token) {
      if (to.path == '/logout' || to.path == '/login'){
        next()
      }else
        toLogout(next, to)
    } else if (to.meta.requiresAuth && token) {
      var getUser = new Promise(function (resolve, reject) {
        Vue.axios.get(process.env.URL_API +  '/auth/user')
          .then((response) => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
     
     
      Promise.all([getUser]).then(function (values) {
        guardaUsuario(values)
        //store.commit('user/setUser', values[0])
        //store.commit('usuario/updateUsuarioState', values[0])
       
        next()
      }).catch(erro => {
        toLogout();
      })
    } else {
      next()
    }
  })
}
