// initial state
const state = {
  userId: [],
  data: [],
  response: [],
  authenticated: false,
  metamaskStatus: false
}

// getters
const getters = {
}

// actions
const actions = {}

// mutations
const mutations = {
  setUserId (state, userId) {
    state.userId = userId
  },
  setData (state, data) {
    state.data = data
  },
  setAuthentication (state, authenticated) {
    state.authenticated = authenticated
  },
  setResponse (state, response) {
    state.response = response
    state.userId = response.userId
    state.data = response.data
    if (response.userId !== undefined && response.userId.length > 0) {
      state.authenticated = true
    } else {
      state.authenticated = false
    }
    console.log('setResponse ', state.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
