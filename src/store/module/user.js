const state = {
    data: {},
    keepAlive: undefined
  }
  
  const getters = {
    data: state => state.data
  }
  
  const mutations = {
    setUser (state, user) {
      state.data = user
    },
    setKeepAlive (state, keepAlive) {
      state.keepAlive = keepAlive
    }
  }
  
  const subscribe = function (mutation, state, store) {
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    subscribe,
    mutations
  }
  