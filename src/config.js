/**
 * 全局配置项
 */

export default {
  // 系统名称
  systemName: '管理系统',

  // 是否包含角色和权限
  // 如果不需要角色和权限功能，可以设置为 false
  needPermission: false,

  // 是否启用 Mock
  mockEnabled: true,

  // 每页默认数据条数
  pageSize: 20,

  // 自定义 localStorage 存储变量前缀
  storeKeyPrefix: 'vue-admin-starter-',
};
