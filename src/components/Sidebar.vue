<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.name"
      :collapse="isCollapse"
      @select="handleSelect"
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
    props: {
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 导航菜单的点选处理
      handleSelect(index) {
        this.$router.push({name: index})
      },
    }
  }
</script>
