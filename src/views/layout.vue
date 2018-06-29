<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <topbar></topbar>
      </el-header>
      <el-container>
        <el-aside :class="{ collapse: isCollapse }">
          <sidebar :is-collapse="isCollapse"></sidebar>
        </el-aside>
        <el-container>
          <el-header>
            <navbar :is-collapse="isCollapse"></navbar>
          </el-header>
          <el-main>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Topbar from '@/components/Topbar'
  import Sidebar from '@/components/Sidebar'
  import Navbar from '@/components/Navbar'
  import store from '@/utils/store'
  import PubSub from 'pubsub-js'

  export default {
    name: 'layout',
    components: {
      Topbar,
      Navbar,
      Sidebar,
    },
    data() {
      return {
        isCollapse: store.config.getSidebarCollapse()
      }
    },
    mounted() {
      PubSub.subscribe(store.topics.TOGGLE_SIDEBAR_COLLAPSE, () => {
        this.isCollapse = store.config.getSidebarCollapse()
      })
    }
  }
</script>
