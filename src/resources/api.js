/**
 * 接口资源，每个接口资源有一个唯一的URL
 *
 * 用户可以访问的菜单、接口、特殊权限标记等统称为资源
 */

// 接口资源
const api = {
  login: '/user/login',
  logout: '/user/logout',
  example_bigTable: '/example/bigTable',
  sample_list: '/sample_list',
  sample_create: '/sample_create',
  sample_update: '/sample_update',
  sample_detail: '/sample_detail',
  sample_delete: '/sample_delete',
};

export default api;
