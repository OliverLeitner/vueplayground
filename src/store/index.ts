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
  getters: {
    results: state => state.result
  },
  actions: {
  },
  modules: {
  }
})
