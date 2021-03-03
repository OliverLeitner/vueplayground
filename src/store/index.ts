import { createStore } from 'vuex'

export default createStore({
  state: {
    searchItem: "",
    result: {},
  },
  mutations: {
    writeResult(state, payload) {
      state.result = payload
    },
    writeSearchItem(state, payload) {
      state.searchItem = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
