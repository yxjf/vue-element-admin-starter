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
    console.log(data);
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

// SSO鉴权，鉴权成功后将返回token及token有效期
export function ssoAuth(username, encryptedTgtId) {
  return request({
    url: api.ssoAuth,
    method: 'post',
    data: {
      username,
      encryptedTgtId,
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

export function getCurrentUser() {
  return request({
    url: api.getCurrentUser,
    method: 'post',
    data: {},
  }).then(data => {
    console.log(data);
    if (!data) {
      Notification.error({
        title: '错误',
        message: '获取用户信息错误',
        duration: 0,
      });
      throw new Error('获取用户信息错误');
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
