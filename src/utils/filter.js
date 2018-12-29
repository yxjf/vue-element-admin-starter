/**
 * 过滤器
 */

import Vue from 'vue';
import moment from 'moment';

/**
 * 日期格式转换
 */
Vue.filter('datetime', function(value, format) {
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss');
});

/**
 * 千分位格式转换
 */

Vue.filter('thousand', function(num, fixed) {
  let n = Number(num);
  if (isNaN(n)) return 0;
  if (fixed && String(n).split('.').length === 2 && String(n).split('.')[1].length > fixed) {
    n = num.toFixed(fixed);
  }
  const str = (n || 0).toString();
  return str.indexOf('.') > -1
    ? str.replace(/(\d)(?=(?:\d{3})+\.)/g, '$1,')
    : str.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
});
