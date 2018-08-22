import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/pages/user/login'
// import Register from '@/pages/user/register'
// import Home from '@/pages/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/pages/home'], resolve)
    },
    {
      path: '/Cook',
      name: 'Cook',
      component: resolve => require(['@/pages/goCook'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/user/login'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/user/register'], resolve)
    }
  ]
})
