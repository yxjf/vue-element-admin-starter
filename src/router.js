/**
 * 路由设置
 */

import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '@/store';
import permission from '@/utils/permission';
import menu from '@/resources/menu';
import actionTypes from '@/store/action-types';
import auth from '@/utils/authenticate';

Vue.use(Router);

const routes = [
  {
    name: 'login.index',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/login/index'),
  },
  ...menu,
  {
    path: '*',
    meta: {
      title: '404',
    },
    component: () => import('@/views/404'),
  },
];

const router = new Router({
  mode: 'history', // 路由模式
  scrollBehavior: () => ({
    x: 0,
    y: 0,
  }),
  routes,
});

// 路由跳转前进行身份认证

// 白名单，不会重定向
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title;

  const url = new URL(location.href);

  // SSO casServer跳转回来，携带以下参数，页面获取参数并调用后端登录鉴权接口进行登录
  const tgtId = url.searchParams.get('tgtId');
  const username = url.searchParams.get('username');
  const ticket = url.searchParams.get('ticket');

  if (tgtId && username && ticket) {
    store
      .dispatch(actionTypes.ssoAuth, {
        username,
        tgtId,
      })
      .then(() => {
        url.searchParams.delete('tgtId');
        url.searchParams.delete('username');
        url.searchParams.delete('ticket');
        location.href = url.toString();
        // router.push({ path: '/' });
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        NProgress.done();
      });
  } else {
    // 如果存在 token
    if (store.getters['token'] && permission.isAuthMenu(to.name)) {
      // if (permission) {
      // 如果当前没有用户信息，首先进行获取
      const userInfo = store.getters['userInfo'];
      if (!userInfo.userName) {
        store
          .dispatch(actionTypes.getCurrentUser, {})
          .then(() => {
            console.log('userInfo got...');
          })
          .catch(err => {
            console.log('获取用户信息失败了');
            console.error(err);
            // 用户信息获取失败，重新登录
            store.dispatch(actionTypes.logout).then(() => {
              // this.$router.push({ path: '/login' });
              auth.ssoGoToLogout();
            });
          });
      }
      if (to.path === '/login') {
        // 跳过登录
        next({
          path: '/',
        });
        NProgress.done();
      } else {
        next();
      }
    } else {
      if (whiteList.indexOf(to.path) > -1) {
        next();
      } else {
        // 直接跳转到登录，也可以给出提示
        next({
          path: '/login',
        });
        NProgress.done();
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
