import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import NotFound from '@/view/NotFound'
import About from '@/view/About'
import FormUploadExample from '@/components/FormUploadExample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/form',
      name: 'Form',
      component: FormUploadExample
    },
    {
      path: '/404',
      name: 'Not Found',
      component: NotFound
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    { path: '*', redirect: '/404' }
  ]
})
