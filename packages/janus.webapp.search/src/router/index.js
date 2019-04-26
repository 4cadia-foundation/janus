import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Result from '@/view/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/results',
      name: 'Result',
      component: Result
    }
  ]
})
