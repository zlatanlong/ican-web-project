import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/user/login'
import Register from '@/pages/user/register'

Vue.use(Router)

export default new Router({
  routes: [
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
