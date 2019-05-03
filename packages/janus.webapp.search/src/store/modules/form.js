// initial state
// shape: [{ hash, title }]
const state = {
  search: '',
  status: null
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  updateForm (state, search) {
    state.search = search
  },
  updateFormStatus (state, status) {
    state.status = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
