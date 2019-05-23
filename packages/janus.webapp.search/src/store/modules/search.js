import Web3IndexerService from 'janus-searchengine'
import Web3Config from '../../utils/web3Config.json'

// initial state
const state = {
  result: [],
  ipfs: Web3Config.ipfs,
  value: '',
  errors: []
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
      var searchResult = await indexerService.ListByTags(providerAddress, 0, getters.getArraySearch)
      if (!searchResult.success) {
        let root = this
        searchResult.errors.map(function (value, key) {
          let errorMessage = root.getters['validation/getErrorByType'](value) ? root.getters['validation/getErrorByType'](value) : value
          commit('updateErrors', {error: value, message: errorMessage})
        })
      } else {
        console.log('[IndexerResult] Search result was commited ', searchResult)
        commit('updateSearchResults', searchResult.websites)
      }
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
  },
  updateErrors (state, errors) {
    state.errors.push(errors)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
