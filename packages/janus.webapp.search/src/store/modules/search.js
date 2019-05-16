import Web3IndexerService from 'janus-searchengine'
import Web3Config from '../../utils/web3Config.json'

// initial state
const state = {
  result: [],
  value: ''
}

// getters
const getters = {
  getArraySearch: (state, getters) => {
    let splitValue = state.value.split(' ')
    return splitValue
  }
}

// actions
const actions = {
  async getSearchResults ({ state, getters, commit }) {
    let indexerService = new Web3IndexerService(Web3Config)
    if (indexerService !== 'undefinied') {
      console.log('[Web3IndexerService] Connected')
      let providerAddress = indexerService._web3.eth.givenProvider.selectedAddress
      try {
        if (!providerAddress) throw new Error('[Web3IndexerService] Provider Address could not be found')
        var searchResult = await indexerService.ListByTags(providerAddress, 0, getters.getArraySearch)
        if (!searchResult.success) throw new Error(searchResult.errors['0'])
      } catch (err) {
        console.error(err)
      }
      console.log('[IndexerResult] Search result was commited ', searchResult)
      commit('updateSearchResults', searchResult)
    } else {
      console.error('[Web3IndexerService] Unable to connect to Service')
    }
  }
}

// mutations
const mutations = {
  updateSearchResults (state, result) {
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
