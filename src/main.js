/**
 * 程序入口
 */

import Vue from 'vue'

// 引入 CSS resets，统一各浏览器下基础样式表现 http://necolas.github.io/normalize.css/
import 'normalize.css/normalize.css'

// 引入 ElementUI http://element-cn.eleme.io
// 因为用于后台管理系统，一般是内网使用，所以不做按需引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // 语言文件

// 引入 fontawesome 图标库 https://fontawesome.com
import '@fortawesome/fontawesome-free/css/all.css'

// 进度条样式
import 'nprogress/nprogress.css'

// 引入全局样式，所有 global 样式设置在这里
import './assets/main.less'

// 引入 App 和路由
import App from './App.vue'
import router from './router'

Vue.use(ElementUI, {locale})

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

// 是否包含角色和权限
// 如果不需要角色和权限功能，可以设置为 false
Vue.config.needPermission = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
