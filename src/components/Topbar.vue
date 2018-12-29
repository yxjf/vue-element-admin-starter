<template>
  <div>
    <div class="brand">
      <h2>{{ systemName }}</h2>
    </div>
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link">
        {{ userInfo.displayName || '用户' }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import config from '@/config';
import actionTypes from '@/store/action-types';

export default {
  name: 'Topbar',
  data() {
    return {
      systemName: config.systemName,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    logout() {
      this.$confirm('是否退出系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch(actionTypes.logout).then(() => {
            this.$router.push({ path: '/login' });
          });
        })
        .catch(() => {});
    },
  },
};
</script>
