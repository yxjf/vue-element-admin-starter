<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <topbar></topbar>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <sidebar></sidebar>
        </el-aside>
        <el-container>
          <el-header>
            <navbar></navbar>
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

  export default {
    name: 'layout',
    components: {
      Topbar,
      Navbar,
      Sidebar,
    },
    computed: {},
  }
</script>
