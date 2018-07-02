/**
 * 登录相关接口
 */

import request from '@/utils/request'
import store from '@/utils/store'
import api from '@/resources/api'

// 登录
export function login(username, password) {
  return request({
    url: api.login,
    method: 'post',
    data: {
      username,
      password
    }
  }).then(data => {
    // 设置 token 和 userInfo，可以根据返回格式自行修改
    store.token.set(data.token)
    store.userInfo.set(data.user)
  })
}

// 退出
export function logout() {
  return request({
    url: api.logout,
    method: 'post'
  }).then(() => {
    store.clear()
  })
}
