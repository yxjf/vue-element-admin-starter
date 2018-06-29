/**
 * 资源文件
 *
 * 用户可以访问的菜单、接口、特殊权限标记等统称为资源，每个资源有一个唯一的名称
 */

import Layout from './views/layout'

// 菜单资源，用于生成路由和左侧菜单树
// 菜单 name 命名方式为 x.x.x，对应 views 文件夹下的文件名，如 name: 'welcome.index' 对应 @views/welcome/index.vue 组件
const menu = [
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
        component: () => import('@/views/example/table'),
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
            name: 'example.form.2',
            path: 'form',
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


// {
//   path: '/',
//     component: Layout,
//   redirect: '/dashboard',
//   name: 'Dashboard',
//   hidden: true,
//   children: [{
//   path: 'dashboard',
//   component: () => import('@/views/dashboard/index')
// }]
// },
//
// {
//   path: '/example',
//     component: Layout,
//   redirect: '/example/table',
//   name: 'Example',
//   meta: { title: 'Example', icon: 'example' },
//   children: [
//     {
//       path: 'table',
//       name: 'Table',
//       component: () => import('@/views/table/index'),
//       meta: { title: 'Table', icon: 'table' }
//     },
//     {
//       path: 'tree',
//       name: 'Tree',
//       component: () => import('@/views/tree/index'),
//       meta: { title: 'Tree', icon: 'tree' }
//     }
//   ]

export default {
  menu
}
