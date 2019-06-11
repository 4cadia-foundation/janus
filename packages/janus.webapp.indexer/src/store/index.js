import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form'
import validation from './modules/validation'
import web3 from './modules/web3'
import profile from './modules/profile'
import authentication from './modules/authentication'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    logged_in: false
  },
  mutations: {
    logged_in (state, value) {
      state.logged_in = value
    }
  },
  modules: {
    form,
    validation,
    web3,
    profile,
    authentication
  },
  strict: debug
})
