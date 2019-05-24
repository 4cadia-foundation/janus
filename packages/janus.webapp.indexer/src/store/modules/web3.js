import getWeb3 from '../../utils/getWeb3'

// initial state
const state = {
  instance: {},
  account: null
}

// getters
const getters = {}

// actions
const actions = {
  async registerWeb3 ({commit}) {
    console.log('[registerWeb3] Action being executed')
    commit('registerWeb3Instance', await getWeb3)
  }
}

// mutations
const mutations = {
  registerWeb3Instance (state, payload) {
    console.log('[registerWeb3instance] Mutation being executed')
    state.instance = payload
    state.account = payload.accounts['0']
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
