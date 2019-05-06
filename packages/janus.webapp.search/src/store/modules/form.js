// initial state
const state = {
  search: '',
  submitting: 'Janus is searching for { keyword }'
}

// getters
const getters = {
  getSearch: state => state.search
}

// actions
const actions = {}

// mutations
const mutations = {
  updateForm (state, searchValue) {
    state.search = searchValue
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
