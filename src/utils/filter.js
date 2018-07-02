/**
 * 过滤器
 */

import Vue from 'vue';
import moment from 'moment'

/**
 * 日期格式转换
 */
Vue.filter('datetime', function (value, format) {
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss');
});
