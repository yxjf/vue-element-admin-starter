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
          <el-main id="main-container">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
            <div class="back-top" v-show="backTopVisible" @click="backToTop">
              <i class="fa fa-chevron-up"></i>
            </div>
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
  import topic from '@/utils/topic'
  import PubSub from 'pubsub-js'
  import _ from 'lodash'

  let _catchScroll;

  export default {
    name: 'layout',
    components: {
      Topbar,
      Navbar,
      Sidebar,
    },
    data() {
      return {
        isCollapse: store.config.getSidebarCollapse(),
        backTopVisible: false, // 是否显示滚动到顶端
      }
    },
    mounted() {
      PubSub.subscribe(topic.TOGGLE_SIDEBAR_COLLAPSE, () => {
        this.isCollapse = store.config.getSidebarCollapse()
      })

      // 滚动到顶端
      let _container = document.getElementById("main-container");
      _catchScroll = _.debounce(this.catchScroll, 100)
      _container.addEventListener('scroll', _catchScroll)
      window.smoothscroll = () => {
        let currentScroll = _container.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll)
          _container.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
        }
      }
    },
    destroyed() {
      document.getElementById("main-container").removeEventListener('scroll', _catchScroll)
    },
    methods: {
      catchScroll() {
        this.backTopVisible = document.getElementById("main-container").scrollTop > 100
      },
      // 滚动到顶部
      backToTop() {
        window.smoothscroll()
      },
    }
  }
</script>
