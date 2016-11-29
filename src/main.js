import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'
import * as directives from './directives'

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
