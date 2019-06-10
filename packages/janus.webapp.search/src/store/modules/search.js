import axios from 'axios'
import Web3IndexerService from 'janus-searchengine'

// initial state
const state = {
  web3Config: [],
  storageLink: '',
  result: [],
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
    let indexerService = new Web3IndexerService(state.web3Config)
    if (indexerService !== 'undefinied') {
      console.log('[Web3IndexerService] Connected')
      var searchResult = await indexerService.ListByTags(getters.getArraySearch)
      if (!searchResult.success) {
        let root = this
        searchResult.errors.map(function (value, key) {
          let errorMessage = root.getters['validation/getErrorByType'](value) ? root.getters['validation/getErrorByType'](value) : value
          commit('updateErrors', { error: value, message: errorMessage })
        })
      } else {
        console.log('[IndexerResult] Search result was commited ', searchResult)
        commit('updateSearchResults', searchResult.websites)
      }
    } else {
      console.error('[Web3IndexerService] Unable to connect to Service')
    }
  },
  getWeb3Config ({ commit }) {
    axios.get('./static/configs/web3Config.json')
      .then((response) => {
        console.log('[getWeb3Config] Action being executed')
        console.log('updateWeb3Config', response.data)
        commit('updateWeb3Config', response.data)
      }, (err) => {
        console.log(err.response)
        console.log(err)
        console.error('getWeb3Config requisition error', err)
      })
  }
}

// mutations
const mutations = {
  updateWeb3Config (state, web3Config) {
    state.web3Config = web3Config
    state.storageLink = web3Config.storageLink
  },
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
