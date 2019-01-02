/**
 * 初始化 axios 实例
 *
 * 设置 ajax 请求的一些默认行为
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MessageBox, Notification, Loading } from 'element-ui';
import permission from './permission';
import config from '@/config';
import generateMock from './mock';
import api from '@/resources/api';
import store from '@/store';

// https://github.com/axios/axios#cancellation
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// 创建axios实例
const request = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 10000, // 请求超时时间 ms
  cancelToken: source.token,
});

// 接口白名单
const whiteList = [api.login];

let loadingInstance;

// request 拦截器，在每个请求之前执行
request.interceptors.request.use(
  config => {
    // 判断是否有接口资源访问权限
    if (!permission.isAuthApi(config.url) && whiteList.indexOf(config.url) < 0) {
      source.cancel(`没有 ${config.url} 接口访问权限`);
    }

    // 请求载入框
    loadingInstance = Loading.service({
      target: '#loading-container',
    });

    // 每个请求都添加自定义的header，根据实际情况修改
    config.headers['Content-Type'] = 'application/json'; // 默认和后端交互均使用json
    config.headers['X-UserId'] = store.getters['userInfo'].id;
    config.headers['X-Token'] = store.getters['token'];

    return config;
  },
  error => {
    console.error(error);
    loadingInstance.close();
    return Promise.reject(error);
  }
);

// response 拦截器，在每个请求返回之后执行
request.interceptors.response.use(
  response => {
    loadingInstance.close();

    /**
     * 这里约定的返回值格式为：
     * {
     *   data: ..., // 业务数据
     *   message: 'xxx',  // 消息
     *   status: 0  // 状态 0 - 成功 其他 - 失败
     * }
     *
     * 可以根据业务需要自行修改
     */
    const res = response.data;
    if (res.status !== 0) {
      switch (res.status) {
        // 40001 token过期或非法
        case 40001:
          MessageBox.confirm('你的登录信息已过期，请重新登录', '登录失效', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            location.reload();
          });
          break;

        default:
          Notification.error({
            title: '错误',
            message: res.message || '请求错误',
            duration: 10000,
          });
          break;
      }

      // 这里是继续还是reject，根据具体业务需要调整
      console.error('业务错误: %o', res);
      return Promise.reject(res);
    }
    return res.data;
  },
  error => {
    loadingInstance && loadingInstance.close();
    console.error(error);
    Notification.error({
      title: '错误',
      message: error.message || '请求错误',
      duration: 10000,
    });
    return Promise.reject(error);
  }
);

// mock
if (config.mockEnabled) {
  let mock = new MockAdapter(request, {
    delayResponse: 500, // 模拟延迟响应
  });
  generateMock(mock);
}

export default request;
