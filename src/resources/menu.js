/**
 * 菜单资源，每个菜单资源有一个唯一的名称（name）
 *
 * 用户可以访问的菜单、接口、特殊权限标记等统称为资源
 *
 * 图标：https://fontawesome.com/v4.7.0/icons/
 */

// 页面布局框架
import Layout from '@/views/layout';

// 用于多级子菜单切换时内容显示
import EmptyContainer from '@/components/EmptyContainer';

// 菜单资源，用于生成路由和左侧菜单树
// 菜单 name 命名方式为 x.x.x，对应 views 文件夹下的文件名，如 name: 'welcome.index' 对应 @views/welcome/index.vue 组件
const menu = [
  {
    name: 'welcome',
    path: '/',
    component: Layout,
    redirect: '/welcome',
    meta: {
      title: '首页',
      icon: 'fa fa-home',
    },
    children: [
      {
        name: 'welcome.index',
        path: 'welcome',
        component: () => import('@/views/welcome/index'),
        meta: {
          title: '首页',
          icon: 'fa fa-home',
        },
      },
    ],
  },
  {
    name: 'example',
    path: '/example',
    component: Layout,
    redirect: '/example/bigTable',
    meta: {
      title: '组件示例',
      icon: 'fa fa-th',
    },
    children: [
      {
        name: 'example.bigTable',
        path: 'bigTable',
        component: () => import('@/views/example/bigTable'),
        meta: {
          title: '数据列表',
          icon: 'fa fa-table',
        },
      },
      {
        name: 'example.bigForm',
        path: 'bigForm',
        component: () => import('@/views/example/bigForm'),
        meta: {
          title: '表单',
          icon: 'fa fa-edit',
        },
      },
      {
        name: 'example.tabPage',
        path: 'tabPage',
        component: () => import('@/views/example/tabPage'),
        meta: {
          title: '带标签页面',
          icon: 'fa fa-folder-o',
        },
      },
      {
        name: 'example.component',
        path: 'component',
        redirect: '/example/component/codeEditor',
        component: EmptyContainer,
        meta: {
          title: '特殊组件',
          icon: 'fa fa-table',
        },
        children: [
          {
            name: 'example.component.codeEditor',
            path: 'codeEditor',
            component: () => import('@/views/example/codeEditor'),
            meta: {
              title: '代码编辑器',
              icon: 'fa fa-code',
            },
          },
          {
            name: 'example.component.wysiwyg',
            path: 'wysiwygEditor',
            component: () => import('@/views/example/wysiwygEditor'),
            meta: {
              title: '多功能编辑器',
              icon: 'fa fa-edit',
            },
          },
        ],
      },
    ],
  },
  {
    name: 'generator',
    path: '/generator',
    // hidden: true,
    component: Layout,
    redirect: '/generator/index',
    meta: {
      title: '代码生成',
      icon: 'fa fa-file-code-o',
    },
    children: [
      {
        name: 'generator.index',
        path: 'index',
        component: () => import('@/views/generator/index'),
        meta: {
          title: '代码生成器',
          icon: 'fa fa-file-code-o',
        },
      },
      {
        name: 'generator.sample',
        path: 'sample',
        component: () => import('@/views/generator/sample'),
        meta: {
          title: '代码生成样例',
          icon: 'fa fa-file-o',
        },
      },
      {
        name: 'generator.test',
        path: 'test',
        component: () => import('@/views/generator/test'),
        meta: {
          title: '测试生成代码',
          icon: 'fa fa-flask',
        },
      },
    ],
  },
];

export default menu;
