// import Web3IndexerService from 'janus-searchengine'
let Web3IndexerService = require('janus-searchengine')
// import Web3Config from '../../utils/Web3Config.json'

// initial state
// shape: [{ hash, title }]
const state = {
  result: [],
  value: ['tag1'],
  data: []
}

// getters
const getters = {
  getSearchValue: state => state.value,
  getResults ({ commit }) {
    let indexerService = new Web3IndexerService()
    return indexerService
    // commit('gotData', await indexerService.ListByTags('0x2ad73382a193c13f73524ae3c8b40c614fb4a9c0', 0, this.value))
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
    return Web3IndexerService
    // let indexerService = new Web3IndexerService(Web3Config)
    // commit('gotData', await indexerService.ListByTags('0x2ad73382a193c13f73524ae3c8b40c614fb4a9c0', 0, this.value))
  }
}

// mutations
const mutations = {
  setResults (state, result) {
    state.result = result
  },
  gotData (state, data) {
    state.data = data
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
