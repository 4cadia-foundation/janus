import Web3IndexerService from 'janus-searchengine'
import Web3Config from '../../utils/Web3Config.json'

// initial state
const state = {
  result: [],
  value: '',
  data: []
}

// getters
const getters = {
  getSearchValue: state => state.value,
  getResults({ commit }) {
    let indexerService = new Web3IndexerService(Web3Config)
    return indexerService
    commit('setResults', indexerService.ListByTags('0x2ad73382a193c13f73524ae3c8b40c614fb4a9c0', 0, this.value))
  }
}

// actions
const actions = {
  getResults({ commit }) {
    // return Web3IndexerService
    // let indexerService = new Web3IndexerService(Web3Config)
    // commit('setResults', await indexerService.ListByTags('0x2ad73382a193c13f73524ae3c8b40c614fb4a9c0', 0, this.value))
  }
}

// mutations
const mutations = {
  setResults(state, result) {
    console.log(state)
    state.result = result
  },
  updateSearch(state, searchValue) {
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
