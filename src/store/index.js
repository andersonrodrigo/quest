import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import user from './module/user'
import usuario from './usuario'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      usuario
    }
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept(['./usuario'], () => {
      const newUsuario = require('./usuario').default
      store.hotUpdate({ modules: { usuario: newUsuario } })
    })
  }
  return Store
}
