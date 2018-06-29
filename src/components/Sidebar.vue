<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#4a5064"
      text-color="#fff"
      active-text-color="#00c1de"
    >
      <sidebar-item :menu="menu"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import SidebarItem from '@/components/SidebarItem'
  import Resource from '@/resource'
  import store from '@/utils/store'

  export default {
    name: 'Sidebar',
    components: {
      SidebarItem
    },
    data() {
      return {
        menu: Resource.menu,
      }
    },
    computed: {
      isCollapse() {
        return store.config.getSidebarCollapse()
      }
    }
  }
</script>
