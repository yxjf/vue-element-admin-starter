<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="toggle-sidebar" :class="{ collapse: isCollapse }" @click.prevent="aaa">
      <i class="fa fa-bars"></i>
    </div>
    <breadcrumb></breadcrumb>
  </el-menu>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import store from '@/utils/store'

  export default {
    name: 'Navbar',
    components: {
      Breadcrumb,
    },
    props: {
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      aaa() {
        store.config.toggleSidebarCollapse()
      }
    }
  }
</script>
