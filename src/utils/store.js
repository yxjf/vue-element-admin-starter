/**
 * 基本数据存取
 *
 * 一般的后台管理端业务功能之间耦合不大，主要在用户和权限方面
 * 这里使用了 store + PubSubJS 的简单方式，PubSubJS 负责处理组件间的通信，store 负责存取数据
 * 可以根据业务需要自行引入 vuex
 */

import store from 'store'
import PubSub from 'pubsub-js'

const storeKeyPrefix = 'vue-admin-starter-'  // 自定义存储变量前缀
const configKey = storeKeyPrefix + 'config'  // 配置
const tokenKey = storeKeyPrefix + 'token'  // token
const userKey = storeKeyPrefix + 'user'  // 用户信息
const roleKey = storeKeyPrefix + 'role'  // 角色信息
const resourceKey = storeKeyPrefix + 'resource'  // 资源信息

// PubSub 事件 topic
const topics = {
  SET_TOKEN: 'SET_TOKEN',
  REMOVE_TOKEN: 'REMOVE_TOKEN',
  SET_USERINFO: 'SET_USERINFO',
  REMOVE_USERINFO: 'REMOVE_USERINFO',
  SET_ROLE: 'SET_ROLE',
  REMOVE_ROLE: 'REMOVE_ROLE',
  SET_RESOURCE: 'SET_RESOURCE',
  REMOVE_RESOURCE: 'REMOVE_RESOURCE',
}

// 配置相关
const config = {
  getSidebarCollapse() {
    return store.get(configKey).sidebarCollapse
  },
  toggleSidebarCollapse() {
    store.set(configKey, Object.assign(store.get(configKey), {
      sidebarCollapse: !store.get(configKey).sidebarCollapse
    }))
  },
}

// token 相关
// token 作为用户身份的凭证，在登录成功时获取
const token = {
  get() {
    return store.get(tokenKey) || ''
  },
  set(token) {
    store.set(tokenKey, token)
    PubSub.publish(topics.SET_TOKEN, token)
  },
  remove() {
    store.remove(tokenKey)
    PubSub.publish(topics.REMOVE_TOKEN)
  },
}

// 用户信息，如用户名、ID、头像等
const userInfo = {
  get() {
    return store.get(userKey) || {}
  },
  getId() {
    return store.get(userKey) ? (store.get(userKey).id || '') : ''
  },
  getUserName() {
    return store.get(userKey) ? (store.get(userKey).userName || '') : ''
  },
  getDisplayName() {
    return store.get(userKey) ? (store.get(userKey).displayName || '') : ''
  },
  set(userInfo) {
    store.set(userKey, userInfo)
    PubSub.publish(topics.SET_USERINFO, userInfo)
  },
  remove() {
    store.remove(userKey)
    PubSub.publish(topics.REMOVE_USERINFO)
  },
}

// 角色信息
const role = {
  get() {
    return store.get(roleKey)
  },
  set(role) {
    store.set(roleKey, role)
    PubSub.publish(topics.SET_ROLE, role)
  },
  remove() {
    store.remove(roleKey)
    PubSub.publish(topics.REMOVE_ROLE)
  },
}

// 资源信息
// 用户可以访问的菜单、接口、特殊权限标记等统称为资源，每个资源有一个唯一的名称
const resource = {
  get() {
    return store.get(resourceKey)
  },
  set(resource) {
    store.set(resourceKey, resource)
    PubSub.publish(topics.SET_RESOURCE, resource)
  },
  remove() {
    store.remove(resourceKey)
    PubSub.publish(topics.REMOVE_RESOURCE)
  },
}

// 初始化数据
store.set(configKey, {
  sidebarCollapse: false,
})


export default {
  topics,
  config,
  token,
  userInfo,
  role,
  resource,
  clear() {
    store.remove(configKey)
    store.remove(tokenKey)
    store.remove(userKey)
    store.remove(roleKey)
    store.remove(resourceKey)
  },
}
