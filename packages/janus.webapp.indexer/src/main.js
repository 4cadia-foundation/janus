import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuex)

// eslint-disable-next-line
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
