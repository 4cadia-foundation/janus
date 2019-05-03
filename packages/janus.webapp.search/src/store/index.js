import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form'
import search from './modules/search'
import validation from './modules/validation'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    form,
    search,
    validation
  },
  strict: debug
})
