<template>
  <div>
    <div class="brand">
      <h2>管理系统</h2>
    </div>
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link">
        {{ displayName }}的工作台 <i class="el-icon-arrow-down el-icon--right"></i>
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
  import store from '@/utils/store'
  import * as api from '@/api/login'

  export default {
    name: 'Topbar',
    data() {
      return {
        displayName: store.userInfo.getDisplayName() || '我'
      }
    },
    methods: {
      logout() {
        api.logout().then(() => {
          this.$router.push({path: '/login'})
        })
      }
    }
  }
</script>
