// initial state
// shape: [{ hash, title }]
const state = {
  result: [],
  value: ''
}

// getters
const getters = {
  getSearchValue: state => state.value
}

// actions
const actions = {
  // getResults ({ commit, state }, sites) {
  //   const savedResults = [...state.results]
  //   commit('setSearchStatus', null)
  //   // empty results
  //   commit('setSearchResults', { results: [] })
  //   searchService.getContractData(
  //     sites,
  //     () => commit('setSearchStatus', 'successful'),
  //     () => {
  //       commit('setSearchStatus', 'failed')
  //       // rollback to the results saved before sending the request
  //       commit('setSearchResults', { results: savedResults })
  //     }
  //   )
  // }
  getResults ({ commit }) {
  }
}

// mutations
const mutations = {

  setResults (state, result) {
    state.result = result
  },
  updateSearch (state, searchValue) {
    state.value = searchValue
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
