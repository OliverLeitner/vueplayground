import { createStore } from 'vuex'

export default createStore({
  state: {
    result: {}
  },
  mutations: {
    fetch(state, payload) {
      state.result = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
