import searchService from '../../api/searchService'

// initial state
// shape: [{ hash, title }]
const state = {
  results: [],
  successs: null
}

// getters
const getters = {
  filteredResults: (state, getters, rootState) => {
    return state.results.map(({ Search }) => {
      console.log(Search)
      // const site = rootState.sites.all.find(site => site.hash === hash)
      // return {
      //   title: site.title,
      //   description: site.description
      // }
    })
  }
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
    searchService.getContractData(results => {
      commit('setResults', results)
    })
  }
}

// mutations
const mutations = {

  setResults (state, results) {
    state.results = results
  }

  // setSearchResults (state, { results }) {
  //   state.results = results
  // },

  // setSearchStatus (state, status) {
  //   state.successs = status
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
