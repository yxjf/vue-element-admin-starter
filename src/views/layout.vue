<template>
  <div class="wrapper">
    <el-container>
      <el-header> <topbar></topbar> </el-header>
      <el-container>
        <el-aside :class="{ collapse: sidebarCollapse }">
          <sidebar :is-collapse="sidebarCollapse"></sidebar>
        </el-aside>
        <el-container>
          <el-header> <navbar :is-collapse="sidebarCollapse"></navbar> </el-header>
          <el-main id="main-container">
            <transition name="fade" mode="out-in"> <router-view></router-view> </transition>
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
import Topbar from '@/components/Topbar';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
  name: 'layout',
  components: {
    Topbar,
    Navbar,
    Sidebar,
  },
  data() {
    return {
      backTopVisible: false, // 是否显示滚动到顶端
    };
  },
  computed: {
    ...mapGetters(['sidebarCollapse']),
  },
  mounted() {
    // 监听滚动
    let _container = document.getElementById('main-container');
    _container.addEventListener('scroll', this.catchScroll);
    window.smoothscroll = () => {
      let currentScroll = _container.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll);
        _container.scrollTo(0, Math.floor(currentScroll - currentScroll / 5));
      }
    };
  },
  methods: {
    catchScroll: _.debounce(function() {
      this.backTopVisible = document.getElementById('main-container').scrollTop > 100;
    }, 100),
    // 平滑滚动到顶部
    backToTop() {
      window.smoothscroll();
    },
  },
};
</script>

<style scoped>
#main-container {
  height: calc(100vh - 100px);
  padding-bottom: 50px;
}
</style>
