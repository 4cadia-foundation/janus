// initial state
const state = {
  input: '',
  return: []
}

// getters
const getters = {
  getInput: state => state.input
}

// actions
const actions = {
}

// mutations
const mutations = {
  setInput (state, input) {
    state.input = input
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
