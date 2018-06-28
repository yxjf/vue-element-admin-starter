/**
 * 资源文件
 *
 * 用户可以访问的菜单、接口、特殊权限标记等统称为资源，每个资源有一个唯一的名称
 */

// 菜单资源，用于生成路由和左侧菜单树
// 菜单 name 命名方式为 x.x.x，对应 views 文件夹下的文件名，如 name: 'welcome.index' 对应 @views/welcome/index.vue 组件
const menu = [
  {
    name: 'welcome.index',
    title: '欢迎',
    path: '/welcome',
    icon: 'fa fa-home'
  },
]

export default {
  menu
}
