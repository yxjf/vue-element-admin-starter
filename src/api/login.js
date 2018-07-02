/**
 * 登录相关接口
 */

import request from '@/utils/request'
import store from '@/utils/store'
import api from '@/resources/api'
import {Notification} from 'element-ui'

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
    if (!data.token) {
      Notification.error({
        title: '错误',
        message: 'Token 错误',
        duration: 0
      })
      throw new Error('Token 错误')
    }

    // 设置 token、userInfo和权限信息，可以根据返回格式自行修改
    store.token.set(data.token)
    store.userInfo.set(data.userInfo)
    store.role.set(data.role)
    store.resource.set(data.resource)
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
