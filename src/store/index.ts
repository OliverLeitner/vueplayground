import { createStore } from 'vuex'

export default createStore({
  state: {
    searchItem: "",
    result: {},
    data: []
  },
  mutations: {
    writeResult(state, payload) {
      state.result = payload
    },
    writeSearchItem(state, payload) {
      state.searchItem = payload
    },
    writeWebApiData(state, payload) {
      state.data = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
