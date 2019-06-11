// initial state
const state = {
  status: null,
  userID: [],
  data: [],
  response: []
}

// getters
const getters = {

}

// actions
const actions = {}

// mutations
const mutations = {
  update (state, status) {
    state.status = status
  },
  setResponse (state, response) {
    state.response = response
    state.userID = response.userID
    state.data = response.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
