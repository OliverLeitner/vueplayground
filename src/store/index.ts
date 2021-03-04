import { createStore } from 'vuex'

export const mutations = {
    writeResult(state, payload) {
      state.result = payload
    },
    writeSearchItem(state, payload) {
      state.searchItem = payload
    },
}

export default createStore({
  state: {
    searchItem: "",
    result: {},
  },
  mutations,
  actions: {
  },
  modules: {
  }
})