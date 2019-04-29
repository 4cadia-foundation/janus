import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Search from '@/view/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      props: true,
      component: Search
    }
  ]
})
