// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import todowhat from './components/tdwhat/tdwhat'
import todolist from './components/todolist/todolist'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/tdwhat', component: todowhat },
  { path: '/todolist', component: todolist }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  todowhat,
  todolist,
  store
})
