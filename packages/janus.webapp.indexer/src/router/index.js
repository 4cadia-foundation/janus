/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import Indexer from '@/view/Indexer'
import NotFound from '@/view/NotFound'
import About from '@/view/About'
import Account from '@/view/Account'
import Profile from '@/view/Profile'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/indexer',
            name: 'Indexer',
            component: Indexer
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
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/account',
            name: 'Account',
            component: Account
        },
        { path: '/documentation', redirect: '/' },
        { path: '*', redirect: '/404' }
    ]
})