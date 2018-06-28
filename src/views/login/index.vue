<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on"
             :model="loginForm" :rules="loginRules" ref="loginForm">
      <h3 class="title">管理系统</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  name="username"
                  placeholder="username"
                  v-model="loginForm.username">
          <i class="el-input__icon fa fa-user" slot="prefix"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="showPwd ? 'text' : 'password'"
                  name="password"
                  placeholder="password"
                  v-model="loginForm.password"
                  @keyup.enter.native="handleLogin">
          <i class="el-input__icon fa fa-user" slot="prefix"></i>
          <i class="el-input__icon fa fa-user" slot="suffix" @click="showPwd = !showPwd"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger"
                   class="submit"
                   :loading="loading"
                   @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import validate from '@/utils/validate'
  import * as api from '@/api/login'

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: 'admin',
        },
        loginRules: {
          username: [validate.username()],
          password: [validate.password()],
        },
        loading: false,
        showPwd: false,
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            api.login(this.loginForm.username, this.loginForm.password).then(() => {
              this.$router.push({path: '/'})
            }).finally(() => {
              this.loading = false
            })
          }
          return false
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  body {
    background-color: #000;
  }
</style>
