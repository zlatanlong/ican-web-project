import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/user/login'
import Register from '@/pages/user/register'
import Home from '@/pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      children: [
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
