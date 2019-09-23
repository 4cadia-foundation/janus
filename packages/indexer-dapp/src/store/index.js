import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form'
import validation from './modules/validation'
import web3 from './modules/web3'
import profile from './modules/profile'
import authentication from './modules/authentication'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexStore = new Vuex.Store({
  modules: {
    form,
    validation,
    web3,
    profile,
    authentication
  },
  strict: debug
})

export default vuexStore
