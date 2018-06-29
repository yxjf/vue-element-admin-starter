/**
 * 资源文件
 *
 * 用户可以访问的菜单、接口、特殊权限标记等统称为资源，每个资源有一个唯一的名称
 */

// 页面布局框架
import Layout from './views/layout'

// 用于多级子菜单切换时内容显示
import EmptyContainer from './components/EmptyContainer'

// 菜单资源，用于生成路由和左侧菜单树
// 菜单 name 命名方式为 x.x.x，对应 views 文件夹下的文件名，如 name: 'welcome.index' 对应 @views/welcome/index.vue 组件
const menu = [
  {
    name: 'welcome',
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [{
      name: 'welcome.index',
      path: 'welcome',
      component: () => import('@/views/welcome/index'),
      meta: {
        title: '首页',
        icon: 'fa fa-home',
      },
    }]
  },
  {
    name: 'example1',
    path: '/example',
    component: Layout,
    redirect: '/example/table1',
    meta: {
      title: '例子',
      icon: 'fa fa-table',
    },
    children: [
      {
        name: 'example.table1',
        path: 'table1',
        component: () => import('@/views/example/table'),
        meta: {
          title: '大列表',
          icon: 'fa fa-table',
        },
      },
    ]
  },
  {
    name: 'example',
    path: '/example',
    redirect: '/example/table',
    component: Layout,
    meta: {
      title: '例子',
      icon: 'fa fa-table',
    },
    children: [
      {
        name: 'example.table2',
        path: 'table2',
        component: EmptyContainer,
        meta: {
          title: '大列表',
          icon: 'fa fa-table',
        },
        children: [
          {
            name: 'example.table3',
            path: 'table3',
            component: () => import('@/views/example/table'),
            meta: {
              title: '大列表',
              icon: 'fa fa-table',
            },
          },
          {
            name: 'example.form2',
            path: 'form2',
            component: () => import('@/views/example/form'),
            meta: {
              title: '表单',
              icon: 'fa fa-edit',
            },
          },
        ]
      },
      {
        name: 'example.form',
        path: 'form',
        component: () => import('@/views/example/form'),
        meta: {
          title: '表单',
          icon: 'fa fa-edit',
        },
      },
    ]
  },
]

export default {
  menu
}
