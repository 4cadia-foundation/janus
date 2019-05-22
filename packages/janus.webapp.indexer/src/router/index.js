import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import NotFound from '@/view/NotFound'
import About from '@/view/About'
import Form from '@/view/Form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Form',
      name: 'Form',
      component: Form
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
    },
    { path: '*', redirect: '/404' }
  ]
})
