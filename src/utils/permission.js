/**
 * 权限
 */
/* eslint-disable */
import Vue from 'vue'
import store from '@/utils/store'
import menu from '@/resources/menu'

// 是否包含角色和权限
// 如果不需要角色和权限功能，可以设置为 false
Vue.config.needPermission = false

const authMenu = store.resource.getMenu()  // 已授权的菜单
const authApi = store.resource.getApi()  // 已授权的API
const authAction = store.resource.getAction()  // 已授权的行为

// 递归匹配menu name筛选菜单
const filterMenu = function (menuObj, authMenu) {
  return menuObj.filter(menu => {
    if (authMenu.indexOf(menu.name) > -1) {
      // 对子菜单进行递归过滤
      if (menu.children && menu.children.length > 0) {
        menu.children = filterMenu(menu.children, authMenu)
      }
      return true
    }
    // 父菜单不匹配，直接不再返回子菜单
    return false
  })
}

// 获取授权访问的菜单
const filteredMenu = function () {
  if (Vue.config.needPermission === false) {
    return menu
  }
  return filterMenu(menu, authMenu)
}

// 是否授权访问菜单
const isAuthMenu = function (resourceName) {
  return Vue.config.needPermission === false ? true : authMenu.indexOf(resourceName) > -1;
}

// 是否授权访问接口
const isAuthApi = function (resourceName) {
  return Vue.config.needPermission === false ? true : authApi.indexOf(resourceName) > -1;
}

// 是否授权访问行为
const isAuthAction = function (resourceName) {
  return Vue.config.needPermission === false ? true : authAction.indexOf(resourceName) > -1;
}

// 添加到 Vue 实例方法
Vue.prototype.isAuthMenu = isAuthMenu
Vue.prototype.isAuthApi = isAuthApi
Vue.prototype.isAuthAction = isAuthAction

export default {
  filteredMenu,
  isAuthMenu,
  isAuthApi,
  isAuthAction,
}
