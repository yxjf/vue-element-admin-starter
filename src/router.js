/**
 * 路由设置
 */

import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from './utils/store'
import Resource from './resource.js'

Vue.use(Router)

const routes = [
  {
    name: 'login.index',
    path: '/login',
    component: () => import('@/views/login/index')
  },
  ...Resource.menu,
  {
    path: '*',
    component: () => import('@/views/404')
  },
]

const router = new Router({
  mode: 'history',  // 路由模式
  routes,
})

// 路由跳转前进行身份认证

// 白名单，不会重定向
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title
  // 如果存在 token
  if (store.token.get()) {
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      // 直接跳转到登录，也可以给出提示
      next({path: '/login'})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
