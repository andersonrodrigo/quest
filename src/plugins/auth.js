import store from 'src/store/index'
import { Dialog } from 'quasar'

export default ({ Vue, router }) => {
  let toLogout = function (next, to) {
    next({
      path: '/logout',
      query: {
        redirect: to.fullPath
      }
    })
  }

  let logout = function (next, to) {
    clearInterval(store.state.user.keepAlive)

    Dialog.create({
      title: 'Sessão expirada.',
      message: ''
    }).then(() => {
      toLogout(next, to)
    }).catch(() => {
      toLogout(next, to)
    })
  }

  let initKeepAlive = function (next, to) {
    clearInterval(store.state.user.keepAlive)

    var varKeepAlive = setInterval(function () {
      var keepAlive = new Promise(function (resolve, reject) {
        Vue.axios.post(process.env.URL_API + '/auth/keepAlive')
          .then((response) => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })

      keepAlive.then((response) => {
        if (!response.data) {
          logout(next, to)
        }
      }).catch(erro => {
        // logout(next, to)
      })
    }, 15000)

    store.commit('user/setKeepAlive', varKeepAlive)
  }

  router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('default_auth_token')
    if (to.meta.requiresAuth && !token) {
      toLogout(next, to)
    } else if (to.meta.requiresAuth && token) {
      var getUser = new Promise(function (resolve, reject) {
        Vue.axios.get(process.env.URL_API + `/auth/user`)
          .then((response) => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })

      Promise.all([getUser]).then(function (values) {
        store.commit('user/setUser', values[0])
        initKeepAlive(next, to)
        next()
      }).catch(erro => {
        logout(next, to)
      })
    } else {
      next()
    }
  })
}
