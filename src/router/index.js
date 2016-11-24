import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HomePage = resolve => require(['../views/HomePage'], resolve)
const Login = resolve => require(['../views/Login'], resolve)
const Home = resolve => require(['../views/Home'], resolve)
const Messages = resolve => require(['../views/Messages'], resolve)

const router = new Router({
  // mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   // 这个功能只在 HTML5 history 模式下可用: mode: 'history'
  //   // scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  //   // 这个方法返回滚动位置的对象信息，长这样：
  //   // { x: number, y: number }
  //   // { selector: string }
  //   // 如果返回一个布尔假的值，或者是一个空对象，那么不会发生滚动。
  //   return {
  //     x: 0,
  //     y: 0
  //   }
  // },
  routes: [{
    path: '/homepage',
    name: 'HomePage',
    component: HomePage
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/messages',
    children: [{
      path: '/home/messages',
      name: 'Messages',
      component: Messages
    }]
    // alias: '/item', // 别名
  }, {
    path: '*',
    redirect: '/homepage' // 重定向
  }]
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  next() // 必须调用，否则导航会终止
})

router.afterEach(route => {
  window.scrollTo(0, 0) // 回到页面顶部
})

export { router as default }
