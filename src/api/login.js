/**
 * 登录相关接口
 */

import { Notification } from 'element-ui';
import request from '@/utils/request';
import api from '@/resources/api';

// 登录
export function login(username, password) {
  return request({
    url: api.login,
    method: 'post',
    data: {
      username,
      password,
    },
  }).then(data => {
    if (!data.token) {
      Notification.error({
        title: '错误',
        message: 'Token 错误',
        duration: 0,
      });
      throw new Error('Token 错误');
    }
    return data;
  });
}

// 退出
export function logout() {
  return request({
    url: api.logout,
    method: 'post',
  });
}
