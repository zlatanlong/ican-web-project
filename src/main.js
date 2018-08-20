// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(VueAxios, axios)
Vue.use(iView)

// require('./mock.js')// 模拟数据

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  // 路由层面控制访问
  var loggedIn = true
  if (loggedIn) { next() }
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
