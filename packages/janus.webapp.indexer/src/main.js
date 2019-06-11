import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueNotification from '@kugatsu/vuenotification'
import VueApexCharts from 'vue-apexcharts'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(VueAxios, axios)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.use(VueNotification, {
  timer: 20,
  showCloseIcn: true,
  position: 'bottomRight'
})

Vue.use(Loading, {
  canCancel: false,
  onCancel: this.onCancel,
  color: '#7757f9',
  backgroundColor: '#000000'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
