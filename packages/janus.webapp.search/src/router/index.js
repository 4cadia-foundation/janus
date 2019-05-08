import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import NotFound from '@/view/NotFound'
import About from '@/view/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/404',
      name: 'Not Found',
      component: NotFound
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
