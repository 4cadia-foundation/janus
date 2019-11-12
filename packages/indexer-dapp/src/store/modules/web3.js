// import getWeb3 from '../../utils/getWeb3'
import Web3 from 'web3'
const sleep = (ms = 1000) => new Promise((resolve, reject) => setTimeout(resolve, ms))

// initial state
const state = {
  address: null,
  coinbase: null,
  instance: () => ({
    web3: {}
  }),
  isLocal: false,
  isInjected: false,
  network: null,
  balance: null
}

// getters
const getters = {
  address: state => state.address,
  coinbase: state => state.coinbase,
  instance: state => state.instance,
  isInjected: state => state.isInjected,
  isLocal: state => state.isLocal,
  network: state => state.network,
  balance: state => state.balance,
  networkName: state => state.networkId
}

// actions
const actions = {
  connectToWeb3: ({ commit }) =>
    new Promise((resolve, reject) => {
      if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
        // eslint-disable-next-line no-undef
        ethereum.enable()
          .then(async () => {
            window.web3 = window.ethereum
            const w3 = new Web3(window.web3)
            const isInject = await w3.eth.net.isListening()
            commit('setInjected', isInject)
            commit('setInstance', () => w3)
            commit('setLocal', false)
            resolve(w3)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      } else {
        alert('You need to have MetaMask installed or grant this page to access your account.')
        reject(new Error('Metamask is not installed'))
      }
    }),
  getBlockchainNetwork: ({ commit, state }) =>
    new Promise((resolve, reject) => {
      state.instance().eth.net.getNetworkType()
        .then(network => {
          commit('setNetwork', network)
          resolve(network)
        })
        .catch(error => reject(error))
    }),
  getCoinbase: ({ commit, state }) =>
    new Promise((resolve, reject) => {
      state.instance().eth.getCoinbase((err, coinbase) => {
        if (err) {
          if (state.address) {
            commit('setCoinbase', state.address)
            resolve(state.address)
          }
          reject(err)
        } else {
          if (state.coinbase !== coinbase) commit('setCoinbase', coinbase || state.address)
          resolve(coinbase)
        }
      })
    }),
  getBalance: ({ commit, state }) =>
    new Promise((resolve, reject) => {
      const coinbase = state.coinbase
      if (!coinbase) {
        return resolve('0')
      }
      state.instance().eth.getBalance(state.coinbase, (err, result) => {
        if (err) {
          reject(err)
        } else {
          const balance = state.instance().utils.fromWei(result.toString(10), 'ether')
          if (state.balance !== balance) commit('setBalance', balance)
          resolve(balance)
        }
      })
    }),
  async monitorWeb3 ({ state, dispatch, commit }) {
    while (true) {
      await sleep(300000)
      try {
        const address = await dispatch('getCoinbase')
        if (address !== state.address) commit('setAddress', address)
      } catch (err) {
        console.log('get coinbase error:', err)
      }
      try {
        await dispatch('getBalance')
      } catch (err) {
        console.log('get balance error:', err)
      }
    }
  },
  async initWeb3 ({ dispatch, commit }) {
    await dispatch('connectToWeb3')
    await dispatch('getBlockchainNetwork')
    try {
      commit('setAddress', await dispatch('getCoinbase'))
    } catch (err) {
      console.log('get coinbase error:', err)
    }
    try {
      await dispatch('getBalance')
    } catch (err) {
      console.log('get balance error:', err)
    }
    dispatch('monitorWeb3')
  }
}

// mutations
const mutations = {
  setInjected (state, payload) {
    state.isInjected = payload
  },
  setInstance (state, payload) {
    state.instance = payload
  },
  setNetwork (state, payload) {
    state.network = payload
  },
  setLocal (state, payload) {
    state.isLocal = payload
  },
  setCoinbase (state, payload) {
    state.coinbase = payload
  },
  setAddress (state, payload) {
    state.address = payload
  },
  setBalance (state, payload) {
    state.balance = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
