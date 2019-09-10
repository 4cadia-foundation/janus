// initial state
const state = {
  userId: [],
  data: [],
  response: [],
  metamaskStatus: false
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  setUserId (state, userId) {
    state.userId = userId
  },
  setData (state, data) {
    state.data = data
  },
  setResponse (state, response) {
    state.response = response
    state.userId = response.userId
    state.data = response.data
    // console.log('setResponse ', state.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
