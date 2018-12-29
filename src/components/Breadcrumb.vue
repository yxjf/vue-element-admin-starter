<template>
  <div>
    <div class="title">{{ levelList[levelList.length - 1].meta.title || '' }}</div>
    <div id="loading-container"></div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.name">
        <span
          v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
          class="no-redirect"
          :class="{ current: index == levelList.length - 1 }"
          >{{ item.meta.title || item.name }}</span
        >
        <router-link v-else :to="{ name: item.name }">{{
          item.meta.title || item.name
        }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name !== 'welcome') {
        matched = [
          {
            name: 'welcome',
            path: '/welcome',
            meta: { title: '首页' },
          },
        ].concat(matched);
      } else {
        matched.shift();
      }
      this.levelList = matched;
    },
  },
};
</script>
