import axios from 'axios'

// initial state
const state = {
  isAuthenticated: false,
  authToken: '',
  authProvider: '',
  MetaMask: {},
  Civic: {}
}

// getters
const getters = {}

// actions
const actions = {
  logout ({ commit }) {
    commit('setAuthentication', { status: false, token: '', provider: '' })
  },
  async loginMetaMask ({ dispatch, commit, rootState }) {
    await dispatch('web3/initWeb3', {}, {root: true})
    axios.post(process.env.IDENTITY_BASE_URL, {'token': rootState.web3.address})
      .then((response) => {
        commit('profile/setResponse', response.data, {root: true})
        commit('setAuthentication', { status: true, token: rootState.web3.address, provider: 'metamask' })
      }, (err) => {
        console.error('[loginMetaMask] Error from backend requisition ', err)
        alert('We had an problem with MetaMask. Try again later or use another provider...')
      })
  },
  async loginCivic ({ commit }) {
    /* global Civic */
    /* eslint no-undef: "error" */
    console.log(process.env.CIVICID)
    let civicSip = new Civic({appId: `${process.env.CIVICID}`})
    civicSip.signup({style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP})
    try {
      civicSip.on('auth-code-received', event => {
        if (event.response) {
          // console.log(event.response)
          axios.post(process.env.IDENTITY_BASE_URL, {'token': event.response})
            .then((response) => {
              console.log(response.data)
              this.$store.commit('profile/setResponse', response.data)
              commit('setAuthentication', { status: true, token: event.response, provider: 'civic' })
            }, (err) => {
              civicSip.error = true
              console.error('[loginCivic] erro vindo do backend ', err)
            })
        }
      })
    } catch (err) {
      civicSip.error = true
      console.error('[loginCivic] error ', err)
    } finally {
      commit('updateCivic', civicSip)
      // console.log('updateCivic', civicSip)
    }
  }
}

// mutations
const mutations = {
  updateMetamask (state, data) {
    state.MetaMask = data
  },
  updateCivic (state, data) {
    state.Civic = data
  },
  setAuthentication (state, payload) {
    // console.log(state, payload)
    state.isAuthenticated = payload.status
    let janusToken = 'janusToken=' + payload.token
    state.authToken = janusToken
    document.cookie = janusToken
    state.authProvider = payload.provider
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
