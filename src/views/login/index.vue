<template>
  <div class="login-container">
    <el-form
      class="login-form"
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
    >
      <h3 class="title">管理系统</h3>
      <el-form-item prop="username">
        <el-input type="text" name="username" placeholder="username" v-model="loginForm.username">
          <i class="el-input__icon fa fa-user" slot="prefix"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="showPwd ? 'text' : 'password'"
          name="password"
          placeholder="password"
          v-model="loginForm.password"
          @keyup.enter.native="handleLogin"
        >
          <i class="el-input__icon fa fa-user" slot="prefix"></i>
          <template slot="suffix">
            <el-tooltip
              class="item"
              effect="dark"
              :content="showPwd ? '隐藏密码' : '显示密码'"
              placement="right"
            >
              <i
                class="el-input__icon fa"
                :class="showPwd ? 'fa-eye' : 'fa-eye-slash'"
                @click="showPwd = !showPwd"
              ></i>
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          class="submit"
          :loading="loginPending"
          @click.native.prevent="handleLogin"
        >
          登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import validate from '@/utils/validate';
import actionTypes from '@/store/action-types';

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
      loginPending: false,
      showPwd: false,
    };
  },
  mounted() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginPending = true;
          this.$store
            .dispatch(actionTypes.login, {
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            .then(() => {
              this.$router.push({ path: '/' });
            })
            .catch(err => {
              console.error(err);
            })
            .finally(() => {
              this.loginPending = false;
            });
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
body {
  background-color: #000;
}
</style>
